<template>
  <div class="flex justify-center mt-0">
    <div class="bg-gray-100 rounded-xl shadow-md w-full max-w-md p-4">
      <h2 class="text-lg font-semibold mb-2 text-gray-800">Add New Message</h2>
      <form @submit.prevent="submitForm" class="space-y-3">
        <div>
          <label class="block text-sm font-semibold mb-1" for="message">
            Message
          </label>
          <textarea
            v-model="message"
            class="shadow appearance-none rounded w-full py-1 px-2 text-sm text-gray-800 leading-tight focus:outline-none focus:ring focus:border-blue-500"
            id="message"
            rows="3"
            placeholder="Enter your message"
            :class="{ 'border-red-500': v$.message.$error }"
          ></textarea>
          <div v-if="v$.message.$error" class="text-red-500 text-xs mt-1">
            {{ v$.message.$errors[0].$message }}
          </div>
        </div>
        <div>
          <label class="block text-sm font-semibold mb-1" for="user">
            User
          </label>
          <input
            v-model="user"
            class="shadow appearance-none rounded w-full py-1 px-2 text-sm text-gray-800 leading-tight focus:outline-none focus:ring focus:border-blue-500"
            id="user"
            type="text"
            placeholder="Enter user name"
            :class="{ 'border-red-500': v$.user.$error }"
          />
          <div v-if="v$.user.$error" class="text-red-500 text-xs mt-1">
            {{ v$.user.$errors[0].$message }}
          </div>
        </div>
        <div class="flex justify-end">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-sm"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMessageStore } from '@/stores/messageStore';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';

const messageStore = useMessageStore();

const message = ref('');
const user = ref('');
const date = new Date().toISOString().slice(0, 10);

const rules = {
  message: { required, minLength: minLength(5) },
  user: { required, minLength: minLength(3) },
};

const v$ = useVuelidate(rules, { message, user });

const submitForm = async () => {
  const isValid = await v$.value.$validate();
  if (isValid) {
    await messageStore.addMessage({
      message: message.value,
      user: user.value,
      date,
    });
    v$.value.$reset();
    message.value = '';
    user.value = '';
  }
};
</script>
<style scoped>
/* Adjust styles to make everything smaller in size */
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
  padding: 1rem;
}
.text-lg {
  font-size: 0.875rem;
}
.text-sm {
  font-size: 0.75rem;
}
.mb-2 {
  margin-bottom: 0.5rem;
}
.space-y-3 > :not(:last-child) {
  margin-bottom: 0.75rem;
}
.text-gray-800 {
  color: #333333;
}
.text-gray-100 {
  color: #ffffff;
}
.text-red-500 {
  color: #e53e3e;
}
.border-red-500 {
  border-color: #e53e3e;
}
.focus\:ring-blue-500:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  border-color: #2563eb;
}
.focus\:outline-none:focus {
  outline: none;
}
.bg-blue-500 {
  background-color: #3b82f6;
}
.hover\:bg-blue-700:hover {
  background-color: #2563eb;
}
.hover\:text-white:hover {
  color: #ffffff;
}
.focus\:shadow-outline:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}
</style>
