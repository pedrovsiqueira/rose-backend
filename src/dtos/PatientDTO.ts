export interface PatientDTO {
  _id: string;
  name?: string;
  email: string;
  password: string;
  avater?: string;
  date?: string;
  favPsychologists?: string[];
  appointments?: string[];
  review?: string[];
}
