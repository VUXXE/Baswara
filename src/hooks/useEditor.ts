"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { EventInvitationData } from "@/lib/types";
import { TEMPLATES } from "@/lib/templates";

export function useEditor(initialData: EventInvitationData, editId: string | null) {
  const [data, setData] = useState<EventInvitationData>(initialData);
  const [slug, setSlug] = useState("my-event");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      if (editId) {
        const { data: invite, error } = await supabase
          .from('invitations')
          .select('*')
          .eq('id', editId)
          .single();
        
        if (invite && !error) {
          setData(invite.data);
          setSlug(invite.slug);
        }
      }
    };
    checkAuthAndFetch();
  }, [router, editId]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) throw new Error("You must be logged in.");

      const payload: any = {
        slug: slug,
        user_id: session.user.id,
        event_type: data.eventType,
        hashtag: data.hashtag,
        data: data,
        updated_at: new Date().toISOString(),
      };

      // If we are editing an existing record, include the ID to trigger UPDATE instead of INSERT
      if (editId) {
        payload.id = editId;
      }

      const { error } = await supabase
        .from('invitations')
        .upsert(payload, { onConflict: 'id' });

      if (error) throw error;
      setLastSaved(new Date());
    } catch (err: any) {
      alert("Error saving: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const updateData = (path: string, value: any) => {
    setData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let current: any = newData;
      for (let i = 0; i < parts.length - 1; i++) {
        const key = parts[i];
        if (!current[key]) current[key] = {};
        current = current[key];
      }
      current[parts[parts.length - 1]] = value;
      return newData;
    });
  };

  const applyTemplate = (templateId: string) => {
    const template = TEMPLATES.find(t => t.id === templateId);
    if (!template) return;
    
    setData(prev => ({
      ...prev,
      templateId: templateId,
      theme: { ...prev.theme, ...template.defaultData.theme }
    }));
  };

  const addItem = (path: string, newItem: any) => {
    const currentList = getNestedValue(data, path) || [];
    updateData(path, [...currentList, newItem]);
  };

  const removeItem = (path: string, index: number) => {
    const currentList = getNestedValue(data, path) || [];
    updateData(path, currentList.filter((_: any, i: number) => i !== index));
  };

  const updateListItem = (path: string, index: number, value: any) => {
    const currentList = [...(getNestedValue(data, path) || [])];
    currentList[index] = value;
    updateData(path, currentList);
  };

  function getNestedValue(obj: any, path: string) {
    return path.split('.').reduce((prev, curr) => prev && prev[curr], obj);
  }

  return {
    data,
    slug,
    setSlug,
    isSaving,
    lastSaved,
    handleSave,
    updateData,
    applyTemplate,
    addItem,
    removeItem,
    updateListItem
  };
}
