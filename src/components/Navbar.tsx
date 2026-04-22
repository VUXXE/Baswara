import Link from 'next/link';
import Image from 'next/image';
import { Button, buttonVariants } from '@/components/ui/button';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/Main-logo.svg" alt="Baswara Logo" width={200} height={56} className="h-14 w-auto" priority />
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground font-medium transition-colors">
            Dashboard
          </Link>
          <Link href="/events/new" className={buttonVariants()}>Create Event</Link>
        </div>
      </div>
    </nav>
  );
}
