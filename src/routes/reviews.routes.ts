import { Router } from 'express';
import ReviewController from '../controllers/reviewController';

const router = Router();
const reviewController = new ReviewController();

router.post('/', reviewController.create);

export default router;
