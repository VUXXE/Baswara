export interface Event {
  id: string;
  hostId: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  coverImage?: string;
  createdAt: string;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  eventId: string;
  status: 'attending' | 'declined' | 'pending';
  dietaryRestrictions?: string;
  plusOne: boolean;
  createdAt: string;
}
