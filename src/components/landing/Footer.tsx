import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative z-10 py-20 px-6 bg-[#6b1d1d] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1 space-y-6">
            <Image src="/Main-logo.svg" alt="Baswara Logo" width={140} height={40} className="h-10 w-auto brightness-0 invert" />
            <p className="text-sm text-white/60 font-medium leading-relaxed">Platform undangan digital & RSVP management terpercaya di Indonesia.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Product</h4>
            <div className="flex flex-col gap-3 text-sm font-medium text-white/70">
              <Link href="#features" className="hover:text-[#fecf00] transition-colors">Features</Link>
              <Link href="#" className="hover:text-[#fecf00] transition-colors">Pricing</Link>
              <Link href="#" className="hover:text-[#fecf00] transition-colors">Templates</Link>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Company</h4>
            <div className="flex flex-col gap-3 text-sm font-medium text-white/70">
              <Link href="/tentang-kami" className="hover:text-[#fecf00] transition-colors">About Us</Link>
              <Link href="#" className="hover:text-[#fecf00] transition-colors">Blog</Link>
              <Link href="#" className="hover:text-[#fecf00] transition-colors">Careers</Link>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Support</h4>
            <div className="flex flex-col gap-3 text-sm font-medium text-white/70">
              <Link href="#" className="hover:text-[#fecf00] transition-colors">Help Center</Link>
              <Link href="#" className="hover:text-[#fecf00] transition-colors">Contact</Link>
              <Link href="#" className="hover:text-[#fecf00] transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/30">© 2026 Baswara. Crafted with Passion.</span>
          <div className="flex gap-6 text-[10px] uppercase tracking-[0.3em] font-black text-white/40">
            <Link href="#" className="hover:text-[#fecf00] transition-colors">Terms</Link>
            <Link href="#" className="hover:text-[#fecf00] transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-[#fecf00] transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
