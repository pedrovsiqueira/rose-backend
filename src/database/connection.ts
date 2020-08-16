import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const db = mongoose.connection;

mongoose.connect(`${process.env.MONGODB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

db.once('open', () => {
  console.log(`Connected to ${db.name} database successfully`);
});

db.on('error', console.error.bind(console, 'connection error:'));
