<template>
  <ErrorMessageComponent
    v-model = "errorMessage.error"
    :errorMessage = "errorMessage.errorMessage"
  />
  <div class="col-12 q-pa-md row justify-center">
    <div class="q-gutter-y-md " style="max-width: 600px; min-width: 350px">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="login" label="Login" />
          <q-tab name="register" label="Register" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <LogInComponent/>
          </q-tab-panel>

          <q-tab-panel name="register">
            <SignUpComponent/>
          </q-tab-panel>

        </q-tab-panels>
      </q-card>

      <!-- <q-card>
        <q-separator />
        <q-tabs
          v-model="tab"
          dense
          :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
          align="justify"
          narrow-indicator
        >
          <q-tab name="mails" label="Login" />
          <q-tab name="alarms" label="Register" />
        </q-tabs>
      </q-card> -->
    </div>
    <!-- <pre>{{ errorMessage }}</pre> -->
  </div>

</template>

<script setup>
import { ref, watch } from 'vue';
import SignUpComponent from "components/SignUpComponents/SignUpComponent.vue";
import LogInComponent from "components/SignUpComponents/LogInComponent.vue";
import ErrorMessageComponent from "components/Modals/ErrorMessageComponent.vue";
import { useMessageStore } from 'stores/messages'

let tab =  ref('login')

const errorMessage = useMessageStore()

</script>

<style scoped>

</style>
