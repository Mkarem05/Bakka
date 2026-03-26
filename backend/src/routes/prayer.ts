import { Router, Request, Response } from 'express';
import axios from 'axios';
import NodeCache from 'node-cache';

const router = Router();
const cache = new NodeCache({ stdTTL: 6 * 60 * 60 }); // 6 hours

const MECCA_LAT = 21.3891;
const MECCA_LNG = 39.8579;

router.get('/', async (req: Request, res: Response) => {
  const lat = parseFloat(req.query['lat'] as string) || MECCA_LAT;
  const lng = parseFloat(req.query['lng'] as string) || MECCA_LNG;

  const cacheKey = `prayer_${lat.toFixed(4)}_${lng.toFixed(4)}_${new Date().toDateString()}`;
  const cached = cache.get(cacheKey);

  if (cached) {
    res.json(cached);
    return;
  }

  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const url = `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lng}&method=4`;
    const response = await axios.get(url, { timeout: 8000 });

    const data = response.data;
    cache.set(cacheKey, data);
    res.json(data);
  } catch (err) {
    console.error('Prayer API error:', err);
    res.status(502).json({ error: 'Не удалось получить расписание намазов' });
  }
});

export default router;
