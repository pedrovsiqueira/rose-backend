require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import db from './database/connection';
import patientRoutes from '../src/routes/patient.routes';
import psychologistRoutes from '../src/routes/psychologist.routes';
import appointmentsRoutes from '../src/routes/appointments.routes';
import reviewsRoutes from '../src/routes/reviews.routes';
import cors from 'cors';

const app = express();

db();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/patient', patientRoutes);
app.use('/psychologist', psychologistRoutes);
app.use('/appointments', appointmentsRoutes);
app.use('/reviews', reviewsRoutes);

export default app;
