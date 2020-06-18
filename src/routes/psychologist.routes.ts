import { Router } from 'express';
import PsychologistController from '../controllers/psychologistController';

const router = Router();
const psychologistController = new PsychologistController();

router.post('/signup', psychologistController.create);

export default router;
