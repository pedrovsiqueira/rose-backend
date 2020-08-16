interface IPatient {
  _id: string;
  email: string;
  password: string;
}

class PatientsRepository {
  public async createPatient() {
    throw new Error('Method not implemented');
  }
}

export default PatientsRepository;
