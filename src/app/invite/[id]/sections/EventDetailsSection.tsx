import { WeddingData } from "@/lib/types";

export default function EventDetailsSection({ data }: { data: WeddingData }) {
  return (
    <section className="inv-section">
      <p className="inv-section-label">Rangkaian Acara</p>
      <h2 className="inv-section-title">Waktu &amp; <em>Tempat</em></h2>
      <p className="inv-section-sub">Kehadiran Anda adalah kebahagiaan terbesar kami</p>

      <div className="inv-event-cards">
        {data.events.map((ev) => (
          <div className="inv-event-card" key={ev.name}>
            <span className="inv-event-badge">{ev.name}</span>
            <p className="inv-event-date">{ev.date}</p>
            <p className="inv-event-time">{ev.time}</p>
            <p className="inv-event-venue">{ev.location}</p>
            <p className="inv-event-addr">{ev.address}</p>
            
            {ev.googleMapsEmbedUrl && (
              <div className="inv-map-container">
                <iframe
                  src={ev.googleMapsEmbedUrl}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map to ${ev.location}`}
                />
              </div>
            )}

            <a className="inv-map-btn" href={ev.mapsUrl} target="_blank" rel="noreferrer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Lihat Peta
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
