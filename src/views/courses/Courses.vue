<template>
  <div class="main-container">
    <v-app-bar dense flat app>
      <v-text-field
        v-model="searchCourse"
        label="Cerca Corso"
        background-color="white"
        outlined
        dense
        hide-details
        class="col-4"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn depressed color="blue">
        AGGIUNGI CORSO
      </v-btn>
    </v-app-bar>

    <v-data-table
      :headers="headers"
      :items="courses"
      :search="searchCourse"
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
  name: 'Courses',
  data: () => ({
    courses: [],
    headers: [
      {
        text: 'Corso', align: 'start', sortable: false, value: 'name'
      }
    ],
    searchCourse: ''
  }),
  methods: {
    async getCourses () {
      this.courses = (await Axios.get('https://the-flow-manager-api.herokuapp.com/api/courses')).data
      console.log(this.courses)
    }
  },
  created () {
    this.getCourses()
  }
}
</script>
