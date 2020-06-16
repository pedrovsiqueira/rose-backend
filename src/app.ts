require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import db from './database/connection';

const app = express();

db();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export default app;
