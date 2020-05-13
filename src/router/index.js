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
  },
  {
    path: '/datatypes',
    components: { default: () => import('../views/datatypes.vue')},
    children: [
      {
        path: '',
        name: 'datatypes-home',
        components: { datatypes: () => import('../views/datatypes/datatypes_home.vue')}
      },
      {
        path: 'add',
        name: 'datatypes-add',
        components: { datatypes: () => import('../views/datatypes/datatypes_add.vue')}
      },
      {
        path: 'remove',
        name: 'datatypes-remove',
        components: { datatypes: () => import('../views/datatypes/datatypes_remove.vue')}
      },
      {
        path: 'update',
        name: 'datatypes-update',
        components: { datatypes: () => import('../views/datatypes/datatypes_update.vue')}
      }
    ]
  },
  {
    path: '/engagementpopups',
    components: { default: () => import('../views/engagementPopups.vue')},
    children: [
      {
        path: '',
        name: 'engagementPopups-home',
        components: { engagementPopups: () => import('../views/engagementPopups/engagementPopups_home.vue')}
      },
      {
        path: 'add',
        name: 'engagementPopups-add',
        components: { engagementPopups: () => import('../views/engagementPopups/engagementPopups_add.vue')}
      },
      {
        path: 'remove',
        name: 'engagementPopups-remove',
        components: { engagementPopups: () => import('../views/engagementPopups/engagementPopups_remove.vue')}
      },
      {
        path: 'update',
        name: 'engagementPopups-update',
        components: { engagementPopups: () => import('../views/engagementPopups/engagementPopups_update.vue')}
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
