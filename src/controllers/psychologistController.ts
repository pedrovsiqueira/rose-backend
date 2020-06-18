import { Request, Response } from 'express';
import Psychologist from '../models/Psychologist';
import bcrypt from 'bcryptjs';

interface Fail {
  message: string;
}

interface Psychologist {
  _id: string;
  email: string;
  password: string;
  crp: string;
}

type CreateResponse = Psychologist | Fail;

export default class PsychologistController {
  public async create(
    req: Request,
    res: Response
  ): Promise<Response<CreateResponse>> {
    const { email, password, crp } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email ou senha não informados' });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Senha deve ter pelo menos 6 caracteres',
      });
    }

    if (!crp) {
      return res.status(400).json({ message: 'crp não informado' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = {
      email,
      password: hash,
      crp,
    };

    try {
      const response = await Psychologist.create(newUser);
      return res.status(201).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Falha ao criar o usuário' });
    }
  }
}
