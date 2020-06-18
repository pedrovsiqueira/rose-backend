require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import db from './database/connection';
import patientRoutes from '../src/routes/patient.routes';
import psychologistRoutes from '../src/routes/psychologist.routes';
import appointmentsRoutes from '../src/routes/appointments.routes';

const app = express();

db();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/patient', patientRoutes);
app.use('/psychologist', psychologistRoutes);
app.use('/appointments', appointmentsRoutes);

export default app;
