import { Router } from 'express';
import PatientController from '../controllers/patientController';

const router = Router();

const patientController = new PatientController();

router.get('/:id', patientController.find);
router.post('/signup', patientController.create);
router.post('/login', patientController.login);

export default router;
