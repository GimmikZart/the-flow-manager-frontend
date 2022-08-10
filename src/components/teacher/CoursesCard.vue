<template>
  <v-card class="w-35">
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
          <div class="d-flex">
            <v-select class="w-100" label="Tipo di accordo" v-model="addCourse.type" outlined dense hide-details :items="typesList"></v-select>
            <v-text-field type="num" v-model="addCourse.unit" label="Unità" outlined dense hide-details></v-text-field>
          </div>

          <div class="d-flex mt-2">
            <v-btn color="red" class="w-50 white--text" @click="undoAddCourse()">ANNULLA</v-btn>
            <v-btn color="green" class="w-50 white--text" @click="saveNewCourse()">SALVA </v-btn>
          </div>
          <v-divider class="mt-3"></v-divider>
        </div>
        <v-data-table
          :headers="courseHeaders"
          :items="activeCourses"
          hide-default-footer
          fixed-header
          disable-pagination>
          <template v-slot:[`item.type`]="{ item }">
              <span>{{agreementEnumeration(item.type)}}</span>
          </template>
          <template v-slot:[`item.unit`]="{ item }">
            <span>{{item.unit}} {{formatType(item.type)}}</span>
          </template>
          <template v-slot:[`item.end_date`]="{ item }">
            <span v-if="!editCourses"> on going</span>
            <v-btn v-else color="red" class="white--text"  @click="endCourse(item.courses_teachers_id)">TERMINA</v-btn>
          </template>
        </v-data-table>
      </v-tab-item>

      <v-tab-item>
        <v-data-table
          :headers="courseHeaders"
          :items="pastCourses"
          hide-default-footer
          fixed-header
          disable-pagination>
          <template v-slot:[`item.type`]="{ item }">
              <span>{{agreementEnumeration(item.type)}}</span>
          </template>
          <template v-slot:[`item.unit`]="{ item }">
            <span>{{item.unit}} {{formatType(item.type)}}</span>
          </template>
          <template v-slot:[`item.end_date`]="{ item }">
            <span v-if="!editCourses"> on going</span>
            <v-btn v-else color="red" class="white--text"  @click="reactivateCourse(item)">RIATTIVA</v-btn>
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
import Axios from 'axios'
import { UpdatePayments } from '@/utility/updatePayments.js'
import { TeacherAgreement } from '@/utility/enumerations.js'
export default {
  name: 'CoursesCard',
  props: ['teacherCourses', 'editCourses', 'teacherId'],
  data: () => ({
    coursesTab: 0,
    activeCourses: [],
    pastCourses: [],
    addCourseField: false,
    addCourse: {
      id: undefined,
      startingDate: undefined,
      type: undefined,
      unit: undefined
    },
    courseHeaders: [
      {
        text: 'Corso', align: 'start', sortable: false, value: 'name'
      },
      {
        text: 'Accordo', align: 'start', sortable: true, value: 'type'
      },
      {
        text: 'Di', align: 'start', sortable: true, value: 'unit'
      },
      {
        text: 'Start', align: 'start', sortable: true, value: 'start_date'
      },
      {
        text: 'End', align: 'start', sortable: true, value: 'end_date'
      }
    ],
    typesList: [
      { value: 0, text: 'Fisso Orario' },
      { value: 1, text: 'Fisso Mensile' },
      { value: 2, text: 'Percentuale' },
      { value: 3, text: 'Affitto' }
    ],
    coursesList: []
  }),
  watch: {
    teacherCourses () {
      this.splitCourses()
    }
  },
  methods: {
    splitCourses () {
      this.activeCourses = []
      this.pastCourses = []
      console.log('corsi', this.teacherCourses)
      this.teacherCourses.forEach(element => {
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
      this.$emit('undo-edit-courses')
    },
    undoAddCourse () {
      this.addCourse = {
        id: undefined,
        startingDate: undefined,
        type: undefined,
        unit: undefined
      }
      this.addCourseField = false
    },
    async saveNewCourse () {
      const newSubscription = {
        teacher_id: this.teacherId,
        course_id: this.addCourse.id,
        type: this.addCourse.type,
        unit: this.addCourse.unit,
        start_date: this.addCourse.startingDate
      }
      console.log({ newSubscription })
      const response = (await Axios.post('http://localhost:8000/api/hire-teacher', newSubscription)).data
      UpdatePayments.updateAllSalariesTable()
      this.addCourseField = false
      this.$emit('update-course-list')
      console.log({ response })
    },
    async endCourse (courseId) {
      console.log({ courseId })
      const response = (await Axios.post(`http://localhost:8000/api/fire-teacher/${courseId}`)).data
      this.$emit('update-course-list')
      console.log(response)
    },
    async reactivateCourse (course) {
      console.log({ course })
      const reactivateSubscription = {
        subscription_id: course.courses_teachers_id,
        teacher_id: this.teacherId,
        course_id: course.course_id
      }
      console.log({ reactivateSubscription })
      const response = (await Axios.post('http://localhost:8000/api/re-hire-teacher', reactivateSubscription)).data
      this.$emit('update-course-list')
      console.log(response)
    },
    agreementEnumeration (code) {
      return TeacherAgreement.codeToLabel(code)
    },
    formatType (value) {
      if (value === 0) {
        return '€/h'
      } else if (value === 1) {
        return '€'
      } else if (value === 2 || value === 3) {
        return '%'
      }
    }
  }
}
</script>
