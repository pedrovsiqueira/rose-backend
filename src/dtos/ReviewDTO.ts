import { PsychologistDTO } from './PsychologistDTO';
import { PatientDTO } from './PatientDTO';

export interface ReviewDTO {
  psychologist: PsychologistDTO;
  patient: PatientDTO;
  rate: number;
  description: string;
}
