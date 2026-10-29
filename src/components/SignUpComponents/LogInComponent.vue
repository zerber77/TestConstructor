<template>
  <ErrorMessageComponent
    v-model = "error"
    :errorMessage = "errorMessage"
  />
  <HelpMessageComponent
    v-model = "help"
    :helpMessage = "helpMessage"
  />
  <div class="signup-form">
    <h3>LOGIN</h3>
    <form @submit.prevent="handleSubmit">
      <!-- Логин -->
      <div class="form-group">
        <label for="login">Login:</label>
        <input
          type="text"
          id="login"
          v-model="formData.login"
          required
        />
      </div>
      <!-- Пароль -->
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="formData.password"
          required
        />
      </div>
      <!-- Кнопка отправки формы -->
      <button stretch flat type="submit">LogIn</button>
    </form>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue';

import {postLogInData} from "components/modules/auth/postLogInData";
import useMessageVars from "components/modules/messages/getMessageVars";
import ErrorMessageComponent from "components/Modals/ErrorMessageComponent.vue";
import HelpMessageComponent from "components/Modals/HelpMessageComponent.vue";
import { useAuthStore } from 'stores/auth'
import { useRouter } from "vue-router";

const router = useRouter();

const formData = ref({
  login: '',
  password: ''
})

const {help, error, helpMessage, errorMessage, setHelpMessage, setErrorMessage, clearMessages} = useMessageVars()

// form handler
const handleSubmit = async () => {
  try {
    // send data form
    const response = await postLogInData( {
      login: formData.value.login,
      password: formData.value.password
    })
    if(response.data.value.error || !response.data.value.token){
      if(response.data.value.error) setErrorMessage(response.data.value.error)
      else  setErrorMessage('Server error, try again later')
      return
    }
    const authStore = useAuthStore()
    // redirect to home (AboutPage see router)
    console.log('Авторизация успешна:', response.data.value.token)
    authStore.setToken(response.data.value.token)
    setHelpMessage('Authorization success!')
    setTimeout(() => router.push({path:'/'}),1000)
    // Можно добавить редирект на страницу входа или другую страницу
  } catch (error) {
      setErrorMessage(`Server error, try again later.`)
      console.error('Authorization error:', error);
  }
}
</script>

<style scoped>
.signup-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  /*border: 1px solid #ccc;*/
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background: linear-gradient(90deg, rgb(3, 3, 0) 50%, rgb(20, 62, 139));
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #35a674;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
