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

export type EventType = 'wedding' | 'birthday' | 'seminar' | 'party' | 'corporate' | 'other';

export interface EventInvitationData {
  id: string;
  eventType: EventType;
  templateId: string;
  hashtag?: string;
  greeting: string;
  guestName: string;
  
  // General event info
  title: string;
  subTitle?: string;
  description?: string;
  heroImage?: string;
  sideImage?: string;
  envelopeImage?: string;
  backgroundImage?: string;
  
  // Specific for weddings but generic enough for others
  organizers?: {
    name: string;
    fullName: string;
    photo?: string;
    instagram?: string;
    role?: string; // e.g. "Groom", "Bride", "Birthday Boy", "Host"
    subText?: string; // e.g. parents info
  }[];

  layout?: {
    showOrganizers: boolean;
    showCountdown: boolean;
    showEvents: boolean;
    showDresscode: boolean;
    showGallery: boolean;
    showStory: boolean;
    showGift: boolean;
    showRSVP: boolean;
  };

  events: {
    name: string;
    date: string;
    time: string;
    location: string;
    address: string;
    mapsUrl: string;
    googleMapsEmbedUrl?: string;
    image?: string;
  }[];
  
  mainDate: string;
  
  dresscode?: {
    theme: string;
    palette: string[];
    note: string;
    image?: string;
  };
  
  gallery?: string[];
  
  story?: {
    year: string;
    title: string;
    desc: string;
    image?: string;
  }[];
  
  gift?: {
    banks: {
      bank: string;
      accountName: string;
      accountNumber: string;
    }[];
    address: string;
  };
  
  music?: {
    url: string;
    autoPlay: boolean;
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
}

export interface RSVP {
  id: string;
  invitation_id: string;
  name: string;
  phone_number: string;
  guest_count: number;
  status: 'hadir' | 'berhalangan' | 'pending';
  message: string;
  qr_token: string;
  created_at: string;
}
