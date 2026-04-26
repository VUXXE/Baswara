import { Metadata } from 'next';
import EventInvitationClient from './EventInvitationClient';
import { supabase } from '@/lib/supabase';
import { EventInvitationData } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Undangan Digital | Baswara',
  description: 'Anda diundang untuk menyaksikan momen bahagia kami.',
};

export default async function InvitationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Fetch invitation data from Supabase
  const { data: invitation, error } = await supabase
    .from('invitations')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !invitation) {
    // If not found in DB, return the client with mock data as fallback
    return <EventInvitationClient id={id} />;
  }

  const invitationData = invitation.data as EventInvitationData;

  return <EventInvitationClient id={id} initialData={invitationData} dbId={invitation.id} />;
}
