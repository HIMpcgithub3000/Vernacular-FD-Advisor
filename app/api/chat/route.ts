import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { getAuth } from '@clerk/nextjs/server';
import { SYSTEM_PROMPTS, type SupportedLang } from '@/lib/prompts';
import { fdAdvisorTools } from '@/lib/claude-tools';
import {
  getOrCreateSession,
  saveMessage,
  getChatHistory,
} from '@/lib/db-helpers';

export const maxDuration = 30;

const nvidiaBaseURL =
  process.env.NVIDIA_BASE_URL?.replace(/\/$/, '') ??
  'https://integrate.api.nvidia.com/v1';

const nvidiaModel = process.env.NVIDIA_CHAT_MODEL ?? 'openai/gpt-oss-120b';

const nvidia = createOpenAI({
  baseURL: nvidiaBaseURL,
  apiKey: process.env.NVIDIA_API_KEY ?? '',
});

export async function POST(req: Request) {
  let lang: SupportedLang = 'hi';
  try {
    const { userId } = getAuth(req as any);
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }
    if (!process.env.NVIDIA_API_KEY) {
      return new Response('Missing NVIDIA_API_KEY in .env.local', { status: 500 });
    }

    const { messages, language = 'hi' } = await req.json();
    lang =
      (language as SupportedLang) in SYSTEM_PROMPTS
        ? (language as SupportedLang)
        : 'hi';

    const session = await getOrCreateSession(userId, lang);
    const history = await getChatHistory(userId);

    const lastUserMessage = messages[messages.length - 1];
    if (lastUserMessage?.role === 'user') {
      await saveMessage(
        session.id,
        userId,
        'user',
        typeof lastUserMessage.content === 'string'
          ? lastUserMessage.content
          : JSON.stringify(lastUserMessage.content)
      );
    }

    const historyMessages = history.map(message => ({
      role: message.role as 'user' | 'assistant',
      content: message.content,
    }));

    const result = streamText({
      model: nvidia(nvidiaModel),
      system: SYSTEM_PROMPTS[lang] || SYSTEM_PROMPTS.hi,
      messages: [...historyMessages, ...messages],
      tools: fdAdvisorTools,
      maxSteps: 5,
      maxRetries: 3,
      temperature: 0.7,
      onFinish: async ({ text }) => {
        if (text?.trim()) {
          await saveMessage(session.id, userId, 'assistant', text);
        }
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);

    const errorMessages = {
      hi: 'माफ़ करें, कुछ तकनीकी समस्या हुई। कृपया दोबारा कोशिश करें।',
      bho: 'माफ़ करीं, कुछ गड़बड़ी भई। फिर से कोशिश करीं।',
      mai: 'माफ़ करू, किछु तकनीकी समस्या भेल। फेर कोशिश करू।',
      en: 'Sorry, a technical issue occurred. Please try again.',
    };

    return new Response(
      JSON.stringify({
        error: true,
        message: errorMessages[lang] || errorMessages.hi,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
