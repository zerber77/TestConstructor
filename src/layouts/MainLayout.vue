<template>
  <ErrorMessageComponent
    v-model = "error"
    :errorMessage = "errorMessage"
  />
  <HelpMessageComponent
    v-model = "help"
    :helpMessage = "helpMessage"
  />
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="authorised"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>MySite</q-toolbar-title>

<!--        <q-separator dark vertical />-->

        <template v-if="authorised">
          <q-item-section avatar>
            <q-icon name="person" />
            <q-item-label v-if="authorised.login">
                {{authorised.login}}
            </q-item-label>
          </q-item-section>
          <q-btn to="/SignUpPage/" @click.prevent="logOut" stretch flat label="LogOut" />
        </template>

        <template v-else>
          <q-btn to="/SignUpPage/" stretch flat label="LogIn" />
        </template>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="authorised"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list class="">
        <q-item-label
          style="height: 50px;"
          header
          class="text-h5 text-center"
        >
          Tools
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.id"
          :title="link.title"
          :icon="link.icon"
          :link="link.link"
          :role="link.role"
          :current_role="authorised.role"
        />
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
      <!-- <pre>{{authorised}}</pre> -->
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {onMounted, onUpdated, provide, reactive, ref} from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useRouter } from 'vue-router';
import {isTokenValid} from "components/modules/auth/isTokenValid";
import { useAuthStore } from 'stores/auth'
import useMessageVars from "components/modules/messages/getMessageVars";
import ErrorMessageComponent from "components/Modals/ErrorMessageComponent.vue";
import HelpMessageComponent from "components/Modals/HelpMessageComponent.vue";

const linksList = [
  {
    id:0,
    title: 'Categories',
    caption: '',
    icon: 'person',
    link: '/CategoriesPage/',
    role: ['user']
  },
  {
    id:1,
    title: 'Admin Panel',
    caption: '',
    icon: 'today',
    link: '/PanelPage/',
    role: ['admin']
  },
  
  {
    id:2,
    title: 'About',
    caption: '',
    icon: 'star',
    link: '/',
    role: ['user','admin']
  },

]

    const leftDrawerOpen = ref(false)
    const toggleLeftDrawer = () => leftDrawerOpen.value = !leftDrawerOpen.value

    const {help, error,helpMessage,errorMessage, setHelpMessage, setErrorMessage} = useMessageVars()
    const authStore = useAuthStore()
    const router = useRouter()
    let authorised =  ref({
      id: null,
      login: null,
      name:null,
      role:null
    })


    onMounted(async ()=>{
      //check token
      if (authStore.isAuthenticated()){
        try {
          const {response} = await isTokenValid()
          if(response.value.error){
            setErrorMessage(response.value.error)
          }
        }catch (err){
          setErrorMessage(err)
          authStore.logout()
        }
      }
      ///token expired
      else{
        setErrorMessage('Token expired. Authorize again')
        authStore.logout() // clear token
        setTimeout(() =>{router.push({name:'SignUpPage'})},2000) 
      }
      authorised.value = authStore.getTokenData()
    })

    onUpdated(()=>authorised.value = authStore.getTokenData())

    //LogOut button
    const logOut =() => {
      authStore.logout()
      authorised.value = authStore.getTokenData()
      router.push({name:'SignUpPage'})
    }

</script>
