import { mockEvents } from '@/lib/mockData';
import Link from 'next/link';
import './Dashboard.css';

export default function DashboardPage() {
  return (
    <div className="container mt-8 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h1>Your Events</h1>
        <Link href="/events/new" className="btn btn-primary">
          + Create Event
        </Link>
      </div>

      <div className="events-grid mt-4">
        {mockEvents.map((event) => (
          <div key={event.id} className="card event-card">
            <div className="event-image" style={{ backgroundImage: `url(${event.coverImage})` }}></div>
            <div className="event-content">
              <h3>{event.title}</h3>
              <p className="event-date">{new Date(event.date).toLocaleDateString()} at {event.time}</p>
              <p className="event-location">{event.location}</p>
              
              <div className="event-actions mt-4">
                <Link href={`/events/${event.id}`} className="btn btn-secondary w-full">Manage Event</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
