"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Plus, ExternalLink, Users, Calendar, Settings, Heart, PartyPopper, Briefcase, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const [invitations, setInvitations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchInvitations() {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
        return;
      }

      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setInvitations(data);
      }
      setLoading(false);
    }

    fetchInvitations();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <Loader2 className="animate-spin text-primary h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 uppercase">My Invitations</h1>
            <p className="text-muted-foreground text-sm font-medium">Manage all your events and digital RSVPs.</p>
          </div>
          <Link href="/onboarding" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto rounded-xl font-bold text-xs h-11 px-6 shadow-lg shadow-primary/20">
              <Plus size={16} className="mr-2" /> CREATE NEW EVENT
            </Button>
          </Link>
        </header>

        {invitations.length === 0 ? (
          <Card className="border-2 border-dashed border-zinc-200 bg-white/50 py-20 text-center rounded-[2rem]">
            <CardContent className="flex flex-col items-center">
              <div className="bg-zinc-100 p-6 rounded-full mb-6 text-zinc-400">
                <Calendar size={48} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">No events created yet</h3>
              <p className="text-muted-foreground mb-8 max-w-sm">Create your first digital invitation and start collecting RSVPs from your guests.</p>
              <Link href="/onboarding">
                <Button variant="outline" className="rounded-xl font-bold text-xs h-10 px-8">GET STARTED</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {invitations.map((invite) => (
              <InvitationCard key={invite.id} invite={invite} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function InvitationCard({ invite }: { invite: any }) {
  const data = invite.data;
  const eventType = invite.event_type || 'wedding';
  
  const getIcon = () => {
    switch(eventType) {
      case 'wedding': return <Heart className="text-rose-500" size={18} />;
      case 'birthday': return <PartyPopper className="text-amber-500" size={18} />;
      case 'corporate': return <Briefcase className="text-blue-500" size={18} />;
      default: return <img src="/Main-logo.svg" alt="" className="h-4 w-auto" />;
    }
  };

  return (
    <Card className="overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 group rounded-[2rem] bg-white">
      <div className="aspect-[16/9] relative overflow-hidden bg-zinc-100">
        {data.gallery?.[0] ? (
          <img 
            src={data.gallery[0]} 
            alt={data.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
             <img src="/Main-logo.svg" alt="Baswara" className="h-10 w-auto opacity-20" />
          </div>
        )}
        <div className="absolute top-4 left-4">
          <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
             {getIcon()}
             <span className="text-[10px] font-black uppercase tracking-widest">{eventType}</span>
          </div>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold tracking-tight line-clamp-1">{data.title}</CardTitle>
            <CardDescription className="text-xs font-medium uppercase tracking-wider mt-0.5">
              {data.mainDate ? new Date(data.mainDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Date not set'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardFooter className="pt-2 grid grid-cols-2 gap-3">
        <Link 
          href={`/invite/${invite.id}`} 
          target="_blank"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-xl font-bold text-[10px] tracking-widest h-10 border-zinc-100")}
        >
          <ExternalLink size={12} className="mr-2" /> VIEW LIVE
        </Link>
        <Link 
          href={`/invite/customize?id=${invite.id}`} 
          className={cn(buttonVariants({ variant: "default", size: "sm" }), "rounded-xl font-bold text-[10px] tracking-widest h-10 shadow-md shadow-primary/10")}
        >
          <Settings size={12} className="mr-2" /> CUSTOMIZE
        </Link>
        <Link 
          href={`/dashboard/${invite.id}`} 
          className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "col-span-2 rounded-xl font-bold text-[10px] tracking-widest h-10 bg-zinc-50 hover:bg-zinc-100 text-zinc-600")}
        >
          <Users size={12} className="mr-2" /> MANAGE RSVPS
        </Link>
      </CardFooter>
    </Card>
  );
}

const buttonVariants = ({ variant, size }: any) => {
  const base = "inline-flex items-center justify-center transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";
  const variants: any = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  const sizes: any = {
    sm: "px-3",
    md: "px-4 py-2",
    lg: "px-8",
  };
  return cn(base, variants[variant], sizes[size]);
};
