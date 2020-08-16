import { Document } from 'mongoose';
import { IAppointment } from './IAppointment';
import { IProfessional } from './IProfessional';
import { IReview } from './IReview';

export interface IPatient extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  date: string;
  favPsychologists?: IProfessional[];
  appointments?: IAppointment[];
  review?: IReview[];
}
