import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

export default async () => {
  try {
    const response = await mongoose.connect(`${process.env.MONGODB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(`db connection: ${response.connections[0].name}`);
  } catch (error) {
    console.error('failed to connect to db', error);
  }
};
