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
      <AddCourseModal></AddCourseModal>
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
      <template v-slot:[`item.action`]="{ item }">
          <v-btn :to="`/corso/${item.courses_id}`">INFO</v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import Axios from 'axios'
import AddCourseModal from '@/components/courses/AddCourseModal.vue'
export default {
  name: 'Courses',
  components: {
    AddCourseModal
  },
  data: () => ({
    courses: [],
    headers: [
      {
        text: 'Corso', align: 'start', sortable: false, value: 'name'
      },
      {
        text: 'Prezzo', align: 'center', sortable: false, value: 'price'
      },
      {
        text: 'Studenti attivi', align: 'center', sortable: false, value: 'activeStudents'
      },
      {
        text: 'Studenti totali', align: 'center', sortable: false, value: 'totalStudents'
      },
      {
        text: 'Action', align: 'center', sortable: false, value: 'action'
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
