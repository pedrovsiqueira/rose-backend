import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../configs/env';
import Professional from '../models/Professional';

export default class ProfessionalController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      email, password, crp, professionalType, genderIdentity, community, ethnicity,
    } = request.body;

    if (!email || !password) {
      return response.status(400).json({ message: 'Email ou senha não informados' });
    }

    if (password.length < 6) {
      return response.status(400).json({
        message: 'Senha deve ter pelo menos 6 caracteres',
      });
    }

    if (!crp) {
      return response.status(400).json({ message: 'crp não informado' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    try {
      const professional = await new Professional({
        email,
        password: hash,
        crp,
        professionalType,
        genderIdentity,
        community,
        ethnicity,
      }).save();

      const payload = {
        id: professional._id,
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 8640000000 });

      return response.status(201).json({ professional, token });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: 'Falha ao criar o usuário' });
    }
  }

  public async find(request: Request, response: Response): Promise<Response> {
    /**
     *s important to use queries with portuguese feeling filters
     * and use underline between words
     */
    const { query } = request;
    const filters = [];

    /**
     * Get an array with all queries provided
     */
    const feelingsFilter = Object.keys(query);

    for (const feeling of feelingsFilter) {
      const regex = new RegExp(feeling.replace('_', ' '), 'i'); // Substitute underline for space
      filters.push(regex);
    }

    /**
     * Building query
     */
    const dbQuery = filters.length
      ? { specialties: { $all: filters } }
      : {};

    try {
      const professional = await Professional.find(dbQuery).select('-password');

      if (professional.length === 0) {
        return response.status(200).json({
          message: 'Nenhum profissional encontrado',
        });
      }

      return response.status(200).json(professional);
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        message: 'Falha na requisição. Tente novamente',
      });
    }
  }

  public async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      console.log(id);
      const professional = await Professional.findById(id).select('-password');

      if (!professional) {
        return response.status(404).json({
          message: 'Profissional não encontrado',
        });
      }

      return response.status(200).json(professional);
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        message: 'Falha na requisição. Tente novamente',
      });
    }
  }

  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const professional = await Professional.findOne({ email });

      if (!professional) {
        return response.status(404).json({
          message: 'Email ou senha inválidos',
        });
      }

      const isMatch = await bcrypt.compare(password, professional.password);

      if (!isMatch) {
        return response.status(400).json({
          message: 'Email ou senha inválidos',
        });
      }

      const payload = {
        id: professional._id,
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 8640000000 });

      return response.status(200).json({ professional, token });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: 'Falha no login' });
    }
  }
}
