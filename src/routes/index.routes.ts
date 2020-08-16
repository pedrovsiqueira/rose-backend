import { Router } from 'express';

import patientRoutes from './patient.routes';
import professionalRoutes from './professional.routes';
import appointmentsRoutes from './appointments.routes';
import reviewsRoutes from './reviews.routes';

const router = Router();

router.use('/patient', patientRoutes);
router.use('/psychologist', professionalRoutes);
router.use('/appointments', appointmentsRoutes);
router.use('/reviews', reviewsRoutes);

export default router;
