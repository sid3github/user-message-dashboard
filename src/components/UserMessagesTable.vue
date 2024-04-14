<template>
  <div class="bg-gray-100 shadow-md rounded-xl p-4 h-full">
    <h2 class="text-lg font-semibold mb-2 text-gray-800">User Messages</h2>
    <div class="overflow-x-auto h-full">
      <transition-group name="message-fade" tag="div">
        <div
          v-for="message in messages"
          :key="message.id"
          class="flex items-center border-gray-300 py-4"
        >
          <div
            class="w-10 h-10 flex-shrink-0 bg-gray-300 rounded-full flex items-center justify-center mr-2"
          >
            <span class="text-gray-800 text-sm">{{
              message.user.substring(0, 1)
            }}</span>
          </div>
          <div class="flex-grow">
            <div class="text-sm font-semibold mb-1 text-gray-800">
              {{ message.user }}
            </div>
            <div class="text-gray-600 text-sm">{{ message.message }}</div>
          </div>
          <div class="text-gray-600 text-xs">{{ message.date }}</div>
        </div>
      </transition-group>
      <div v-if="messages.length === 0" class="text-gray-400 mt-2">
        No messages found
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMessageStore } from '@/stores/messageStore';
import { onMounted, computed } from 'vue';

const messageStore = useMessageStore();

onMounted(() => {
  messageStore.fetchMessages();
});

const messages = computed(() => messageStore.messages);
</script>

<style scoped>
/* Adjust styles to match the light grey and white monolithic theme */
.bg-gray-100 {
  background-color: #f9fafb;
}
.shadow-md {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.rounded-lg {
  border-radius: 0.25rem;
}
.p-4 {
  padding: 0.75rem;
}
.text-lg {
  font-size: 1rem;
}
.text-sm {
  font-size: 0.75rem;
}
.mb-2 {
  margin-bottom: 0.5rem;
}
.py-3 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.text-gray-800 {
  color: #333333;
}
.text-gray-600 {
  color: #666666;
}
.text-gray-100 {
  color: #ffffff;
}
.text-gray-400 {
  color: #999999;
}
.border-b {
  border-bottom-width: 1px;
}
.message-fade-enter-active,
.message-fade-leave-active {
  transition: opacity 0.3s ease;
}
.message-fade-enter, .message-fade-leave-to /* .message-fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
