import { Schema, Document, model } from 'mongoose';

type PatientDTO = Document & {};

const PatientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
      type: String,
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

const Patient = model<PatientDTO>('Patient', PatientSchema);

export default Patient;
