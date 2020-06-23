import { Request, Response } from 'express';
import Appointment from '../models/Appointment';
import { AppointmentDTO } from '../dtos/AppointmentDTO';
import Patient from '../models/Patient';
import Psychologist from '../models/Psychologist';

interface ErrorResponse {
  message: string;
}

type AppointmentResponse = AppointmentDTO | ErrorResponse;

export default class AppointmentController {
  public async create(
    req: Request,
    res: Response
  ): Promise<Response<AppointmentResponse>> {
    const {
      startTime,
      endTime,
      psychologist,
      patient,
    } = req.body as AppointmentDTO;

    const appointment = {
      startTime,
      endTime,
      psychologist,
      patient,
    };

    if (!startTime || !endTime) {
      return res.status(400).json({
        message: 'Por favor, selecione um horário para o agendamento',
      });
    }

    if (!psychologist) {
      return res.status(500).json({ message: 'Psicólogo não especificado' });
    }

    if (!patient) {
      return res.status(500).json({ message: 'Paciente não especificado' });
    }

    try {
      const response = (await Appointment.create(
        appointment
      )) as AppointmentDTO;

      const { patient, psychologist } = response;

      await Patient.findByIdAndUpdate(patient, {
        $push: { appointments: response },
      });

      await Psychologist.findByIdAndUpdate(psychologist, {
        $push: { appointments: response },
      });

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
  ): Promise<Response<AppointmentResponse>> {
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
      return res.status(500).json({
        message: 'Falha na requisição. Tente novamente',
      });
    }
  }

  public async findById(
    req: Request,
    res: Response
  ): Promise<Response<AppointmentResponse>> {
    const { id } = req.params;
    try {
      const response = await Appointment.findById(id);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Falha na requisição. Tente novamente',
      });
    }
  }

  public async delete(
    req: Request,
    res: Response
  ): Promise<Response<AppointmentResponse>> {
    const { id } = req.params;

    try {
      const { patient, psychologist } = (await Appointment.findByIdAndDelete(
        id
      )) as AppointmentDTO;

      await Patient.findByIdAndUpdate(patient, {
        $pull: { appointments: id },
      });
      await Psychologist.findByIdAndUpdate(psychologist, {
        $pull: { appointments: id },
      });

      return res
        .status(202)
        .json({ message: 'agendamento excluido com sucesso' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Falha na requisição. Tente novamente',
      });
    }
  }
}
