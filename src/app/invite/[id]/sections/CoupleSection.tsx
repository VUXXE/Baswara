import Image from "next/image";
import { WeddingData } from "@/lib/types";

export default function CoupleSection({ data }: { data: WeddingData }) {
  const { groom, bride } = data.couple;
  return (
    <section className="inv-section">
      <p className="inv-section-label">Mempelai</p>
      <h2 className="inv-section-title">Dua Hati <em>Bersatu</em></h2>

      <div className="inv-couple-grid">
        {/* Groom */}
        <div className="inv-couple-card">
          <Image src={groom.photo} alt={groom.name} width={120} height={120} className="inv-couple-photo" />
          <p className="inv-couple-name">{groom.name}</p>
          <p className="inv-couple-fullname">{groom.fullName}</p>
          <p className="inv-couple-parents">{groom.parents}</p>
          {groom.instagram && (
            <a href={`https://instagram.com/${groom.instagram.replace("@","")}`} target="_blank" rel="noreferrer" className="inv-couple-ig">{groom.instagram}</a>
          )}
        </div>

        {/* Ampersand */}
        <div className="inv-couple-amp">&</div>

        {/* Bride */}
        <div className="inv-couple-card">
          <Image src={bride.photo} alt={bride.name} width={120} height={120} className="inv-couple-photo" />
          <p className="inv-couple-name">{bride.name}</p>
          <p className="inv-couple-fullname">{bride.fullName}</p>
          <p className="inv-couple-parents">{bride.parents}</p>
          {bride.instagram && (
            <a href={`https://instagram.com/${bride.instagram.replace("@","")}`} target="_blank" rel="noreferrer" className="inv-couple-ig">{bride.instagram}</a>
          )}
        </div>
      </div>
    </section>
  );
}
