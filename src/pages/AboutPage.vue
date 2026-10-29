<template>
  <div class="text-center q-pa-md flex flex-md-center">
    {{ `Welcome to site ${authorised?.id}`  }}

  </div>
</template>

<script setup>
import {computed} from "vue";

import { useAuthStore } from 'stores/auth'
import useMessageVars from "components/modules/messages/getMessageVars";

const authStore = useAuthStore()
const authorised = computed(()=> authStore.getTokenData())

</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
</style>
