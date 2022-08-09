<template>
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
          <template v-for="(course, index) in activeCourses">
            <v-list-item :key="index">
              <v-list-item-icon>
                {{course.name}}
              </v-list-item-icon>
              <v-list-item-content class="justify-end">
                {{course.start_date}}
              </v-list-item-content>
              <v-list-item-content class="justify-end">
                on going
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
          <template v-for="(course, index) in pastCourses">
            <v-list-item :key="index">
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
</template>
<script>
export default {
  name: 'CoursesCard',
  props: ['studentCourses'],
  data: () => ({
    coursesTab: 0,
    activeCourses: [],
    pastCourses: []
  }),
  watch: {
    studentCourses () {
      this.splitCourses()
    }
  },
  methods: {
    splitCourses () {
      this.studentCourses.forEach(element => {
        if (element.active === 0) {
          this.activeCourses.push(element)
        } else {
          this.pastCourses.push(element)
        }
      })
    }
  }
}
</script>
