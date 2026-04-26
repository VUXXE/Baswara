-- =============================================
-- BASWARA DATABASE SCHEMA V2 (Robust)
-- Use this script for a clean rebuild
-- =============================================

-- 1. CLEANUP (Nuke everything)
DROP TABLE IF EXISTS "public"."rsvps" CASCADE;
DROP TABLE IF EXISTS "public"."weddings" CASCADE;
DROP TABLE IF EXISTS "public"."profiles" CASCADE;

-- 2. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 3. PROFILES
CREATE TABLE "public"."profiles" (
  "id" uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  "full_name" text,
  "phone_number" text,
  "address" text,
  "updated_at" timestamptz DEFAULT now(),
  PRIMARY KEY ("id")
);

-- 4. WEDDINGS
CREATE TABLE "public"."weddings" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
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

-- 5. RSVPS
CREATE TABLE "public"."rsvps" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "wedding_id" uuid NOT NULL REFERENCES public.weddings(id) ON DELETE CASCADE,
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

-- 6. SECURITY (RLS)
ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."weddings" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."rsvps" ENABLE ROW LEVEL SECURITY;

-- 7. POLICIES
CREATE POLICY "view_own_profile" ON "public"."profiles" FOR SELECT USING (auth.uid() = id);
CREATE POLICY "update_own_profile" ON "public"."profiles" FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "manage_own_weddings" ON "public"."weddings" FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "public_view_weddings" ON "public"."weddings" FOR SELECT USING (true);
CREATE POLICY "view_wedding_rsvps" ON "public"."rsvps" FOR SELECT USING (EXISTS (SELECT 1 FROM weddings WHERE id = rsvps.wedding_id AND user_id = auth.uid()));
CREATE POLICY "public_submit_rsvps" ON "public"."rsvps" FOR INSERT WITH CHECK (true);
