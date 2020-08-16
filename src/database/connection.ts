import mongoose from 'mongoose';
import { MONGODB } from '../configs/env';

mongoose.Promise = global.Promise;

const db = mongoose.connection;

mongoose.connect(MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

db.once('open', () => {
  console.log(`Connected to ${db.name} database successfully`);
});

db.on('error', console.error.bind(console, 'connection error:'));
