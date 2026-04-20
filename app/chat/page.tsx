'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import ChatInterface from '@/components/chat/ChatInterface';

export default function ChatPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn || !user) {
    return (
      <div className="min-h-screen bg-[#0A0F0A] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#A3E635] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <ChatInterface
      userId={user.id}
      userName={user.firstName || 'User'}
    />
  );
}
