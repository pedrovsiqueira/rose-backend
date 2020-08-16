import { Document } from 'mongoose';
import { IProfessional } from './IProfessional';
import { IPatient } from './IPatient';

export interface IReview extends Document {
  psychologist: IProfessional | string;
  patient: IPatient;
  rate: number;
  description: string;
}
