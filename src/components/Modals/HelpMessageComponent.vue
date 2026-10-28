<template>
  <q-dialog v-model="help" position="top">
    <q-card style="width: 350px">
      <q-linear-progress :value="1" color="green" />
      <q-card-section class="row items-center no-wrap">
        <div>
          <div class="text-weight-bold">{{props.helpMessage}}</div>
        </div>
        <q-space />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
  helpMessage: String
})
const help = ref(false)
</script>

<style scoped>

</style>
