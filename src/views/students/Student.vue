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
            :src="student.avatar != 0 ? student.avatar : 'https://cdn.vuetifyjs.com/images/parallax/material.jpg'"
          ></v-img>
        </div>
        <div class="d-flex flex-column w-100 justify-center">
          <h1>{{student.name}}</h1>
          <h1>{{student.lastname}}</h1>
          <v-text-field v-if="editInfo" v-model="editStudent.avatar" label="AVATAR URL" hide-details class="ma-0 pa-0" outlined dense></v-text-field>
        </div>
      </div>
      <div class="h-50 w-60 d-flex justify-space-around">
        <v-btn class="h-100 w-25" :disabled="editInfo == true" @click="editInfo = true">EDIT INFO</v-btn>
        <v-btn class="h-100 w-25" :disabled="editCourses == true" @click="editCourses = true">EDIT CORSI</v-btn>
        <v-btn class="h-100 w-25" :disabled="editPayments == true" @click="editPayments = true">EDIT PAGAMENTI</v-btn>
      </div>
    </v-container>
    <v-container fluid class="d-flex h-70 justify-space-around">
      <InfoCard
        :student="student"
        :editStudent="editStudent"
        :editInfo="editInfo"
        @undo-edit-info="editInfo = false"
        @update-student-info="getStudent(); editInfo = false">
      </InfoCard>

      <CoursesCard
        :studentCourses="student.courses"
        :editCourses="editCourses"
        :student-id="student.id"
        @undo-edit-courses="editCourses = false"
        @update-course-list="getStudent(); editCourses = false">
      </CoursesCard>

      <PaymentCard
        :studentPayments="student.payments"
        :editPayments="editPayments"
        @update-course-list="getStudent();"
        @undo-edit-courses="editPayments = false">
      </PaymentCard>
    </v-container>
  </div>
</template>
<script>
import InfoCard from '@/components/student/InfoCard.vue'
import CoursesCard from '@/components/student/CoursesCard.vue'
import PaymentCard from '@/components/student/PaymentsCard.vue'
import Axios from 'axios'

export default {
  name: 'Student',
  props: ['id'],
  components: {
    InfoCard,
    CoursesCard,
    PaymentCard
  },
  data: () => ({
    student: {},
    paymentTab: 0,
    editInfo: false,
    editCourses: false,
    editPayments: false
  }),
  methods: {
    async getStudent () {
      this.student = (await Axios.get(`http://localhost:8000/api/student/${this.id}`)).data
      this.editStudent = JSON.parse(JSON.stringify(this.student))
    }
  },
  created () {
    this.getStudent()
  }
}
</script>
