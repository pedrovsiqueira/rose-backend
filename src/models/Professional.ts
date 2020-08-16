import { Schema, model } from 'mongoose';
import { IProfessional } from '../interfaces/IProfessional';

const ProfessionalSchema = new Schema(
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
    healthInsurance: [
      {
        type: String,
      },
    ],
    professionalType: {
      type: String,
      enum: ['psicologe', 'psiquiatra'],
    },
    genderIdentity: {
      type: String,
      enum: [
        'mulherCis',
        'homemCis',
        'mulherTrans',
        'homemTrans',
        'naoBinario',
      ],
    },
    community: {
      type: String,
      enum: [
        'lesbica',
        'gay',
        'bissexual',
        'transgenero',
        'transsexual',
        'twoSpirit',
        'queer',
        'intersex',
        'assexual',
        'pansexual',
        'naoBinario',
        'outros',
      ],
    },
    ethnicity: {
      type: String,
      enum: ['asiatica', 'branca', 'indigena', 'negra', 'outras'],
    },
  },
  {
    timestamps: true,
  },
);

const Professional = model<IProfessional>(
  'Professional',
  ProfessionalSchema,
);

export default Professional;
