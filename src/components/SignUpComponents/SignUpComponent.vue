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
    <h2>Register</h2>
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
      <!-- Имя пользователя -->
      <div class="form-group">
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          v-model="formData.user.name"
          required
        />
      </div>
      <!-- Email -->
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="formData.user.email"
          required
        />
      </div>
      <!-- Пароль -->
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="formData.user.password"
          required
        />
      </div>
      <!-- Кнопка отправки формы -->
      <button type="submit">Register</button>
      <!-- Сообщение об ошибке -->
    </form>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {postSignUpData} from "components/modules/auth/postSignUpData";
import { useRouter } from "vue-router";
import useMessageVars from "components/modules/messages/getMessageVars";
import ErrorMessageComponent from "components/Modals/ErrorMessageComponent.vue";
import HelpMessageComponent from "components/Modals/HelpMessageComponent.vue";
import { useAuthStore } from 'stores/auth'

const router = useRouter();

const formData = ref({
  login: '',
  user: {
    name: '',
    email: '',
    password: ''
  }
})

const {help, error,helpMessage,errorMessage, setHelpMessage, setErrorMessage} = useMessageVars()

// Обработчик отправки формы
const handleSubmit = async () => {
  try {
    // send data
    const response = await postSignUpData( {
      login: formData.value.login,
      user: formData.value.user
    });
    if(response.data.value.error || !response.data.value.token){
      if(response.data.value.error) setErrorMessage(response.data.value.error)
      else  setErrorMessage('Server error, try again later')
      return
    }
    // Если всё успешно, перенаправляем пользователя или показываем сообщение успеха
    const authStore = useAuthStore()
    authStore.setToken(response.data.value.token)
    setHelpMessage('Success!')
    setTimeout(() =>{router.push({path:'/'})},1000) 
  } catch (error) {
    setErrorMessage('Register error. Try again later' + error)
    console.error('Register error:', error);
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
  background-color: #42b983;
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
