import { Schema, model } from 'mongoose';
import { IAppointment } from '../interfaces/IAppointment';

const AppointmentSchema = new Schema(
  {
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    psychologist: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Psychologist',
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Appointment = model<IAppointment>('Appointment', AppointmentSchema);

export default Appointment;
