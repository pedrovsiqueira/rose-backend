import { PORT } from './configs/env';
import app from './app';

app.listen(PORT, () => {
  console.log(`🌹 rose is growing on port ${PORT}`);
});
