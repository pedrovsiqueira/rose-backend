import { AppointmentDTO } from './AppointmentDTO';
import { PsychologistDTO } from './PsychologistDTO';

export interface PatientDTO {
  _id: string;
  name?: string;
  email: string;
  password: string;
  avater?: string;
  date?: string;
  favPsychologists?: string[] | PsychologistDTO[];
  appointments?: string[] | AppointmentDTO[];
  review?: string[];
}
