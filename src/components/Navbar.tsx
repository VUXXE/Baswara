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
        <div className="flex items-center">
          <Link href="/onboarding" className={buttonVariants({ className: "bg-[#fd5e4b] hover:bg-[#6b1d1d] text-white rounded-full px-8 transition-all duration-300 font-bold uppercase tracking-widest text-xs" })}>
            Mulai Sekarang
          </Link>
        </div>
      </div>
    </nav>
  );
}
