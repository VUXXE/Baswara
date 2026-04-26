import { WeddingData } from "@/lib/types";

export default function HeroSection({ data }: { data: WeddingData }) {
  return (
    <section className="inv-hero">
      <div className="inv-hero-divider" />
      <p className="inv-hero-pre">Bismillahirrahmanirrahim</p>
      <h1 className="inv-hero-names">
        {data.couple.groom.name}
        <span className="inv-hero-amp">&amp;</span>
        {data.couple.bride.name}
      </h1>
      <p className="inv-hero-date">
        {data.events[0]?.date?.toUpperCase() || data.weddingDate?.split('T')[0]}
      </p>
      <p className="inv-hero-msg">
        &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu
        isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya.&rdquo;
        <br />
        <span style={{ fontSize: '0.82rem', opacity: 0.7 }}>— QS. Ar-Rum: 21</span>
      </p>
    </section>
  );
}
