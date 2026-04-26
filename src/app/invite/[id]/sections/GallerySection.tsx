import Image from "next/image";
import { EventInvitationData } from "@/lib/types";

export default function GallerySection({ data }: { data: EventInvitationData }) {
  return (
    <section className="inv-section">
      <p className="inv-section-label">Galeri</p>
      <h2 className="inv-section-title">Foto <em>Pranikah</em></h2>

      <div className="inv-gallery-grid">
        {(data.gallery && data.gallery.length > 0 ? data.gallery : []).map((src, i) => (
          <div key={i} style={{ overflow: "hidden" }}>
            <Image
              src={src}
              alt={`Gallery ${i + 1}`}
              width={400}
              height={400}
              className="inv-gallery-img"
              unoptimized
            />
          </div>
        ))}
      </div>
    </section>
  );
}
