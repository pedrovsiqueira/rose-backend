export interface AppointmentDTO {
  startTime: string;
  endTime: string;
  psychologist: string;
  patient: string;
  isPaid?: boolean;
}
