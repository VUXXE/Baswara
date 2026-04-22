import { Event, Guest } from './types';

export const mockEvents: Event[] = [
  {
    id: 'evt-001',
    hostId: 'host-123',
    title: 'Product Launch 2026',
    description: 'Join us for the unveiling of our newest innovations. Drinks and light appetizers will be served.',
    date: '2026-06-15',
    time: '18:30',
    location: 'Grand Ballroom, Tech Hub',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    createdAt: '2026-04-20T10:00:00Z'
  },
  {
    id: 'evt-002',
    hostId: 'host-123',
    title: 'Annual Company Retreat',
    description: 'A weekend of team building, relaxation, and strategy planning.',
    date: '2026-08-20',
    time: '09:00',
    location: 'Mountain View Resort',
    coverImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    createdAt: '2026-04-21T14:30:00Z'
  }
];

export const mockGuests: Guest[] = [
  {
    id: 'gst-001',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    eventId: 'evt-001',
    status: 'attending',
    dietaryRestrictions: 'Vegan',
    plusOne: true,
    createdAt: '2026-04-21T11:00:00Z'
  },
  {
    id: 'gst-002',
    name: 'Bob Smith',
    email: 'bob@example.com',
    eventId: 'evt-001',
    status: 'declined',
    plusOne: false,
    createdAt: '2026-04-21T12:00:00Z'
  },
  {
    id: 'gst-003',
    name: 'Charlie Davis',
    email: 'charlie@example.com',
    eventId: 'evt-001',
    status: 'pending',
    plusOne: false,
    createdAt: '2026-04-22T09:00:00Z'
  }
];
