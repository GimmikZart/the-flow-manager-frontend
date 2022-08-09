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
        <v-btn class="h-100 w-25">EDIT CORSI</v-btn>
        <v-btn class="h-100 w-25">EDIT PAGAMENTI</v-btn>
      </div>
    </v-container>
    <v-container fluid class="d-flex h-70 justify-space-around">
      <InfoCard :student="student" :editInfo="editInfo" @undo-edit-info="undoEditInfo()" @update-student-info="updateStudentInfo()"></InfoCard>
      <v-card class="w-30">
        <v-card-title class="justify-center pa-2">
          CORSI
        </v-card-title>
        <v-divider></v-divider>
        <v-tabs v-model="coursesTab" grow>
          <v-tabs-slider color="blue"></v-tabs-slider>
          <v-tab>
            ATTIVI
          </v-tab>
          <v-tab>
            PASSATI
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="coursesTab">
          <v-tab-item>
            <div class="d-flex justify-space-between align-center mt-3 pr-5 pl-5">
              <h6>Corso</h6>
              <h6>Start</h6>
              <h6>End</h6>
            </div>
            <v-divider></v-divider>
            <v-list class="pa-0">
              <template v-for="(course, index) in student.courses">
                <v-list-item :key="index" v-if="course.active == 0">
                  <v-list-item-icon>
                    {{course.name}}
                  </v-list-item-icon>
                  <v-list-item-content class="justify-end">
                    {{course.start_date}}
                  </v-list-item-content>
                  <v-list-item-content class="justify-end">
                    {{course.end_date ? course.end_date : 'on going'}}
                  </v-list-item-content>
                </v-list-item>
                <v-divider :key="index"></v-divider>
              </template>
            </v-list>
          </v-tab-item>

          <v-tab-item>
            <div class="d-flex justify-space-between align-center mt-3 pr-5 pl-5">
              <h6>Corso</h6>
              <h6>Start</h6>
              <h6>End</h6>
            </div>
            <v-divider></v-divider>
            <v-list class="pa-0">
              <template v-for="(course, index) in student.courses">
                <v-list-item :key="index" v-if="course.active == 1">
                  <v-list-item-icon>
                    {{course.name}}
                  </v-list-item-icon>
                  <v-list-item-content class="justify-end">
                    {{course.start_date}}
                  </v-list-item-content>
                  <v-list-item-content class="justify-end">
                    {{course.end_date}}
                  </v-list-item-content>
                </v-list-item>
                <v-divider :key="index"></v-divider>
              </template>
            </v-list>
          </v-tab-item>
        </v-tabs-items>
      </v-card>

      <v-card class="w-30">
        <v-card-title class="justify-center pa-2">
          PAGAMENTI
        </v-card-title>
        <v-divider></v-divider>
        <v-tabs v-model="paymentTab" grow>
          <v-tabs-slider color="blue"></v-tabs-slider>
          <v-tab>
            DA RICEVERE
          </v-tab>
          <v-tab>
            PASSATI
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="paymentTab">
          <v-tab-item>
            <div class="d-flex justify-space-between align-center mt-3 pr-5 pl-5">
              <h6>Corso</h6>
              <h6>Prezzo</h6>
              <h6>Periodo</h6>
              <h6>Action</h6>
            </div>
            <v-divider></v-divider>
            <v-list class="pa-0">
              <template v-for="(payment, index) in student.payments">
                <v-list-item :key="index" v-if="payment.date_of_payment == null">
                  <v-list-item-icon>
                    {{payment.name}}
                  </v-list-item-icon>
                  <v-list-item-content class="justify-center">
                    {{payment.value}}
                  </v-list-item-content>
                  <v-list-item-content class="justify-center">
                    {{payment.month}}/{{payment.year}}
                  </v-list-item-content>
                  <v-list-item-content class="justify-end">
                    <v-btn>PAGA</v-btn>
                  </v-list-item-content>
                </v-list-item>
                <v-divider :key="index"></v-divider>
              </template>
            </v-list>
          </v-tab-item>

          <v-tab-item>
            <div class="d-flex justify-space-between align-center mt-3 pr-5 pl-5">
              <h6>Corso</h6>
              <h6>Prezzo</h6>
              <h6>Periodo</h6>
              <h6>Pagato il</h6>
            </div>
            <v-divider></v-divider>
            <v-list class="pa-0">
              <template v-for="(payment, index) in student.payments">
                <v-list-item :key="index" v-if="payment.date_of_payment != null">
                  <v-list-item-icon>
                    {{payment.name}}
                  </v-list-item-icon>
                  <v-list-item-content class="justify-center">
                    {{payment.value}}
                  </v-list-item-content>
                  <v-list-item-content class="justify-center">
                    {{payment.month}}/{{payment.year}}
                  </v-list-item-content>
                  <v-list-item-content class="justify-end">
                    {{payment.date_of_payment}}
                  </v-list-item-content>
                </v-list-item>
                <v-divider :key="index"></v-divider>
              </template>
            </v-list>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import InfoCard from '@/components/student/InfoCard.vue'
import Axios from 'axios'
export default {
  name: 'Student',
  props: ['id'],
  components: {
    InfoCard
  },
  data: () => ({
    student: {},
    coursesTab: 0,
    paymentTab: 0,
    activeCourses: [],
    pastCourses: [],

    infoList: [
      {
        icon: 'mdi-account-circle',
        title: 'NOME',
        value: 'name',
        type: 'string'
      },
      {
        icon: 'mdi-account-circle',
        title: 'COGNOME',
        value: 'lastname',
        type: 'string'
      },
      {
        icon: 'mdi-at',
        title: 'EMAIL',
        value: 'email',
        type: 'string'
      },
      {
        icon: 'mdi-phone',
        title: 'TELEFONO',
        value: 'telephone',
        type: 'string'
      },
      {
        icon: 'mdi-gender-male-female',
        title: 'GENERE',
        value: 'gender',
        type: 'switch'
      },
      {
        icon: 'mdi-cake-variant-outline',
        title: 'DATA DI NASCITA',
        value: 'dateOfBirth',
        type: 'date'
      },
      {
        icon: 'mdi-calendar-check',
        title: 'REGISTRATO',
        value: 'registered',
        type: 'date'
      }
    ],
    editInfo: false,
    editStudent: {}

  }),
  methods: {
    async getStudent () {
      this.student = (await Axios.get(`http://localhost:8000/api/student/${this.id}`)).data
      this.editStudent = JSON.parse(JSON.stringify(this.student))
      console.log(this.student)
      this.splitCourses()
    },
    splitCourses () {
      this.student.courses.forEach(element => {
        if (element.active === 0) {
          this.activeCourses.push(element)
        } else {
          this.pastCourses.push(element)
        }
      })
    },
    undoEditInfo (editInfoValue) {
      this.editInfo = editInfoValue
    },
    updateStudentInfo (editInfoValue) {
      this.editInfo = editInfoValue
      this.getStudent()
    }
    /* async saveEditInfo () {
      console.log('edit save', this.editStudent)
      console.log(this.student.id)
      const response = await Axios.post('http://localhost:8000/api/student-edit', this.editStudent)
      console.log({ response })
    },
    undoEdit () {
      this.editStudent = JSON.parse(JSON.stringify(this.student))
      this.editInfo = false
      console.log('undo edit', this.editStudent)
    } */
  },
  created () {
    console.log('id', this.id)
    this.getStudent()
  }
}
</script>
