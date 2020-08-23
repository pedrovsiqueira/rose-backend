import { Request, Response } from 'express';

import Appointment from '../models/Appointment';
import Patient from '../models/Patient';
import Professional from '../models/Professional';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      startTime, endTime, psychologist, patient,
    } = request.body;

    if (!startTime || !endTime) {
      return response.status(400).json({
        message: 'Por favor, selecione um horário para o agendamento',
      });
    }

    if (!psychologist) {
      return response.status(500).json({ message: 'Psicólogo não especificado' });
    }

    if (!patient) {
      return response.status(500).json({ message: 'Paciente não especificado' });
    }

    try {
      const appointment = await new Appointment({
        startTime, endTime, psychologist, patient,
      }).save();

      await Patient.findByIdAndUpdate(appointment.patient, {
        $push: { appointments: appointment },
      });

      await Professional.findByIdAndUpdate(appointment.psychologist, {
        $push: { appointments: appointment },
      });

      return response.status(201).json(appointment);
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ message: 'Falha na criação do agendamento' });
    }
  }

  public async find(request: Request, response: Response): Promise<Response> {
    try {
      const appointments = await Appointment.find({});

      if (appointments.length === 0) {
        return response.status(200).json({
          message: 'Nenhum agendamento encontrado',
        });
      }

      return response.status(200).json(appointments);
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
      const appointment = await Appointment.findById(id);

      if (!appointment) {
        return response.status(404).json({
          message: 'Agendamento não encontrado',
        });
      }

      return response.status(200).json(appointment);
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        message: 'Falha na requisição. Tente novamente',
      });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      const appointment = await Appointment.findByIdAndDelete(id);

      if (!appointment) {
        return response.status(404).json({
          message: 'Agendamento não encontrado',
        });
      }

      await Patient.findByIdAndUpdate(appointment.patient, {
        $pull: { appointments: id },
      });
      await Professional.findByIdAndUpdate(appointment.psychologist, {
        $pull: { appointments: id },
      });

      return response.status(202).json({
        message: 'Agendamento excluído com sucesso',
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        message: 'Falha na requisição. Tente novamente',
      });
    }
  }
}
