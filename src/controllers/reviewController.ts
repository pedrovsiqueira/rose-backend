import { Request, Response } from 'express';
import Review from '../models/Review';
import { ErrorResponseDTO } from '../dtos/ErrorResponseDTO';
import { ReviewDTO } from '../dtos/ReviewDTO';

type ReviewResponse = ReviewDTO | ErrorResponseDTO;

export default class ReviewController {
  public async create(
    req: Request,
    res: Response
  ): Promise<Response<ReviewResponse>> {
    const { psychologistId, patientId, rate, description } = req.body;

    if (!psychologistId || !patientId || !rate || !description) {
      return res.status(400).json({ message: 'Dados insuficientes' });
    }

    const review = {
      psychologist: psychologistId,
      patient: patientId,
      rate,
      description,
    };

    try {
      await Review.create(review);
      return res.status(201).json(review);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: 'Falha na gravação da avaliação' });
    }
  }

  public async show(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Dados insuficientes' });
    }

    try {
      const reviews = await Review
        .find({ psychologist: id })
        .populate('patient', { name: 1 });

      return res.status(200).json(reviews);
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ message: 'Falha ao obter avaliações' });
    }
  }
}
