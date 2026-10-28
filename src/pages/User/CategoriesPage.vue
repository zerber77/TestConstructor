<template>
        <div  class="text-center q-pa-md flex flex-md-center">
            {{ `Welcome to site USER ${authorised?.name}`  }}

        </div>
    
</template>

<script setup>
import {onMounted, ref, onUpdated} from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from 'stores/auth'
import {isTokenValid} from "components/modules/auth/isTokenValid";
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

const expanded = ref(false)    

onMounted(()=>{
    if (authStore.isAuthenticated){
        authorised.value = authStore.getTokenData()
    }
});

</script>

<style lang="sass" scoped>
.my-card
    width: 100%
    max-width: 300px
</style>
