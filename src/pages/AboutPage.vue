<template>
  <div class="text-center q-pa-md flex flex-md-center">
    {{ `Welcome to site ${authorised?.id}`  }}

  </div>
</template>

<script setup>
import {onMounted, ref, onUpdated} from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from 'stores/auth'
import useMessageVars from "components/modules/messages/getMessageVars";

const {setErrorMessage} = useMessageVars()
const router = useRouter()
const authStore = useAuthStore()
const authorised =  ref({
      id: null,
      login: null,
      name:null,
      role:null,
    })
    

onMounted(()=>{
  if (authStore.isAuthenticated){
      authorised.value = authStore.getTokenData()
  }
});

// onUpdated(()=>{
//   if (authStore.isAuthenticated){
//       authorised.value = authStore.getTokenData()
//   }
//   else router.push({path:'SignUpPage'})
// });

// onMounted(()=>{
//       const token = localStorage.getItem('authToken')
//       //валидность токена уже проверена в MainLayout
//       if (token){
//           authorised.isAuthenticated = true
//           authorised.login = token.login
//           authorised.name = token.name
//           authorised.role = token.role
//       }
//       else {
//         authorised.isAuthenticated = false
//         router.push({path:'SignUpPage'})
//       }
//     })



</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
</style>
