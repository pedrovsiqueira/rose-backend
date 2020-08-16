import { Router } from 'express';
import ProfessionalController from '../controllers/professionalController';

const router = Router();

const psychologistController = new ProfessionalController();

router.post('/signup', psychologistController.create);
router.post('/login', psychologistController.login);

router.get('/', psychologistController.find);
router.get('/:id', psychologistController.findById);

export default router;
