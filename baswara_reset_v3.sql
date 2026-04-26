-- =============================================
-- BASWARA DATABASE RESET & SCHEMA (Multi-Event V3)
-- =============================================

-- 1. CLEANUP (Nuke everything)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP TABLE IF EXISTS "public"."rsvps" CASCADE;
DROP TABLE IF EXISTS "public"."invitations" CASCADE;
DROP TABLE IF EXISTS "public"."profiles" CASCADE;

-- 2. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 3. TABLES

-- PROFILES: User identity and preferences
CREATE TABLE "public"."profiles" (
  "id" uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  "full_name" text,
  "phone_number" text,
  "address" text,
  "updated_at" timestamptz DEFAULT now(),
  PRIMARY KEY ("id")
);
  
-- INVITATIONS: Supports Weddings, Birthdays, Seminars, etc.
CREATE TABLE "public"."invitations" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  "event_type" text NOT NULL DEFAULT 'wedding',
  "slug" text NOT NULL,
  "hashtag" text,
  "preset_design" text DEFAULT 'classic',
  "data" jsonb NOT NULL,
  "qr_code_url" text,
  "created_at" timestamptz DEFAULT now(),
  "updated_at" timestamptz DEFAULT now(),
  PRIMARY KEY ("id"),
  UNIQUE ("slug")
);

-- RSVPS: Guest responses for any invitation type
CREATE TABLE "public"."rsvps" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "invitation_id" uuid NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
  "name" text NOT NULL,
  "phone_number" text,
  "guest_count" int4 DEFAULT 1,
  "status" text DEFAULT 'pending'::text,
  "message" text,
  "qr_token" text DEFAULT encode(gen_random_bytes(12), 'hex'::text),
  "created_at" timestamptz DEFAULT now(),
  PRIMARY KEY ("id"),
  UNIQUE ("qr_token"),
  CONSTRAINT "rsvps_status_check" CHECK (status IN ('hadir', 'berhalangan', 'pending'))
);

-- 4. SECURITY (Row Level Security)
ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."invitations" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."rsvps" ENABLE ROW LEVEL SECURITY;

-- POLICIES: Profiles (Users manage their own)
CREATE POLICY "manage_own_profile" ON "public"."profiles" 
FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- POLICIES: Invitations (Owners manage, public view by slug)
CREATE POLICY "manage_own_invitations" ON "public"."invitations" 
FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "public_view_invitations" ON "public"."invitations" 
FOR SELECT USING (true);

-- POLICIES: RSVPs (Owners view, public submit)
CREATE POLICY "view_invitation_rsvps" ON "public"."rsvps" 
FOR SELECT USING (EXISTS (SELECT 1 FROM invitations WHERE id = rsvps.invitation_id AND user_id = auth.uid()));
CREATE POLICY "public_submit_rsvps" ON "public"."rsvps" 
FOR INSERT WITH CHECK (true);

-- 5. AUTOMATION (Signup Trigger)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
