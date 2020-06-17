import { Request, Response } from 'express';
import Patient from '../models/Patient';
import bcrypt from 'bcryptjs';

interface Fail {
  message: string;
}

interface Patient {
  _id: string;
  email: string;
  password: string;
}

type CreateResponse = Patient | Fail;

export default class PatientController {
  public async create(
    req: Request,
    res: Response
  ): Promise<Response<CreateResponse>> {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email ou senha não informados' });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Senha deve ter pelo menos 6 caracteres',
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = {
      email,
      password: hash,
    };
    
    try {
      const response = await Patient.create(newUser);
      return res.status(201).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Falha ao criar o usuário' });
    }
  }
}
