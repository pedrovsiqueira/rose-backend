import { Router } from 'express';
import AppointmentController from '../controllers/appointmentController';

const router = Router();
const appointmentController = new AppointmentController();

router.post('/appointments', appointmentController.find);
router.post('/newappointment', appointmentController.create);

export default router;
