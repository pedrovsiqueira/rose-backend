import 'dotenv/config';

const PORT = process.env.PORT || 8000;
const MONGODB = process.env.MONGODB || 'mongodb://localhost:27017/rose';
const JWT_SECRET = process.env.JWT_SECRET || 'keyboard_cat';

export { PORT, MONGODB, JWT_SECRET };
