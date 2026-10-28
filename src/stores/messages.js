import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMessageStore = defineStore('messages', () => {
  let error = ref(false)
  let errorMessage = ref('')

  const setErrorMessage = (message) => {
    errorMessage.value = message
    error.value = true
    setTimeout(() => clearMessages(),2000)
  }

  const clearMessages = () => {
    errorMessage.value = ''
    error.value = false
  }

  return {
    error,
    errorMessage,
    setErrorMessage
  }
})
