import { mockEvents } from '@/lib/mockData';
import { notFound } from 'next/navigation';
import './EventPage.css';

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const event = mockEvents.find(e => e.id === resolvedParams.id);
  
  if (!event) {
    notFound();
  }

  return (
    <div className="event-page-container">
      <div 
        className="event-hero" 
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(${event.coverImage || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'})` }}
      >
        <div className="container event-hero-content text-center">
          <h1 className="text-gradient">{event.title}</h1>
          <p className="event-meta mt-4">
            <span className="meta-item">🗓️ {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="meta-item">⏰ {event.time}</span>
            <span className="meta-item">📍 {event.location}</span>
          </p>
        </div>
      </div>

      <div className="container mt-8 mb-8">
        <div className="rsvp-section glass card">
          <div className="event-description mb-8">
            <h2>About the Event</h2>
            <p>{event.description}</p>
          </div>

          <hr className="divider mb-8" />

          <h2 className="text-center mb-6">Will you be joining us?</h2>
          <form className="rsvp-form flex flex-col gap-6">
            <div className="form-row">
              <div className="form-group flex-1">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" className="input" required />
              </div>
              <div className="form-group flex-1">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" className="input" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" className="input" required />
            </div>

            <div className="form-group">
              <label>Attendance</label>
              <div className="radio-group flex gap-4">
                <label className="radio-label card flex-1 text-center cursor-pointer hover-effect">
                  <input type="radio" name="attendance" value="attending" required />
                  <span className="mt-2 block font-bold">Joyfully Accept</span>
                </label>
                <label className="radio-label card flex-1 text-center cursor-pointer hover-effect">
                  <input type="radio" name="attendance" value="declined" required />
                  <span className="mt-2 block font-bold">Regretfully Decline</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="dietary">Dietary Restrictions (Optional)</label>
              <input type="text" id="dietary" className="input" placeholder="e.g., Vegan, Gluten-free" />
            </div>

            <button type="submit" className="btn btn-primary btn-lg mt-4 w-full">
              Send RSVP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
