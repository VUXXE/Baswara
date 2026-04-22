import Link from 'next/link';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar glass">
      <div className="container flex justify-between items-center navbar-content">
        <Link href="/" className="logo text-gradient">
          RSVPhub
        </Link>
        <div className="nav-links flex gap-6 items-center">
          <Link href="/dashboard" className="nav-item">Dashboard</Link>
          <Link href="/events/new" className="btn btn-primary">Create Event</Link>
        </div>
      </div>
    </nav>
  );
}
