import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import chatRouter from './routes/chat';
import prayerRouter from './routes/prayer';
import { generalRateLimit } from './middleware/rateLimit';

const app = express();
const PORT = process.env['PORT'] ?? 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(generalRateLimit);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/chat', chatRouter);
app.use('/api/prayer', prayerRouter);

app.listen(PORT, () => {
  console.log(`Bakka backend running on port ${PORT}`);
});
