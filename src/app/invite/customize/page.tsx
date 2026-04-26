"use client";

import { useState, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { DEFAULT_EVENT_DATA } from "../[id]/EventInvitationClient";
import { useEditor } from "@/hooks/useEditor";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { StudioNavigation } from "@/components/studio/StudioNavigation";
import { StudioEditor } from "@/components/studio/StudioEditor";
import { StudioPreview } from "@/components/studio/StudioPreview";

type EditorTab = "templates" | "general" | "organizers" | "events" | "gallery" | "story" | "gift" | "theme" | "layout" | "music" | "dresscode";
type Device = "mobile" | "tablet" | "desktop";
type Orientation = "portrait" | "landscape";

function EditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');
  
  const {
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
  } = useEditor(DEFAULT_EVENT_DATA, editId);

  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [editorTab, setEditorTab] = useState<EditorTab>("templates");
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [device, setDevice] = useState<Device>("mobile");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSectionSelect = (sectionId: string) => {
    // Map section IDs to editor tabs
    const tabMap: Record<string, EditorTab> = {
      general: 'general',
      organizers: 'organizers',
      layout: 'layout',
      events: 'events',
      dresscode: 'dresscode',
      gallery: 'gallery',
      story: 'story',
      gift: 'gift',
      music: 'music',
      theme: 'theme'
    };

    if (tabMap[sectionId]) {
      setEditorTab(tabMap[sectionId]);
      setSelectedSection(sectionId);
      setActiveTab('edit'); // Switch to editor view on mobile if a section is clicked
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#fafafa] font-sans selection:bg-primary/10 text-zinc-900">
      <StudioHeader 
        router={router}
        slug={slug}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lastSaved={lastSaved}
        isSaving={isSaving}
        handleSave={handleSave}
      />

      <div className="flex-1 flex flex-col sm:flex-row overflow-hidden relative">
        <StudioNavigation 
          editorTab={editorTab}
          setEditorTab={(tab) => {
            setEditorTab(tab);
            setSelectedSection(null); // Clear selection when manually switching tabs
          }}
        />

        <div className="flex-1 flex overflow-hidden pb-16 sm:pb-0">
          {/* EDITOR AREA */}
          <div className={`${activeTab === "edit" ? "flex" : "hidden"} sm:flex overflow-hidden`}>
            <StudioEditor 
              editorTab={editorTab}
              data={data}
              slug={slug}
              setSlug={setSlug}
              updateData={updateData}
              applyTemplate={applyTemplate}
              addItem={addItem}
              removeItem={removeItem}
              updateListItem={updateListItem}
            />
          </div>

          {/* PREVIEW AREA */}
          <StudioPreview 
            data={data}
            device={device}
            setDevice={setDevice}
            orientation={orientation}
            setOrientation={setOrientation}
            containerRef={containerRef}
            activeTab={activeTab}
            selectedSection={selectedSection || undefined}
            onSectionSelect={handleSectionSelect}
          />
        </div>
      </div>
    </div>
  );
}

export default function CustomizePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#fafafa]"><Loader2 className="animate-spin text-primary h-8 w-8" /></div>}>
      <EditorContent />
    </Suspense>
  );
}
