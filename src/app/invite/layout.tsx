import type { Metadata } from "next";
import "./[id]/invite.css";

export const metadata: Metadata = {
  title: "Undangan Pernikahan | Baswara",
  description: "Anda diundang untuk menyaksikan momen bahagia kami.",
};

export default function InviteLayout({ children }: { children: React.ReactNode }) {
  // No Navbar — invitation pages are fully standalone
  return <>{children}</>;
}
