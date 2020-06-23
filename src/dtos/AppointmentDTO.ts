import { PatientDTO } from './PatientDTO';
import { PsychologistDTO } from './PsychologistDTO';

export interface AppointmentDTO {
  _id: string;
  startTime: string;
  endTime: string;
  psychologist: string | PsychologistDTO;
  patient: string | PatientDTO;
  isPaid?: boolean;
}
