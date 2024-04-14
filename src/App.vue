<template>
  <div class="max-w-5xl mx-auto py-8">
    <div class="flex space-x-8">
      <div class="w-2/3">
        <UserMessagesTable />
      </div>
      <div class="w-1/3">
        <UserMessageForm />
      </div>
    </div>
  </div>
</template>

<script setup>
import UserMessagesTable from '@/components/UserMessagesTable';
import UserMessageForm from '@/components/UserMessageForm';
</script>
