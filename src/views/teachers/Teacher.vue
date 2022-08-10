<template>
  <div class="main-container">
    <v-app-bar dense flat app>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-container fluid class="d-flex h-30 align-center justify-space-between">
      <div class="d-flex w-40">
        <div class="circle overflow-hidden mr-5">
          <v-img
            :aspect-ratio="1/1"
            width="200px"
            :src="teacher.avatar != 0 ? teacher.avatar : 'https://cdn.vuetifyjs.com/images/parallax/material.jpg'"
          ></v-img>
        </div>
        <div class="d-flex flex-column w-100 justify-center">
          <h1>{{teacher.name}}</h1>
          <h1>{{teacher.lastname}}</h1>
          <v-text-field v-if="editInfo" v-model="editTeacher.avatar" label="AVATAR URL" hide-details class="ma-0 pa-0" outlined dense></v-text-field>
        </div>
      </div>
      <div class="h-50 w-60 d-flex justify-space-around">
        <v-btn class="h-100 w-25" :disabled="editInfo == true" @click="editInfo = true; console.log('CIAOOO')">EDIT INFO</v-btn>
        <v-btn class="h-100 w-25" :disabled="editCourses == true" @click="editCourses = true">EDIT CORSI</v-btn>
        <v-btn class="h-100 w-25" :disabled="editSalaries == true" @click="editSalaries = true">EDIT PAGAMENTI</v-btn>
      </div>
    </v-container>
    <v-container fluid class="d-flex h-70 justify-space-around">
      <InfoCard
        :teacher="teacher"
        :editTeacher="editTeacher"
        :editInfo="editInfo"
        @undo-edit-info="editInfo = false"
        @update-teacher-info="getTeacher(); editInfo = false">
      </InfoCard>

      <CoursesCard
        :teacherCourses="teacher.courses"
        :editCourses="editCourses"
        :teacher-id="teacher.teachers_id"
        @undo-edit-courses="editCourses = false"
        @update-course-list="getTeacher(); editCourses = false">
      </CoursesCard>

      <PaymentCard
        :teacherSalaries="teacher.salaries"
        :editSalaries="editSalaries"
        @update-course-list="getTeacher();"
        @undo-edit-courses="editSalaries = false">
      </PaymentCard>
    </v-container>
  </div>
</template>
<script>
import InfoCard from '@/components/teacher/InfoCard.vue'
import CoursesCard from '@/components/teacher/CoursesCard.vue'
import PaymentCard from '@/components/teacher/PaymentsCard.vue'
import Axios from 'axios'

export default {
  name: 'Teacher',
  props: ['id'],
  components: {
    InfoCard,
    CoursesCard,
    PaymentCard
  },
  data: () => ({
    teacher: {},
    paymentTab: 0,
    editInfo: false,
    editCourses: false,
    editSalaries: false
  }),
  methods: {
    async getTeacher () {
      this.teacher = (await Axios.get(`http://localhost:8000/api/teacher/${this.id}`)).data
      this.editTeacher = JSON.parse(JSON.stringify(this.teacher))
      console.log(this.teacher)
    }
  },
  created () {
    this.getTeacher()
  }
}
</script>
