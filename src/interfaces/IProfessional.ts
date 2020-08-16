import { Document } from 'mongoose';
import { IAppointment } from './IAppointment';
import { IReview } from './IReview';

export interface IProfessional extends Document {
  name: string;
  email: string;
  password: string;
  crp: string;
  avatar: string;
  whatsapp: string;
  workingHours: {
    startTime: string;
    endTime: string;
  };
  education: string[];
  specialties: string[];
  experience: string[];
  price: number;
  virtualRoom: string;
  longDescription: string;
  shortDescription: string;
  appointments?: IAppointment[];
  reviews?: IReview[];
  healthInsurance?: string[];
  professionalType: string;
  genderIdentity: string;
  community: string;
  ethnicity: string;
}
