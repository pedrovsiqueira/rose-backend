import 'dotenv/config';

import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';

import './database/connection';
import patientRoutes from '../src/routes/patient.routes';
import professionalRoutes from './routes/professional.routes';
import appointmentsRoutes from '../src/routes/appointments.routes';
import reviewsRoutes from '../src/routes/reviews.routes';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/patient', patientRoutes);
app.use('/psychologist', professionalRoutes);
app.use('/appointments', appointmentsRoutes);
app.use('/reviews', reviewsRoutes);

export default app;
