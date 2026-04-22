import Link from 'next/link';
import Image from 'next/image';
import { Button, buttonVariants } from '@/components/ui/button';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#fedbdf] bg-background/40 backdrop-blur-2xl px-6 lg:px-12 py-4">
      <div className="w-full flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/Main-logo.svg" alt="Baswara Logo" width={180} height={50} className="h-10 w-auto" priority />
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground font-medium transition-colors">
            Dashboard
          </Link>
          <Link href="/events/new" className={buttonVariants({ className: "bg-primary text-white rounded-none px-6" })}>Create Event</Link>
        </div>
      </div>
    </nav>
  );
}
