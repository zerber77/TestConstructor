
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AboutPage.vue') },
      { name:'PanelPage',path: 'PanelPage/', component: () => import('pages/Admin/PanelPage.vue'),  meta: { requiresAuth: true } }, //props: true
      { name:'CategoriesPage',path: 'CategoriesPage/', component: () => import('pages/User/CategoriesPage.vue'),  meta: { requiresAuth: true } },
//      { name:'TagsPage',path: 'TagsPage/', component: () => import('pages/TagsPage.vue') },
//      { name:'WorldMapPage',path: 'WorldMapPage/', component: () => import('pages/WorldMapPage.vue') },
      { name:'SignUpPage',path: 'SignUpPage/', component: () => import('pages/SignUpPage.vue') },
//      { name:'ReviewPage',path: 'ReviewPage/', component: () => import('pages/ReviewPage.vue') },
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
