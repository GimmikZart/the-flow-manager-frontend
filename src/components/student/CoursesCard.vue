<template>
  <v-card class="w-30">
    <v-card-title class="pa-2" :class="{ 'justify-space-between': editCourses, 'justify-center': !editCourses }">
      CORSI
      <div v-if="editCourses" class="ml-3">
        <v-btn @click="undoEditCourse()" class="mr-2">ANNULLA</v-btn>
      </div>
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
        <v-btn v-if="editCourses" :disabled="addCourseField" color="blue" class="w-100 white--text" @click="createCourseField()">AGGIUNGI CORSO</v-btn>
        <div v-if="addCourseField" class="mb-2 pa-5">
          <v-divider class="mb-3"></v-divider>
          <div class="d-flex">
            <v-select class="w-100" label="Seleziona Corso" v-model="addCourse.id" outlined dense hide-details :items="coursesList" item-text="name" item-value="courses_id"></v-select>
            <v-menu
              v-model="startingDatePicker"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="addCourse.startingDate"
                  label="Data di inizio"
                  readonly
                  outlined
                  dense
                  hide-details
                  v-bind="attrs"
                  v-on="on"
                  class="w-100"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="addCourse.startingDate"
                @input="startingDatePicker = false"
              ></v-date-picker>
            </v-menu>
          </div>

          <div class="d-flex mt-2">
            <v-btn color="red" class="w-50 white--text" @click="undoAddCourse()">ANNULLA</v-btn>
            <v-btn color="green" class="w-50 white--text" @click="saveNewCourse()">SALVA </v-btn>
          </div>

          <v-divider class="mt-3"></v-divider>
        </div>
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
                <v-btn color="red" class="white--text" v-if="editCourses" @click="endCourse(course.course_id)">TERMINA</v-btn>
                <span v-else class="text-end">on going</span>
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
                <v-btn color="red" class="white--text" v-if="editCourses" @click="reactivateCourse(course)">RIATTIVA</v-btn>
                <span v-else class="text-end">{{course.end_date}}</span>
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
import Axios from 'axios'
import { UpdatePayments } from '@/utility/updatePayments.js'
export default {
  name: 'CoursesCard',
  props: ['studentCourses', 'editCourses', 'studentId'],
  data: () => ({
    coursesTab: 0,
    activeCourses: [],
    pastCourses: [],
    addCourseField: false,
    addCourse: {
      id: undefined,
      startingDate: undefined
    },
    coursesList: []
  }),
  watch: {
    studentCourses () {
      this.splitCourses()
    }
  },
  methods: {
    splitCourses () {
      this.activeCourses = []
      this.pastCourses = []
      console.log('corsi', this.studentCourses)
      this.studentCourses.forEach(element => {
        if (element.active === 0) {
          this.activeCourses.push(element)
        } else {
          this.pastCourses.push(element)
        }
      })
    },
    async createCourseField () {
      this.addCourseField = true
      this.coursesList = (await Axios.get('http://localhost:8000/api/list-courses')).data
      console.log(this.coursesList)
    },
    undoEditCourse () {
      this.undoAddCourse()
      console.log('CULO')
      this.$emit('undo-edit-courses')
    },
    undoAddCourse () {
      this.addCourse = {
        id: undefined,
        startingDate: undefined
      }
      this.addCourseField = false
    },
    async saveNewCourse () {
      const newSubscription = {
        student_id: this.studentId,
        course_id: this.addCourse.id,
        start_date: this.addCourse.startingDate
      }
      console.log({ newSubscription })
      const response = (await Axios.post('http://localhost:8000/api/subscribe-student', newSubscription)).data
      UpdatePayments.updateAllPaymentsTable()
      this.addCourseField = false
      this.$emit('update-course-list')
      console.log({ response })
    },
    async endCourse (courseId) {
      console.log({ courseId })
      const response = (await Axios.post(`http://localhost:8000/api/unsubscribe-student/${courseId}`)).data
      this.$emit('update-course-list')
      console.log(response)
    },
    async reactivateCourse (course) {
      console.log({ course })
      const reactivateSubscription = {
        subscription_id: course.id,
        student_id: this.studentId,
        course_id: course.course_id
      }
      const response = (await Axios.post('http://localhost:8000/api/resubscribe-student', reactivateSubscription)).data
      this.$emit('update-course-list')
      console.log(response)
    }
  }
}
</script>
