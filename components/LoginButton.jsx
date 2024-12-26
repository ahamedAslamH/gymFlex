'use client'

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LoginButton() {
  return (
    <Link href="/login">
      <Button variant="default">Sign In</Button>
    </Link>
  );
} 