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

export interface WeddingData {
  id: string;
  templateId: string;
  hashtag: string;
  greeting: string;
  guestName: string;
  couple: {
    groom: {
      name: string;
      fullName: string;
      parents: string;
      photo: string;
      instagram: string;
    };
    bride: {
      name: string;
      fullName: string;
      parents: string;
      photo: string;
      instagram: string;
    };
  };
  events: {
    name: string;
    date: string;
    time: string;
    location: string;
    address: string;
    mapsUrl: string;
    googleMapsEmbedUrl?: string;
  }[];
  weddingDate: string;
  dresscode: {
    theme: string;
    palette: string[];
    note: string;
  };
  gallery: string[];
  story: {
    year: string;
    title: string;
    desc: string;
  }[];
  gift: {
    banks: {
      bank: string;
      accountName: string;
      accountNumber: string;
    }[];
    address: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    tertiaryColor: string;
    backgroundColor: string;
    textColor: string;
    
    fontHeading: {
      family: string;
      size: string;
      weight: string;
      lineHeight?: string;
      letterSpacing?: string;
      transform: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
    };
    fontBody: {
      family: string;
      size: string;
      weight: string;
      lineHeight?: string;
      letterSpacing?: string;
      transform: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
    };
  };
  user?: {
    phoneNumber: string;
    address: string;
    email: string;
  };
}

export interface RSVP {
  id: string;
  wedding_id: string;
  name: string;
  phone_number: string;
  guest_count: number;
  status: 'hadir' | 'berhalangan' | 'pending';
  message: string;
  qr_token: string;
  created_at: string;
}
