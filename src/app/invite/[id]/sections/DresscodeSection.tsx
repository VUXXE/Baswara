import { EventInvitationData } from "@/lib/types";

export default function DresscodeSection({ data }: { data: EventInvitationData }) {
  if (!data.dresscode) return null;

  return (
    <section className="inv-section" style={{ textAlign: "center" }}>
      <p className="inv-section-label">Dress Code</p>
      <h2 className="inv-section-title">Busana <em>Tamu</em></h2>

      <p className="inv-dresscode-theme">{data.dresscode.theme}</p>

      <div className="inv-dresscode-palette">
        {data.dresscode.palette?.map((color) => (
          <div
            key={color}
            className="inv-dresscode-swatch"
            style={{ background: color }}
            title={color}
          />
        ))}
      </div>

      <p className="inv-dresscode-note">⚠ {data.dresscode.note}</p>
    </section>
  );
}
