import { api } from './api';
import { ChatMessage } from '../store/chatStore';

export const chatService = {
  async sendMessage(messages: ChatMessage[]): Promise<string> {
    const response = await api.post<{ reply: string }>('/api/chat', { messages });
    return response.data.reply;
  },
};
