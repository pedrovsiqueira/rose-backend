import { Schema, Document, model } from 'mongoose';

type PsychologistDTO = Document & {};

const PsychologistSchema = new Schema(
  {
    name: {
      type: String,
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
    crp: {
      type: String,
      required: true,
    },
    workingHours: {
      startTime: {
        type: String,
      },
      endTime: {
        type: String,
      },
    },
    education: [
      {
        type: String,
      },
    ],
    specialties: [
      {
        type: String,
      },
    ],
    experience: [
      {
        type: String,
      },
    ],
    price: {
      type: Number,
    },
    virtualRoom: {
      type: String,
    },
    longDescription: {
      type: String,
    },
    shortDescription: {
      type: String,
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
