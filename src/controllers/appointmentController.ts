import { Request, Response } from 'express';
import Appointment from '../models/Appointment';

interface Fail {
  message: string;
}

interface Appointment {
  _id: String;
  startTime: Date;
  endTime: Date;
  psychologist: Object;
}

type FindResponse = Appointment | Fail;

export default class AppointmentController {
  public async create(
    req: Request,
    res: Response
  ): Promise<Response<FindResponse>> {
    const { startTime, endTime, psychologist } = req.body;

    const appointment = {
      startTime,
      endTime,
      psychologist,
    };

    if (!startTime || !endTime) {
      return res.status(400).json({
        message: 'Por favor, selecione um horário para o agendamento',
      });
    }

    if (!psychologist) {
      return res.status(500).json({ message: 'Erro mental do psicólogo' });
    }

    try {
      const response = await Appointment.create(appointment);
      return res.status(201).json(response);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: 'Falha na criação do agendamento' });
    }
  }

  public async find(
    req: Request,
    res: Response
  ): Promise<Response<FindResponse>> {
    try {
      const response = await Appointment.find({});
      if (response.length === 0) {
        return res
          .status(200)
          .json({ message: 'Nenhum agendamento encontrado' });
      }
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: 'Falha na requisição. Tente novamente' });
    }
  }

  public async findById(
    req: Request,
    res: Response
  ): Promise<Response<FindResponse>> {
    const { id } = req.params;
    try {
      const response = await Appointment.findById(id);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: 'Falha na requisição. Tente novamente' });
    }
  }
}
