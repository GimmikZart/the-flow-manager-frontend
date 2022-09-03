<template>
  <div class="main-container">
    <v-app-bar dense flat app>
      <v-text-field
        v-model="searchTeachers"
        label="Cerca Insegnante"
        background-color="white"
        outlined
        dense
        hide-details
        class="col-4"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn depressed color="blue" to="/aggiungi-insegnante">
        AGGIUNGI INSEGNANTE
      </v-btn>
    </v-app-bar>

    <v-data-table
      :headers="headers"
      :items="teachers"
      :search="searchTeachers"
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
      <template v-slot:[`item.salaries`]="{ item }">
          <v-icon v-if="item.salaries == 0" color="green">mdi-check-circle</v-icon>
          <v-icon v-else color="red">mdi-alert-circle</v-icon>
      </template>
      <template v-slot:[`item.action`]="{ item }">
          <v-btn :to="`/insegnante/${item.teachers_id}`">INFO</v-btn>
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
    teachers: [],
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
        text: 'Codice Fiscale', align: 'start', sortable: false, value: 'fiscalCode'
      },
      {
        text: 'Data di nascita', align: 'start', sortable: true, value: 'dateOfBirth'
      },
      {
        text: 'Registrato il', align: 'start', sortable: true, value: 'registered'
      },
      {
        text: 'Email', align: 'start', sortable: false, value: 'email'
      },
      {
        text: 'Telefono', align: 'start', sortable: false, value: 'telephone'
      },
      {
        text: 'Corsi Attivi', align: 'start', sortable: true, value: 'activeCourseNumber'
      },
      {
        text: 'Pagamento', align: 'start', sortable: true, value: 'salaries'
      },
      {
        text: 'Azioni', align: 'start', sortable: false, value: 'action'
      }
    ],
    searchTeachers: ''
  }),
  methods: {
    async getTeachers () {
      this.teachers = (await Axios.get('https://the-flow-manager-api.herokuapp.com/api/teachers')).data
      console.log(this.teachers)
    },
    formatGender (gender) {
      return GenderEnumeration.codeToLabel(gender)
    },
    getInitials (name, lastname) {
      return name.charAt(0).toUpperCase() + lastname.charAt(0).toUpperCase()
    }
  },
  created () {
    this.getTeachers()
  }
}
</script>
<style lang="scss">

</style>
