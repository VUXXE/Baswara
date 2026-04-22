import './CreateEvent.css';

export default function CreateEventPage() {
  return (
    <div className="container mt-8 mb-8">
      <div className="form-container glass">
        <h1 className="text-center mb-8">Create New Event</h1>
        
        <form className="create-event-form flex flex-col gap-6">
          <div className="form-group">
            <label htmlFor="title">Event Title</label>
            <input type="text" id="title" className="input" placeholder="e.g., Alice's 30th Birthday Party" required />
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="date">Date</label>
              <input type="date" id="date" className="input" required />
            </div>
            <div className="form-group flex-1">
              <label htmlFor="time">Time</label>
              <input type="time" id="time" className="input" required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input type="text" id="location" className="input" placeholder="e.g., 123 Main St, New York, NY" required />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" className="input textarea" rows={4} placeholder="Tell your guests what the event is about..."></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Publish Event
          </button>
        </form>
      </div>
    </div>
  );
}
