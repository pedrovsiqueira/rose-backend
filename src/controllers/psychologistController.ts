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

type PsychologistResponse = Psychologist | Fail;

export default class PsychologistController {
  public async create(
    req: Request,
    res: Response
  ): Promise<Response<PsychologistResponse>> {
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

  public async find(
    req: Request,
    res: Response
  ): Promise<Response<PsychologistResponse>> {
    try {
      const response = await Psychologist.find({}).select('-password');
      if (response.length === 0) {
        return res
          .status(200)
          .json({ message: 'Nenhum profissional encontrado' });
      }
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Falha na requisição. Tente novamente',
      });
    }
  }

  public async findById(
    req: Request,
    res: Response
  ): Promise<Response<PsychologistResponse>> {
    const { id } = req.params;
    try {
      const response = await Psychologist.findById(id).select('-password');
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Falha na requisição. Tente novamente',
      });
    }
  }
}
