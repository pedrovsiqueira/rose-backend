import { Router } from 'express';
import AppointmentController from '../controllers/appointmentController';

const router = Router();
const appointmentController = new AppointmentController();

router.get('/appointments', appointmentController.find);
router.get('/:id', appointmentController.findById);

router.post('/newappointment', appointmentController.create);

router.delete('/:id', appointmentController.delete);

export default router;
