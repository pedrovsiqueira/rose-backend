import { Request, Response } from 'express';
import { PsychologistDTO } from '../dtos/PsychologistDTO';
import { ErrorResponseDTO } from '../dtos/ErrorResponseDTO';
import Psychologist from '../models/Psychologist';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface SuccessResponse {
  user: PsychologistDTO;
  token?: string;
}

type PsychologistResponse = SuccessResponse | ErrorResponseDTO;

export default class PsychologistController {
  public async create(
    req: Request,
    res: Response
  ): Promise<Response<PsychologistResponse> | undefined> {
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
      const user = await Psychologist.create(newUser);

      const payload = {
        id: user._id,
      };

      jwt.sign(
        payload,
        `${process.env.JWT_SECRET}`,
        {
          expiresIn: 8640000000,
        },
        (err, token) => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .json({ message: 'Erro na geração do token de signup' });
          }
          return res.status(201).json({ user, token });
        }
      );
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
      const response = (await Psychologist.findById(id).select(
        '-password'
      )) as PsychologistDTO;

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Falha na requisição. Tente novamente',
      });
    }
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const psychologist = (await Psychologist.findOne({
        email,
      })) as PsychologistDTO;

      const isMatch = await bcrypt.compare(password, psychologist.password);
      if (!isMatch) {
        return res.status(400).json({
          message: 'Email ou senha inválidos',
        });
      }

      const payload = {
        id: psychologist._id,
      };

      jwt.sign(
        payload,
        `${process.env.JWT_SECRET}`,
        {
          expiresIn: 8640000000,
        },
        (err, token) => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .json({ message: 'Erro na geração do token de login' });
          }
          return res.status(200).json({ psychologist, token });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Falha no login' });
    }
  }
}
