import { Schema, Document, model } from 'mongoose';
import { PatientDTO } from '../dtos/PatientDTO';

type PatientSchema = Document & PatientDTO;

const PatientSchema = new Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    //todo => Review later
    date: {
      type: Date,
      default: Date(),
    },
    favPsychologists: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Psychologist',
      },
    ],
    appointments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Appointment',
      },
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Patient = model<PatientSchema>('Patient', PatientSchema);

export default Patient;
