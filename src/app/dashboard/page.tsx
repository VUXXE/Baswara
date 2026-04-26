"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { 
  Loader2, Plus, LogOut, LayoutGrid, Users, Send, 
  ExternalLink, Edit3, Settings, ChevronRight, BarChart3,
  Calendar, MapPin, Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const [weddings, setWeddings] = useState<any[]>([]);
  const [stats, setStats] = useState({ weddings: 0, rsvps: 0, coming: 0 });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  const checkAuthAndFetchData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      // Fetch Weddings
      const { data: weddingsData, error: wError } = await supabase
        .from('weddings')
        .select(`
          *,
          rsvps (id, status)
        `)
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (wError) throw wError;
      setWeddings(weddingsData || []);

      // Calculate stats
      const totalRsvps = weddingsData?.reduce((acc, w) => acc + (w.rsvps?.length || 0), 0) || 0;
      const totalComing = weddingsData?.reduce((acc, w) => acc + (w.rsvps?.filter((r: any) => r.status === 'hadir').length || 0), 0) || 0;
      
      setStats({
        weddings: weddingsData?.length || 0,
        rsvps: totalRsvps,
        coming: totalComing
      });

    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground animate-pulse">Loading Studio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-primary/10">
      <Navbar />
      
      <main className="container mx-auto px-6 py-24 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-black tracking-tight text-[#6b1d1d]"
            >
              Management <span className="text-primary italic">Hub</span>
            </motion.h1>
            <p className="text-muted-foreground font-medium mt-1">Satu tempat untuk semua momen spesial Anda.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <Button variant="outline" className="rounded-full h-12 px-6 border-zinc-200 font-bold text-xs" onClick={handleSignOut}>
               <LogOut className="w-4 h-4 mr-2" /> SIGN OUT
             </Button>
             <Link href="/invite/customize" className={buttonVariants({ className: "rounded-full h-12 px-8 font-black text-xs shadow-xl shadow-primary/20" })}>
               <Plus className="w-4 h-4 mr-2" /> CREATE NEW
             </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard label="Total Invitations" value={stats.weddings} icon={<LayoutGrid size={20} />} trend="+100%" color="bg-blue-500" />
          <StatCard label="Total RSVPs" value={stats.rsvps} icon={<Users size={20} />} trend="+24 today" color="bg-primary" />
          <StatCard label="Confirmed Guest" value={stats.coming} icon={<Send size={20} />} trend="Live" color="bg-emerald-500" />
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2 px-1">
             <Sparkles className="text-primary" size={16} />
             <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Active Projects</h2>
          </div>

          {weddings.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24 border-2 border-dashed rounded-[3rem] bg-white shadow-sm flex flex-col items-center"
            >
              <div className="bg-muted p-6 rounded-full mb-6">
                 <LayoutGrid className="text-muted-foreground/40" size={48} />
              </div>
              <h3 className="text-2xl font-black text-[#6b1d1d] mb-2">Ready to start?</h3>
              <p className="text-muted-foreground max-w-xs mx-auto mb-8 font-medium">Buat undangan digital pertamamu dalam hitungan menit dengan editor profesional kami.</p>
              <Link href="/invite/customize" className={buttonVariants({ size: "lg", className: "rounded-full px-10 h-14 font-black shadow-2xl shadow-primary/20" })}>
                Launch Your First Event
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {weddings.map((wedding, i) => (
                <WeddingCard key={wedding.id} wedding={wedding} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, icon, trend, color }: { label: string, value: number, icon: React.ReactNode, trend: string, color: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-[2.5rem] border-none shadow-sm shadow-zinc-200/50 flex flex-col gap-6 relative overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
    >
      <div className="flex justify-between items-start relative z-10">
        <div className={`p-4 rounded-2xl ${color} text-white shadow-lg`}>
          {icon}
        </div>
        <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">{trend}</span>
      </div>
      <div className="relative z-10">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1 opacity-60">{label}</p>
        <p className="text-4xl font-black text-[#6b1d1d]">{value}</p>
      </div>
      {/* Decorative bg */}
      <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${color} opacity-[0.03] rounded-full group-hover:scale-150 transition-transform duration-700`} />
    </motion.div>
  );
}

function WeddingCard({ wedding, index }: { wedding: any, index: number }) {
  const rsvps = wedding.rsvps || [];
  const comingCount = rsvps.filter((r: any) => r.status === 'hadir').length;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="overflow-hidden border-none shadow-sm shadow-zinc-200/50 rounded-[2.5rem] bg-white group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col h-full">
        <div className="relative h-56 overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
            style={{ backgroundImage: `url(${wedding.data?.couple?.groom?.photo || '/Design-mock2.png'})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-8 right-6">
            <h3 className="text-2xl font-black text-white leading-tight">
              {wedding.data?.couple?.groom?.name} & {wedding.data?.couple?.bride?.name}
            </h3>
            <div className="flex items-center gap-4 mt-2 text-white/80 text-[10px] font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Calendar size={12}/> {wedding.data?.events?.[0]?.date || 'TBD'}</span>
              <span className="flex items-center gap-1.5"><MapPin size={12}/> {wedding.data?.events?.[0]?.location || 'Venue TBD'}</span>
            </div>
          </div>
          <div className="absolute top-6 right-6">
             <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-xl text-white">
                <BarChart3 size={16} />
             </div>
          </div>
        </div>

        <CardContent className="p-8 flex-grow">
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-[#fafafa] p-4 rounded-2xl border border-zinc-100">
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">Total RSVPs</p>
                <p className="text-xl font-black text-[#6b1d1d]">{rsvps.length}</p>
             </div>
             <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50">
                <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1">Confirmed</p>
                <p className="text-xl font-black text-emerald-700">{comingCount}</p>
             </div>
          </div>
          
          <div className="mt-6 space-y-2">
             <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest ml-1">Quick Link</p>
             <div className="flex items-center justify-between bg-muted/40 p-3 rounded-xl border border-dashed border-zinc-200">
                <code className="text-[10px] font-bold text-[#6b1d1d]/60">baswara.com/invite/{wedding.slug}</code>
                <Link href={`/invite/${wedding.slug}`} target="_blank" className="text-primary hover:scale-110 transition-transform">
                   <ExternalLink size={12} />
                </Link>
             </div>
          </div>
        </CardContent>

        <CardFooter className="p-8 pt-0 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3 w-full">
            <Link href={`/invite/customize?id=${wedding.id}`} className={buttonVariants({ variant: "outline", className: "rounded-2xl h-12 text-[10px] font-black uppercase tracking-widest border-zinc-200" })}>
              <Edit3 size={14} className="mr-2" /> EDIT DESIGN
            </Link>
            <Link href={`/dashboard/${wedding.id}`} className={buttonVariants({ className: "rounded-2xl h-12 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20" })}>
              <Users size={14} className="mr-2" /> GUEST LIST
            </Link>
          </div>
          <Link 
            href={`/dashboard/${wedding.id}/checkin`}
            className={cn(buttonVariants({ variant: "ghost" }), "w-full rounded-xl text-[9px] font-black uppercase tracking-widest h-10 text-muted-foreground hover:bg-zinc-100")}
          >
            <Settings size={12} className="mr-2" /> Event Settings & QR Check-in
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
