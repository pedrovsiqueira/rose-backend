import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import Review from '../models/Review';
import Psychologist from '../models/Professional';

export default class ReviewController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      psychologistId, patientId, rate, description,
    } = request.body;

    if (!psychologistId || !patientId || !rate || !description) {
      return response.status(400).json({
        message: 'Dados insuficientes',
      });
    }

    try {
      const review = await new Review({
        psychologist: psychologistId,
        patient: patientId,
        rate,
        description,
      }).save();

      await Psychologist.findByIdAndUpdate(psychologistId, {
        $push: { reviews: review },
      });

      return response.status(201).json(review);
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: 'Falha na gravação da avaliação',
      });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (!id) {
      return response.status(400).json({
        message: 'Dados insuficientes',
      });
    }

    if (!isValidObjectId(id)) {
      return response.status(400).json({
        message: 'ID inválido',
      });
    }

    try {
      const reviews = await Review
        .find({ psychologist: id })
        .populate('patient', { name: 1 });

      if (!reviews.length) {
        return response.status(400).json({
          message: 'Nenhuma avaliação encontrada',
        });
      }

      return response.status(200).json(reviews);
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        message: 'Falha ao obter avaliações',
      });
    }
  }
}
