'use client';

import { useAuth } from '@/context/auth';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export default function ContinueWithGoogle() {
  const auth = useAuth();
  const router = useRouter();
  return (
    <Button
      className="w-full"
      onClick={async () => {
        await auth?.logInWithGoogle();
        router.refresh();
      }}
    >
      Content with Google
    </Button>
  );
}
