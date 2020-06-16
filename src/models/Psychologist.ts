import { Schema, Document, model } from 'mongoose';

type PsychologistDTO = Document & {};

const PsychologistSchema = new Schema(
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
    whatsapp: {
      type: String,
    },
    CRP: {
      type: String,
      required: true,
    },
    workingHours: {
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
    },
    education: [
      {
        type: String,
        required: true,
      },
    ],
    specialties: [
      {
        type: String,
        required: true,
      },
    ],
    experience: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    virtualRoom: {
      type: String,
    },
    longDescription: {
      type: String,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    //todo => Review later
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

const Psychologist = model<PsychologistDTO>('Psychologist', PsychologistSchema);

export default Psychologist;
