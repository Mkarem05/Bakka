import { Router, Request, Response } from 'express';
import { chatRateLimit } from '../middleware/rateLimit';
import { claudeService, ChatMessage } from '../services/claudeService';

const router = Router();

router.post('/', chatRateLimit, async (req: Request, res: Response) => {
  const { messages } = req.body as { messages?: unknown };

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: 'messages must be a non-empty array' });
    return;
  }

  for (const msg of messages) {
    if (
      typeof msg !== 'object' ||
      msg === null ||
      !('role' in msg) ||
      !('content' in msg) ||
      (msg.role !== 'user' && msg.role !== 'assistant') ||
      typeof msg.content !== 'string'
    ) {
      res.status(400).json({ error: 'Invalid message format' });
      return;
    }
  }

  try {
    const reply = await claudeService.chat(messages as ChatMessage[]);
    res.json({ reply });
  } catch (err) {
    console.error('Claude error:', err);
    res.status(500).json({ error: 'Ошибка при обращении к AI. Попробуйте позже.' });
  }
});

export default router;
