import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

export default async () => {
  try {
    const response = await mongoose.connect('mongodb://0.0.0.0:27017/rose', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(`connected: ${response.connections[0].name}`);
  } catch (error) {
    console.error('failed to connect to db', error);
  }
};
