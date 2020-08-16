import { PORT } from './configs/env';
import app from './app';

app.listen(PORT || 5000, () => {
  console.log(`🌹 rose is growing on port ${PORT}`);
});
