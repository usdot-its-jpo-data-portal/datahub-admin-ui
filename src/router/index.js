import Vue from 'vue'
import VueRouter from 'vue-router'

if (!process || process.env.NODE_ENV !== 'test') {
  Vue.use(VueRouter)
}

  const routes = [
  {
    path: '/',
    components: { default: ()=> import('../views/dataassets.vue')},
    children: [
      {
        path: '',
        redirect: { name: 'dataassets-home' }
      },
      {
        path: '/dataassets',
        name: 'dataassets-home',
        components: { dataassets: () => import('../views/dataassets/dataassets_home.vue')}
      },
      {
        path: 'dataassets/update',
        name: 'dataassets-update',
        components: { dataassets: () => import('../views/dataassets/dataassets_update.vue')}
      }
    ]
  },
  {
    path: '/projects',
    components: { default: () => import('../views/projects.vue')},
    children: [
      {
        path: '',
        name: 'projects-home',
        components: { projects: () => import('../views/projects/projects_home.vue')}
      },
      {
        path: 'add',
        name: 'projects-add',
        components: { projects: () => import('../views/projects/projects_add.vue')}
      },
      {
        path: 'remove',
        name: 'projects-remove',
        components: { projects: () => import('../views/projects/projects_remove.vue')}
      },
      {
        path: 'update',
        name: 'projects-update',
        components: { projects: () => import('../views/projects/projects_update.vue')}
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
