<template>
  <div class="main-container">
    <v-app-bar dense flat app></v-app-bar>

    <v-data-table
      :headers="headers"
      :items="students"
      hide-default-footer
      fixed-header
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
    students: [],
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
        text: 'Pagamento', align: 'start', sortable: false, value: 'paid'
      },
      {
        text: 'Scadenza Pagamento', align: 'start', sortable: false, value: 'paymentExpiry'
      },
      {
        text: 'Azioni', align: 'start', sortable: false
      }
    ]
  }),
  methods: {
    async getStudents () {
      this.students = (await Axios.get('http://localhost:8000/api/students')).data.data
      console.log(this.students)
    }
  },
  created () {
    this.getStudents()
  }
}
</script>
<style lang="scss">

</style>
