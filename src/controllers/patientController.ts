import { Request, Response } from 'express';
import { PatientDTO } from '../dtos/PatientDTO';
import { ErrorResponseDTO } from '../dtos/ErrorResponseDTO';
import Patient from '../models/Patient';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

type PatientResponse = PatientDTO | ErrorResponseDTO;

export default class PatientController {
  public async create(
    req: Request,
    res: Response
  ): Promise<Response<PatientResponse>> {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Dados incompletos' });
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
      name,
    };

    try {
      const response = await Patient.create(newUser);
      return res.status(201).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Falha ao criar o usuário' });
    }
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const patient = (await Patient.findOne({
        email,
      })) as PatientDTO;

      const isMatch = await bcrypt.compare(password, patient.password);
      if (!isMatch) {
        return res.status(400).json({
          message: 'Email ou senha inválidos',
        });
      }

      const payload = {
        id: patient._id,
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
            return res.status(500).json({
              message: 'Erro na geração do token de login',
            });
          }
          return res.status(200).json({ patient, token });
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Falha no login' });
    }
  }
}
