import { Router } from 'express';
import PsychologistController from '../controllers/psychologistController';

const router = Router();
const psychologistController = new PsychologistController();

router.get('/psychologists', psychologistController.find);
router.get('/:id', psychologistController.findById);

router.post('/signup', psychologistController.create);

export default router;
