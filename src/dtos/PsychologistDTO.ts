import { AppointmentDTO } from './AppointmentDTO';

interface IWorkingHours {
  startTime: string;
  endTime: string;
}

export interface PsychologistDTO {
  _id: string;
  name?: string;
  email: string;
  password: string;
  crp: string;
  avatar?: string;
  whatsapp?: string;
  workingHours?: IWorkingHours;
  education?: string;
  specialties?: string;
  experience?: string;
  price?: number;
  virtualRoom?: string;
  longDescription?: string;
  shortDescription?: string;
  appointments?: string[] | AppointmentDTO[];
  reviews?: string[];
}
