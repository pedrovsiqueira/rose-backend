import { Request, Response } from 'express';
import Patient from '../models/Patient';

export default class PatientController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email ou senha não informados' });
    }

    if (!password) {
      return res.status(400).json({ message: 'Email ou senha não informados' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Senha deve ter pelo menos 6 caracteres' });
    }

    try {
      const newUser = await Patient.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Falha ao criar o usuário' });
    }
  }
}
