import {ref} from 'vue'
export default function useMessageVars(){
  let help = ref(false)
  let error = ref(false)
  let helpMessage = ref('')
  let errorMessage = ref('')

  const setHelpMessage = (message) =>{
    helpMessage.value = message
    help.value = true
  }

  const setErrorMessage = (message) =>{
    errorMessage.value = message
    error.value = true
  }
  return {help, error,helpMessage,errorMessage, setHelpMessage, setErrorMessage}
}
