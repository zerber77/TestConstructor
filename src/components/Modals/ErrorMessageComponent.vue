<template>
  <q-dialog v-model="error" position="top">
    <q-card style="width: 350px">
      <q-linear-progress :value="1" color="red" />
      <q-card-section class="row items-center no-wrap">
        <div>
          <div class="text-weight-bold">{{props.errorMessage}}</div>
        </div>
        <q-space />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
  errorMessage: String
})
const error = ref(false)
</script>

<style scoped>

</style>
