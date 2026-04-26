import { EventInvitationData } from "@/lib/types";

export default function HeroSection({ data }: { data: EventInvitationData }) {
  return (
    <section className="inv-hero">
      <div className="inv-hero-divider" />
      <p className="inv-hero-pre">{data.subTitle || "You are invited to"}</p>
      <h1 className="inv-hero-names">
        {data.title}
      </h1>
      <p className="inv-hero-date">
        {data.events?.[0]?.date || "Save the Date"}
      </p>
      <p className="inv-hero-msg">
        {data.description || "Kami mengundang Anda untuk hadir dalam acara spesial kami."}
      </p>
    </section>
  );
}

