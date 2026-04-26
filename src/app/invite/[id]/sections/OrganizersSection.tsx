import Image from "next/image";
import { EventInvitationData } from "@/lib/types";

export default function OrganizersSection({ data }: { data: any }) {
  const organizers = data.organizers || [];
  if (organizers.length === 0) return null;

  return (
    <section className="inv-section">
      <div className="inv-couple-grid">
        {organizers.map((person: any, idx: number) => (
          <div key={idx} className="inv-couple-card">
            {person.photo && (
              <Image 
                src={person.photo} 
                alt={person.name} 
                width={160} 
                height={160} 
                className="inv-couple-photo"
              />
            )}
            <h3 className="inv-couple-name">{person.name}</h3>
            <p className="inv-couple-fullname">{person.fullName}</p>
            {person.role && <p className="inv-event-badge" style={{ marginTop: 4, padding: '2px 12px' }}>{person.role}</p>}
            <p className="inv-couple-parents">{person.subText}</p>
            {person.instagram && (
              <a href={`https://instagram.com/${person.instagram.replace("@","")}`} target="_blank" rel="noreferrer" className="inv-couple-ig">
                {person.instagram}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
