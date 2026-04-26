import { EventInvitationData } from "@/lib/types";

export default function DresscodeSection({ data }: { data: EventInvitationData }) {
  const dresscode = data.dresscode;
  if (!dresscode) return null;

  return (
    <section className="inv-section" style={{ textAlign: "center" }}>
      <p className="inv-section-label">Dress Code</p>
      <h2 className="inv-section-title">Busana <em>Tamu</em></h2>

      {dresscode.image && (
        <div className="w-full max-w-sm mx-auto h-48 mb-6 overflow-hidden rounded-2xl">
           <img src={dresscode.image} alt="Dresscode" className="w-full h-full object-cover" />
        </div>
      )}

      <p className="inv-dresscode-theme">{dresscode.theme}</p>

      <div className="inv-dresscode-palette">
        {dresscode.palette?.map((color) => (
          <div
            key={color}
            className="inv-dresscode-swatch"
            style={{ background: color }}
            title={color}
          />
        ))}
      </div>

      <p className="inv-dresscode-note">⚠ {dresscode.note}</p>
    </section>
  );
}
