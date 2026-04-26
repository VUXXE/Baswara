"use client";

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Loader2, Plus, ExternalLink, Users, Calendar, 
  Settings, Heart, PartyPopper, Briefcase, 
  ArrowUpRight, BarChart3, Clock, Sparkles,
  Search, Filter, CheckCircle2, XCircle, 
  Activity, ArrowRight, Trash2, Archive, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export default function Dashboard() {
  const [invitations, setInvitations] = useState<any[]>([]);
  const [recentRSVPs, setRecentRSVPs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");
  const router = useRouter();

  useEffect(() => {
    async function fetchDashboardData() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
        return;
      }

      // 1. Fetch Invitations with RSVP counts
      const { data: invites, error } = await supabase
        .from('invitations')
        .select(`
          *,
          rsvps (id, status, guest_count)
        `)
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (!error && invites) {
        setInvitations(invites);
      }

      // 2. Fetch Recent Activity across all invitations
      const { data: activities } = await supabase
        .from('rsvps')
        .select(`
          *,
          invitations (title, event_type)
        `)
        .in('invitation_id', invites?.map(i => i.id) || [])
        .order('created_at', { ascending: false })
        .limit(6);

      if (activities) setRecentRSVPs(activities);
      
      setLoading(false);
    }

    fetchDashboardData();
  }, [router]);

  // Logic for stats
  const stats = useMemo(() => {
    const total = invitations.length;
    let confirmed = 0;
    let totalGuestPotential = 0;

    invitations.forEach(inv => {
      inv.rsvps?.forEach((r: any) => {
        if (r.status === 'hadir') confirmed += (r.guest_count || 1);
      });
    });

    return { total, confirmed, conversion: total > 0 ? Math.round((confirmed / (total * 50)) * 100) : 0 };
  }, [invitations]);

  // Filtering logic
  const filteredInvitations = useMemo(() => {
    return invitations.filter(inv => {
      const matchesSearch = inv.data.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           inv.slug.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === "all" || inv.event_type === filterType;
      
      const eventDate = new Date(inv.data.mainDate);
      const isPast = eventDate < new Date();
      const matchesTab = activeTab === "active" ? !isPast : isPast;

      return matchesSearch && matchesType && matchesTab;
    });
  }, [invitations, searchQuery, filterType, activeTab]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="flex flex-col items-center gap-4">
           <Loader2 className="animate-spin text-primary h-10 w-10" />
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground animate-pulse">Syncing Studio Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pb-20">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32">
        {/* TOP ANALYTICS BAR */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
           <QuickStat label="Live Invitations" value={stats.total} icon={<Globe size={18}/>} color="text-blue-600" bg="bg-blue-50" />
           <QuickStat label="Total Confirmed" value={stats.confirmed} icon={<CheckCircle2 size={18}/>} color="text-emerald-600" bg="bg-emerald-50" />
           <QuickStat label="Average Conversion" value={`${stats.conversion}%`} icon={<BarChart3 size={18}/>} color="text-purple-600" bg="bg-purple-50" />
           <div className="hidden md:flex bg-zinc-900 rounded-[1.5rem] p-6 text-white items-center justify-between group cursor-pointer hover:bg-primary transition-colors duration-500" onClick={() => router.push('/onboarding')}>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Quick Start</p>
                 <p className="text-sm font-bold mt-1">New Event</p>
              </div>
              <Plus className="group-hover:rotate-90 transition-transform duration-500" />
           </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-10">
           {/* LEFT: MAIN CONTENT */}
           <div className="flex-1 space-y-8">
              <header className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                   <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-900">Your <span className="text-primary italic">Creations</span></h2>
                   <div className="flex bg-white p-1 rounded-xl shadow-sm border border-zinc-100">
                      <TabBtn active={activeTab === "active"} onClick={() => setActiveTab("active")} label="Upcoming" />
                      <TabBtn active={activeTab === "past"} onClick={() => setActiveTab("past")} label="Past Events" />
                   </div>
                </div>

                {/* SEARCH & FILTER ROW */}
                <div className="flex flex-col sm:flex-row gap-3">
                   <div className="relative flex-1 group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-primary transition-colors" size={16} />
                      <Input 
                        placeholder="Search invitations..." 
                        className="pl-11 h-12 rounded-2xl border-zinc-100 bg-white shadow-sm focus-visible:ring-primary/20"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                   </div>
                   <select 
                     className="h-12 px-4 rounded-2xl border border-zinc-100 bg-white shadow-sm text-xs font-bold uppercase tracking-wider outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                     value={filterType}
                     onChange={(e) => setFilterType(e.target.value)}
                   >
                      <option value="all">All Types</option>
                      <option value="wedding">Weddings</option>
                      <option value="birthday">Birthdays</option>
                      <option value="corporate">Corporate</option>
                   </select>
                </div>
              </header>

              {filteredInvitations.length === 0 ? (
                <Card className="border-2 border-dashed border-zinc-200 bg-white/50 py-20 text-center rounded-[3rem]">
                   <CardContent className="flex flex-col items-center">
                     <div className="bg-zinc-100 p-6 rounded-full mb-4 text-zinc-300"><Search size={40}/></div>
                     <p className="font-bold text-zinc-500 uppercase tracking-widest text-xs">No invitations found</p>
                   </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnimatePresence mode="popLayout">
                    {filteredInvitations.map((invite, index) => (
                      <motion.div 
                        key={invite.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <InvitationCard invite={invite} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
           </div>

           {/* RIGHT: ACTIVITY FEED */}
           <aside className="w-full lg:w-[320px] space-y-6">
              <div className="flex items-center gap-2 mb-4">
                 <Activity className="text-primary" size={18} />
                 <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-900">Recent RSVPs</h3>
              </div>
              
              <div className="space-y-3">
                 {recentRSVPs.length === 0 ? (
                   <div className="p-8 text-center bg-white rounded-3xl border border-zinc-100">
                      <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest leading-relaxed">Activity feed will appear as guests respond</p>
                   </div>
                 ) : (
                   recentRSVPs.map((rsvp, i) => (
                     <motion.div 
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: i * 0.05 }}
                       key={rsvp.id} 
                       className="p-4 bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow group cursor-default"
                     >
                        <div className="flex items-start gap-3">
                           <div className={cn(
                             "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                             rsvp.status === 'hadir' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                           )}>
                              {rsvp.status === 'hadir' ? <CheckCircle2 size={14}/> : <XCircle size={14}/>}
                           </div>
                           <div className="min-w-0">
                              <p className="text-xs font-black text-zinc-900 truncate uppercase tracking-tight">{rsvp.name}</p>
                              <p className="text-[10px] text-zinc-400 font-medium line-clamp-1 mt-0.5">responded to <span className="text-zinc-600 font-bold">{rsvp.invitations.title}</span></p>
                              <p className="text-[9px] text-zinc-300 font-bold mt-2 flex items-center gap-1 uppercase tracking-widest">
                                 <Clock size={8}/> {new Date(rsvp.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                           </div>
                        </div>
                     </motion.div>
                   ))
                 )}
                 {recentRSVPs.length > 0 && (
                   <button className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-primary transition-colors flex items-center justify-center gap-2">
                      View system logs <ArrowRight size={12}/>
                   </button>
                 )}
              </div>

              {/* TIPS BOX */}
              <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10 relative overflow-hidden group">
                 <Sparkles className="absolute -right-2 -top-2 text-primary/10 group-hover:scale-150 transition-transform duration-700" size={80} />
                 <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-2">Pro Tip</h4>
                 <p className="text-[11px] text-zinc-600 leading-relaxed font-medium">Use the <span className="font-bold text-zinc-900">QR Check-in</span> at your event entrance to track real-time attendance automatically.</p>
              </div>
           </aside>
        </div>
      </main>
    </div>
  );
}

function QuickStat({ label, value, icon, color, bg }: any) {
  return (
    <Card className="border-none shadow-sm bg-white overflow-hidden hover:translate-y-[-2px] transition-all duration-300">
      <CardContent className="p-5 flex items-center gap-4">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", bg, color)}>
           {icon}
        </div>
        <div>
           <p className="text-lg font-black tracking-tighter text-zinc-900">{value}</p>
           <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function TabBtn({ active, onClick, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
        active ? "bg-zinc-900 text-white shadow-md" : "text-zinc-400 hover:text-zinc-900"
      )}
    >
      {label}
    </button>
  );
}

function InvitationCard({ invite }: { invite: any }) {
  const data = invite.data;
  const eventType = invite.event_type || 'wedding';
  const rsvps = invite.rsvps || [];
  
  const confirmedCount = rsvps.filter((r:any) => r.status === 'hadir').reduce((a:number, b:any) => a + (b.guest_count || 1), 0);
  const responseCount = rsvps.length;

  const getIcon = () => {
    switch(eventType) {
      case 'wedding': return <Heart className="text-rose-500 fill-rose-500" size={12} />;
      case 'birthday': return <PartyPopper className="text-amber-500" size={12} />;
      case 'corporate': return <Briefcase className="text-blue-500" size={12} />;
      default: return <img src="/Main-logo.svg" alt="" className="h-3 w-auto" />;
    }
  };

  return (
    <Card className="overflow-hidden border-none shadow-sm hover:shadow-2xl transition-all duration-500 group rounded-[2.5rem] bg-white border border-zinc-100/50">
      <div className="aspect-[16/10] relative overflow-hidden m-2.5 rounded-[2rem] bg-zinc-50">
        {data.gallery?.[0] ? (
          <img src={data.gallery[0]} alt={data.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-10"><img src="/Main-logo.svg" alt="" className="h-10 w-auto" /></div>
        )}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm border border-white/20">
           {getIcon()}
           <span className="text-[9px] font-black uppercase tracking-[0.15em] text-zinc-900">{eventType}</span>
        </div>
      </div>
      
      <CardHeader className="px-7 pt-4 pb-0">
        <CardTitle className="text-xl font-black tracking-tight text-zinc-900 uppercase truncate">{data.title}</CardTitle>
        <div className="flex items-center gap-2 text-zinc-400 mt-1">
           <Calendar size={12} />
           <span className="text-[9px] font-bold uppercase tracking-widest">
             {data.mainDate ? new Date(data.mainDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Pending'}
           </span>
        </div>
      </CardHeader>
      
      <CardContent className="px-7 pt-6 pb-2">
         {/* RSVP Progress */}
         <div className="space-y-2">
            <div className="flex justify-between items-end">
               <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">RSVP Status</span>
               <span className="text-[10px] font-bold text-zinc-900">{confirmedCount} Confirmed</span>
            </div>
            <div className="h-1.5 bg-zinc-50 rounded-full overflow-hidden flex">
               <div className="h-full bg-emerald-400" style={{ width: `${Math.min(100, (confirmedCount/100)*100)}%` }} />
               <div className="h-full bg-amber-300 opacity-30" style={{ width: `${Math.max(0, ((responseCount-confirmedCount)/100)*100)}%` }} />
            </div>
         </div>
      </CardContent>
      
      <CardFooter className="px-6 pb-6 pt-4 grid grid-cols-2 gap-3">
         <Link href={`/invite/customize?id=${invite.id}`} className={cn(buttonVariants({ size: "sm" }), "rounded-xl font-black text-[9px] tracking-widest h-10 shadow-lg shadow-primary/10 transition-all active:scale-95 bg-zinc-900 hover:bg-primary")}>
            <Settings size={12} className="mr-2" /> STUDIO
         </Link>
         <Link href={`/dashboard/${invite.id}`} className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "rounded-xl font-black text-[9px] tracking-widest h-10 bg-white hover:bg-zinc-50 text-zinc-600 border border-zinc-100 shadow-sm")}>
            <Users size={12} className="mr-2" /> GUESTS
         </Link>
         <Link href={`/invite/${invite.id}`} target="_blank" className="col-span-2 text-center text-[9px] font-bold text-zinc-300 hover:text-primary transition-colors tracking-widest uppercase flex items-center justify-center gap-1.5 mt-1">
            Open live site <ExternalLink size={10} />
         </Link>
      </CardFooter>
    </Card>
  );
}
