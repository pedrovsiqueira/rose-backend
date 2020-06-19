import { Router } from 'express';
import AppointmentController from '../controllers/appointmentController';
import authenticate from '../middlewares/auth';

const router = Router();
const appointmentController = new AppointmentController();

router.use(authenticate);

router.get('/', appointmentController.find);
router.get('/:id', appointmentController.findById);

router.post('/', appointmentController.create);

router.delete('/:id', appointmentController.delete);

export default router;
