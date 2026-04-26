import { EventInvitationData } from "@/lib/types";

export default function StorySection({ data }: { data: EventInvitationData }) {
  const eventType = (data as any).eventType || 'event';
  const label = eventType === 'wedding' ? 'Kisah Cinta' : eventType === 'birthday' ? 'Perjalanan' : 'Tentang Kami';
  
  return (
    <section className="inv-section">
      <p className="inv-section-label">{label}</p>
      <h2 className="inv-section-title">Momen <em>Berharga</em></h2>

      <div className="inv-story-timeline">
        {data.story?.map((item) => (
          <div className="inv-story-item" key={item.year}>
            <p className="inv-story-year">{item.year}</p>
            <p className="inv-story-title">{item.title}</p>
            <p className="inv-story-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
