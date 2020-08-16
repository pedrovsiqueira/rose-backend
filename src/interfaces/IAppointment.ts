import { Document } from 'mongoose';
import { IPatient } from './IPatient';
import { IProfessional } from './IProfessional';

export interface IAppointment extends Document {
  startTime: string;
  endTime: string;
  psychologist: IProfessional;
  patient: IPatient;
  isPaid?: boolean;
}
