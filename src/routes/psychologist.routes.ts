import { Router } from 'express';
import PsychologistController from '../controllers/psychologistController';
import authenticate from '../middlewares/auth';

const router = Router();
const psychologistController = new PsychologistController();

router.post('/signup', psychologistController.create);
router.post('/login', psychologistController.login);

router.get('/', psychologistController.find);
router.get('/:id', psychologistController.findById);

export default router;
