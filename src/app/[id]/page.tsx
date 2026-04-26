import { redirect, notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';

/**
 * DYNAMIC REDIRECT ROUTE
 * 
 * This route allows for clean sharing links like:
 * baswara.com/my-wedding
 * instead of baswara.com/invite/UUID
 */

export default async function SlugRedirectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: slug } = await params;

  // 1. Attempt to find an invitation with this SLUG
  const { data: invitation, error } = await supabase
    .from('invitations')
    .select('id')
    .eq('slug', slug)
    .single();

  // 2. If found, redirect to the full invite path
  if (invitation && !error) {
    redirect(`/invite/${invitation.id}`);
  }

  // 3. If not found, show 404
  notFound();
}
