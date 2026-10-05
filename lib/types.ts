export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  isPopular?: boolean;
  features: string[];
  description?: string;
}

export interface WorkoutProgram {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  duration: string;
  level: string;
  features: string[];
  trainerName: string;
}

export interface Trainer {
  id: string;
  name: string;
  speciality: string;
  experience: string;
  image: string;
  bio: string;
  socials: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'interior' | 'equipment' | 'training' | 'cardio';
  image: string;
}

export interface MembershipEnquiry {
  id: string;
  enquiryNumber: string;
  fullName: string;
  phoneNumber: string;
  planId: string;
  planName: string;
  planPrice: number;
  age: number | string;
  joiningDate: string;
  notes?: string;
  status: 'New' | 'Contacted' | 'Enrolled' | 'Cancelled';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  phoneNumber: string;
  message: string;
  status: 'Unread' | 'Replied';
  createdAt: string;
}

export interface GymSettings {
  gymName: string;
  whatsappNumber: string;
  displayPhone: string;
  email: string;
  address: string;
  city: string;
  openingHoursWeekday: string;
  openingHoursSunday: string;
  currency: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroDescription: string;
}
