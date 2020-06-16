import { config } from 'dotenv';
import app from './app';

config();

app.listen(process.env.PORT || 5000, () => {
  console.log(`🌹 rose started on port ${process.env.PORT}`);
});
