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
    component: () => import(/* webpackChunkName: "about" */ '../views/students/Students.vue')
  },
  {
    path: '/studente/:id',
    name: 'Studente',
    component: () => import(/* webpackChunkName: "about" */ '../views/students/Student.vue'),
    props: true
  },
  {
    path: '/aggiungi-studente',
    name: 'AddStudent',
    component: () => import(/* webpackChunkName: "about" */ '../views/students/AddStudent.vue')
  },
  {
    path: '/insegnanti',
    name: 'Teachers',
    component: () => import(/* webpackChunkName: "about" */ '../views/teachers/Teachers.vue')
  },
  {
    path: '/insegnante/:id',
    name: 'Teacher',
    component: () => import(/* webpackChunkName: "about" */ '../views/teachers/Teacher.vue'),
    props: true
  },
  {
    path: '/aggiungi-insegnante',
    name: 'AddTeacher',
    component: () => import(/* webpackChunkName: "about" */ '../views/teachers/AddTeacher.vue')
  },
  {
    path: '/corsi',
    name: 'Corsi',
    component: () => import(/* webpackChunkName: "about" */ '../views/courses/Courses.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
