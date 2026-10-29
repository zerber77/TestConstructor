import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useAuthStore } from 'stores/auth'
import { useMessageStore } from 'stores/messages'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

 // createWebHistory(import.meta.env.BASE_URL)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    //history: createHistory(process.env.VUE_ROUTER_BASE)
    history: createWebHistory(import.meta.env.BASE_URL)
  })

    const authStore = useAuthStore()
    const errorMessage= useMessageStore()

    Router.beforeEach((to, from, next) => {
    // if route needs authorization and token expired
    if (to.meta.requiresAuth && !authStore.isAuthenticated()) {
      authStore.logout() // clear token
      errorMessage.setErrorMessage('Token expired')
      if (to.path === '/SignUpPage/') {
        next(); 
      } else {
        next('/SignUpPage/')
      }
    } else {
      next()
    }
  })

  return Router
})
