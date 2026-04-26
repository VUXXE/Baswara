import { EventInvitationData } from "@/lib/types";

export default function EventDetailsSection({ data }: { data: EventInvitationData }) {
  const getLabels = () => {
    switch (data.eventType) {
      case 'wedding':
        return {
          label: "Rangkaian Acara",
          title: <>Waktu & <em>Tempat</em></>,
          sub: "Kehadiran Anda adalah kebahagiaan terbesar kami"
        };
      case 'birthday':
        return {
          label: "Info Pesta",
          title: <>Kapan & <em>Dimana</em></>,
          sub: "Datang ya untuk merayakan hari spesialku!"
        };
      case 'seminar':
        return {
          label: "Agenda",
          title: <>Jadwal <em>Sesi</em></>,
          sub: "Silakan perhatikan waktu dan lokasi setiap sesi"
        };
      default:
        return {
          label: "Informasi Acara",
          title: <>Waktu & <em>Lokasi</em></>,
          sub: "Detail pelaksanaan acara kami"
        };
    }
  };

  const labels = getLabels();

  return (
    <section className="inv-section">
      <p className="inv-section-label">{labels.label}</p>
      <h2 className="inv-section-title">{labels.title}</h2>
      <p className="inv-section-sub">{labels.sub}</p>

      <div className="inv-event-cards">
        {data.events?.map((ev) => (
          <div className="inv-event-card" key={ev.name}>
            {ev.image && (
              <div className="w-full h-40 mb-4 overflow-hidden rounded-2xl">
                 <img src={ev.image} alt={ev.name} className="w-full h-full object-cover" />
              </div>
            )}
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
