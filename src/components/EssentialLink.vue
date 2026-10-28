<template>
  <q-item
    v-if="role.includes(current_role)"
    :to="link"
    exact
    clickable
    v-ripple
    style="background: radial-gradient(circle, #ffffff 0%, #cdd2d2 100%)"
  >
<!--    @click=""
@click="getNews(link)"
:active="1"
class="my-menu-link"
-->
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label
        class="text-center text-body1"
      >
        {{ title}}
      </q-item-label>
<!--      <q-item-label caption>{{ agency }}</q-item-label>-->
    </q-item-section>
  </q-item>
  <!-- <pre>{{role}}</pre> -->
  <!-- <pre>{{current_role}}</pre> -->
</template>

<script setup>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router';
import routes from "src/router/routes";

const  props = defineProps( {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      default: '#'
    },
    icon: {
      type: String,
    },
    role: {
      type: Array,
      default: ['user']
    },
    current_role: {
      type: String,
    }
  })
  

//  const router = useRouter()

// getNews(url){
//       router.push({path:url })//query: {ag:url}
//     }
  
</script>

<style lang="sass">
.my-menu-link
  color: #2b6d11
  background: #F2C037
</style>
