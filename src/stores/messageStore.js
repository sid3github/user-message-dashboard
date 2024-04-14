import { defineStore } from 'pinia';
import { fetchMessages, addMessage } from '@/api/api';

export const useMessageStore = defineStore('messageStore', {
  state: () => ({
    messages: [],
  }),
  actions: {
    async fetchMessages() {
      try {
        this.messages = await fetchMessages();
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    },
    async addMessage(newMessage) {
      try {
        const message = await addMessage(newMessage);
        this.messages.push(message);
      } catch (error) {
        console.error('Error adding message', error);
      }
    },
  },
});
