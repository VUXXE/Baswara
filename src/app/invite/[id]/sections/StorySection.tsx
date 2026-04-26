import { WeddingData } from "@/lib/types";

export default function StorySection({ data }: { data: WeddingData }) {
  return (
    <section className="inv-section">
      <p className="inv-section-label">Kisah Cinta</p>
      <h2 className="inv-section-title">Perjalanan <em>Kami</em></h2>

      <div className="inv-story-timeline">
        {data.story.map((item) => (
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
