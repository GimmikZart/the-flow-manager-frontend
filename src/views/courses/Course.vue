<template>
  <div class="main-container">
    <v-app-bar dense flat app>
      <v-spacer></v-spacer>
    </v-app-bar>
    <div class="h-100">
      <v-container class="h-20">
        <h1 class="text-center">{{course.name.toUpperCase()}}</h1>
      </v-container>
      <v-container class="h-80 d-flex justify-space-between">
        <v-data-table
          :headers="activeStudentHeaders"
          :items="course.active_students"
          hide-default-footer
          fixed-header
          disable-pagination
          class="elevation-1 w-50 mr-3 h-100"
        >
          <template v-slot:[`item.gender`]="{ item }">
              <span>{{formatGender(item.gender)}}</span>
          </template>
          <template v-slot:[`item.action`]="{ item }">
              <v-btn :to="`/studente/${item.students_id}`">INFO</v-btn>
          </template>
        </v-data-table>
        <v-data-table
          :headers="pastStudentHeaders"
          :items="course.past_students"
          hide-default-footer
          fixed-header
          disable-pagination
          class="elevation-1 w-50 ml-3 h-100"
        >
          <template v-slot:[`item.gender`]="{ item }">
              <span>{{formatGender(item.gender)}}</span>
          </template>
          <template v-slot:[`item.action`]="{ item }">
              <v-btn :to="`/studente/${item.students_id}`">INFO</v-btn>
          </template>
        </v-data-table>
      </v-container>
    </div>
  </div>
</template>
<script>
import Axios from 'axios'
import { GenderEnumeration } from '@/utility/enumerations.js'
export default {
  name: 'Course',
  props: ['course_id'],
  data: () => ({
    course: {},
    activeStudentHeaders: [
      {
        text: 'Nome', align: 'start', sortable: true, value: 'name'
      },
      {
        text: 'Cognome', align: 'start', sortable: true, value: 'lastname'
      },
      {
        text: 'Genere', align: 'start', sortable: true, value: 'gender'
      },
      {
        text: 'Codice Fiscale', align: 'start', sortable: false, value: 'fiscalCode'
      },
      {
        text: 'Telefono', align: 'start', sortable: false, value: 'telephone'
      },
      {
        text: 'Data di inizio', align: 'start', sortable: true, value: 'start_date'
      },
      {
        text: 'Action', align: 'start', sortable: false, value: 'action'
      }
    ],
    activeStudents: [],

    pastStudentHeaders: [
      {
        text: 'Nome', align: 'start', sortable: true, value: 'name'
      },
      {
        text: 'Cognome', align: 'start', sortable: true, value: 'lastname'
      },
      {
        text: 'Genere', align: 'start', sortable: true, value: 'gender'
      },
      {
        text: 'Telefono', align: 'start', sortable: true, value: 'telephone'
      },
      {
        text: 'Data di inizio', align: 'start', sortable: true, value: 'start_date'
      },
      {
        text: 'Data di fine', align: 'start', sortable: true, value: 'end_date'
      },
      {
        text: 'Action', align: 'start', sortable: false, value: 'action'
      }
    ],
    pastStudents: []
  }),
  watch: {
    course () {
      console.log('CORSO')
    }
  },
  methods: {
    async getCourse () {
      this.course = (await Axios.get(`https://the-flow-manager-api.herokuapp.com/api/course/${this.course_id}`)).data
      console.log(this.course)
    },
    formatGender (gender) {
      return GenderEnumeration.codeToLabel(gender)
    }
  },
  async created () {
    this.getCourse()
  }
}
</script>
