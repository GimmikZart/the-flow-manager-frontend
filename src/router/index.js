import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/studenti',
    name: 'Studenti',
    component: () => import(/* webpackChunkName: "about" */ '../views/Students.vue')
  },
  {
    path: '/studente/:id',
    name: 'Studente',
    component: () => import(/* webpackChunkName: "about" */ '../views/Student.vue'),
    props: true
  },
  {
    path: '/aggiungi-studente',
    name: 'AddStudent',
    component: () => import(/* webpackChunkName: "about" */ '../views/AddStudent.vue')
  },
  {
    path: '/insegnanti',
    name: 'Insegnanti',
    component: () => import(/* webpackChunkName: "about" */ '../views/Teachers.vue')
  },
  {
    path: '/aggiungi-insegnante',
    name: 'AddTeacher',
    component: () => import(/* webpackChunkName: "about" */ '../views/AddTeacher.vue')
  },
  {
    path: '/corsi',
    name: 'Corsi',
    component: () => import(/* webpackChunkName: "about" */ '../views/Courses.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
