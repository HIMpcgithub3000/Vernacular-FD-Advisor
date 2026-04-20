import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0A0F0A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: '#A3E635',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            fontSize: '18px',
            fontWeight: '700',
            color: '#0A0F0A',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          FG
        </div>
        <h1
          style={{
            color: '#F0F5F0',
            fontSize: '22px',
            fontWeight: '700',
            fontFamily: 'Inter',
          }}
        >
          Create your FD Guru account
        </h1>
        <p
          style={{
            color: '#7A9A7A',
            fontSize: '14px',
            marginTop: '6px',
            fontFamily: 'Inter',
          }}
        >
          आपका भरोसेमंद FD सलाहकार
        </p>
      </div>
      <SignUp />
    </div>
  );
}
