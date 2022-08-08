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
    </v-data-table>
  </div>
</template>
<script>
import Axios from 'axios'
export default {
  name: 'Students',
  data: () => ({
    teachers: [],
    headers: [
      {
        text: 'Avatar', align: 'start', sortable: false, value: 'avatar'
      },
      {
        text: 'Nome', align: 'start', sortable: false, value: 'name'
      },
      {
        text: 'Cognome', align: 'start', sortable: false, value: 'lastname'
      },
      {
        text: 'Genere', align: 'start', sortable: false, value: 'gender'
      },
      {
        text: 'Data di nascita', align: 'start', sortable: false, value: 'dateOfBirth'
      },
      {
        text: 'Registrato il', align: 'start', sortable: false, value: 'registered'
      },
      {
        text: 'Email', align: 'start', sortable: false, value: 'email'
      },
      {
        text: 'Telefono', align: 'start', sortable: false, value: 'telephone'
      },
      {
        text: 'Azioni', align: 'start', sortable: false
      }
    ],
    searchTeachers: ''
  }),
  methods: {
    async getTeachers () {
      this.teachers = (await Axios.get('http://localhost:8000/api/teachers')).data.data
      console.log(this.teachers)
    }
  },
  created () {
    this.getTeachers()
  }
}
</script>
<style lang="scss">

</style>
