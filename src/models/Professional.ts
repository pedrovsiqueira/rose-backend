import { Schema, model } from 'mongoose';
import { IProfessional } from '../interfaces/IProfessional';

const ProfessionalSchema = new Schema(
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
      unique: true,
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
    education: [String],
    specialties: [String],
    experience: [String],
    price: Number,
    virtualRoom: String,
    longDescription: String,
    shortDescription: String,
    healthInsurance: [String],
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
  },
);

const Professional = model<IProfessional>(
  'Professional',
  ProfessionalSchema,
);

export default Professional;
