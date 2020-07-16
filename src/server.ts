// import { config } from 'dotenv';
import app from './app';

app.listen(process.env.PORT || 5000, () => {
  console.log(`🌹 rose is growing on port ${process.env.PORT}`);
});
