<template>
  <div class="main-container">
    <v-app-bar dense flat app>
      <v-text-field
        v-model="searchStudents"
        label="Cerca Studente"
        background-color="white"
        outlined
        dense
        hide-details
        class="col-4"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn depressed color="blue" to="/aggiungi-studente">
        AGGIUNGI STUDENTE
      </v-btn>
    </v-app-bar>

    <v-data-table
      :headers="headers"
      :items="students"
      :search="searchStudents"
      hide-default-footer
      fixed-header
      disable-pagination
      class="elevation-1 h-100"
    >
      <template v-slot:[`item.avatar`]="{ item }">
        <div class="pa-1">
          <div class="circle square bc-color-black h-100 overflow-hidden d-flex align-center justify-center">
            <v-img
              v-if="item.avatar"
              :aspect-ratio="1/1"
              :src="item.avatar"
            ></v-img>
            <span v-else class="white--text">
              {{getInitials(item.name, item.lastname)}}
            </span>
          </div>
        </div>
      </template>
      <template v-slot:[`item.gender`]="{ item }">
          <span>{{formatGender(item.gender)}}</span>
      </template>
      <template v-slot:[`item.payment`]="{ item }">
          <v-icon v-if="item.payment == 0" color="green">mdi-check-circle</v-icon>
          <v-icon v-else color="red">mdi-alert-circle</v-icon>
      </template>
      <template v-slot:[`item.action`]="{ item }">
          <v-btn :to="`/studente/${item.students_id}`">INFO</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import Axios from 'axios'
import { GenderEnumeration } from '@/utility/enumerations.js'
export default {
  name: 'Students',
  data: () => ({
    students: [],
    headers: [
      {
        text: 'Avatar', align: 'start', sortable: false, value: 'avatar'
      },
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
        text: 'Data di nascita', align: 'start', sortable: false, value: 'dateOfBirth'
      },
      {
        text: 'Registrato il', align: 'start', sortable: false, value: 'registered'
      },
      {
        text: 'Corsi Totali', align: 'start', sortable: true, value: 'courseNumber'
      },
      {
        text: 'Corsi Attivi', align: 'start', sortable: true, value: 'activeCourseNumber'
      },
      {
        text: 'Telefono', align: 'start', sortable: false, value: 'telephone'
      },
      {
        text: 'Pagamento', align: 'start', sortable: true, value: 'payment'
      },
      {
        text: 'Azioni', align: 'start', sortable: false, value: 'action'
      }
    ],

    searchStudents: ''
  }),
  methods: {
    async getStudents () {
      this.students = (await Axios.get('http://localhost:8000/api/students')).data
      console.log(this.students)
    },
    formatGender (gender) {
      return GenderEnumeration.codeToLabel(gender)
    },
    getInitials (name, lastname) {
      return name.charAt(0).toUpperCase() + lastname.charAt(0).toUpperCase()
    }
  },
  created () {
    this.getStudents()
  }
}
</script>
<style lang="scss">

</style>
