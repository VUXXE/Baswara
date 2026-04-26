import { Metadata } from 'next';
import WeddingInviteClient from './WeddingInviteClient';
import { supabase } from '@/lib/supabase';
import { WeddingData } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Wedding Invitation | Baswara',
  description: 'You are cordially invited to celebrate our wedding day.',
};

export default async function InvitePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Fetch from Supabase
  const { data: wedding, error } = await supabase
    .from('weddings')
    .select('id, data')
    .eq('slug', id)
    .single();

  if (error || !wedding) {
    console.error('Error fetching wedding or not found:', error);
    // Return the client with mock data as fallback or 404
    return <WeddingInviteClient id={id} />;
  }

  const weddingData = wedding.data as WeddingData;

  return <WeddingInviteClient id={id} initialData={weddingData} dbId={wedding.id} />;
}
