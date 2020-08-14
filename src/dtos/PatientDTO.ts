import { AppointmentDTO } from './AppointmentDTO';
import { PsychologistDTO } from './PsychologistDTO';
import { Document } from 'mongoose';

export interface PatientDTO {
  _id: string;
  name?: string;
  email: string;
  password: string;
  avater?: string;
  date?: string;
  favPsychologists?: string[] | PsychologistDTO[];
  appointments?: string[] | AppointmentDTO[];
  review?: string[] | Document[];
}
