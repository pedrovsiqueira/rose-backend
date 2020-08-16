import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Patient from '../models/Patient';

export default class PatientController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password, name } = request.body;

    if (!email || !password || !name) {
      return response.status(400).json({ message: 'Dados incompletos' });
    }

    if (password.length < 6) {
      return response.status(400).json({
        message: 'Senha deve ter pelo menos 6 caracteres',
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    try {
      const patient = new Patient({
        email,
        password: hash,
        name,
      }).save();

      return response.status(201).json(patient);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: 'Falha ao criar o usuário' });
    }
  }

  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const patient = await Patient.findOne({ email });

      if (!patient) {
        return response.status(400).json({
          message: 'Email ou senha inválidos',
        });
      }

      const isMatch = await bcrypt.compare(password, patient.password);

      if (!isMatch) {
        return response.status(400).json({
          message: 'Email ou senha inválidos',
        });
      }

      const payload = {
        id: patient._id,
      };

      const token = jwt.sign(
        payload, `${process.env.JWT_SECRET}`, { expiresIn: 8640000000 },
      );

      return response.status(200).json({
        patient,
        token,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: 'Falha no login' });
    }
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      const patient = await Patient.findById(id).select('-password');

      if (!patient) {
        return response.status(400).json({
          message: 'Paciente não encontrado',
        });
      }

      return response.status(200).json(patient);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: 'Falha no servidor' });
    }
  }
}
