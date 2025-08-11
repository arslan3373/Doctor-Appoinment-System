export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  image: string;
  qualifications: string[];
  languages: string[];
  consultationFee: number;
  availableSlots: TimeSlot[];
  treatments: string[];
  about: string;
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  isAvailable: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'in-person' | 'online';
  symptoms?: string;
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address?: string;
  role: 'patient' | 'doctor';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'appointment' | 'reminder' | 'cancellation';
  read: boolean;
  createdAt: string;
}