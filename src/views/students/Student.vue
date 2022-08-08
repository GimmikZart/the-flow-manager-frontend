<template>
  <div class="main-container">
    <v-app-bar dense flat app>
      <v-spacer></v-spacer>

    </v-app-bar>

    <v-container fluid>
      <div class="d-flex">
        <div class="circle overflow-hidden mr-5">
          <v-img
            :aspect-ratio="1/1"
            width="180px"
            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
          ></v-img>
        </div>
        <div class="d-flex flex-column justify-center">
          <h1>{{student.name}}</h1>
          <h1>{{student.lastname}}</h1>
        </div>
      </div>
    </v-container>
    <v-container fluid class="d-flex justify-space-around">
      <v-card class="w-30">
        <v-card-title class="justify-space-between pa-2">
          INFORMAZIONI
          <v-btn v-if="!editInfo" @click="editInfo = true">EDIT</v-btn>
          <div v-if="editInfo">
            <v-btn @click="undoEdit()">ANNULLA</v-btn>
            <v-btn @click="saveEditInfo()">SALVA</v-btn>
          </div>
        </v-card-title>
        <v-divider></v-divider>
        <v-list class="pa-0">
          <div v-for="(item, index) in infoList" :key="index">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>
                  {{item.icon}}
                </v-icon>
                {{item.title}}
              </v-list-item-icon>
              <v-list-item-content class="justify-end">
                <v-text-field v-if="editInfo && item.type == 'string'" v-model="editStudent[item.value]" hide-details class="ma-0 pa-0" outlined dense></v-text-field>
                <div v-else-if="editInfo && item.type == 'switch'" class="d-flex align-center">
                  <v-icon color="blue" :class="{'opacity-double-half': editStudent[item.value]}">mdi-face-man</v-icon>
                  <v-switch
                    color="pink"
                    v-model="editStudent[item.value]"
                    inset
                    :false-value="0"
                    :true-value="1"
                    hide-details
                    class="ma-0 ml-3 mr-1"
                  ></v-switch>
                  <v-icon color="pink" :class="{'opacity-double-half': !editStudent[item.value]}">mdi-face-woman</v-icon>
                </div>
                <v-menu
                  v-else-if="editInfo && item.type == 'date'"
                  v-model="datePicker[index]"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="editStudent[item.value]"
                      label="Data di nascita"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="editStudent[item.value]"
                    @input="datePicker[index] = false"
                  ></v-date-picker>
                </v-menu>
                <span v-else class="text-end">{{student[item.value]}}</span>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </v-list>
      </v-card>

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
            <v-list class="pa-0">
              <template v-for="(course, index) in student.courses">
                <v-divider :key="index"></v-divider>
                <v-list-item :key="index" v-if="course.pivot.active == 0">
                  <v-list-item-icon>
                    {{course.name}}
                  </v-list-item-icon>
                  <v-list-item-content class="justify-end">
                    {{course.pivot.start_date}}
                  </v-list-item-content>
                  <v-list-item-content class="justify-end">
                    {{course.pivot.end_date ? course.pivot.end_date : 'on going'}}
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-tab-item>

          <v-tab-item>
            <div class="d-flex justify-space-between align-center mt-3 pr-5 pl-5">
              <h6>Corso</h6>
              <h6>Start</h6>
              <h6>End</h6>
            </div>
            <v-list class="pa-0">
              <template v-for="(course, index) in student.courses">
                <v-divider :key="index"></v-divider>
                <v-list-item :key="index" v-if="course.pivot.active == 1">
                  <v-list-item-icon>
                    {{course.name}}
                  </v-list-item-icon>
                  <v-list-item-content class="justify-end">
                    {{course.pivot.start_date}}
                  </v-list-item-content>
                  <v-list-item-content class="justify-end">
                    {{course.pivot.end_date}}
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-tab-item>
        </v-tabs-items>
      </v-card>

      <v-card class="w-30">
        <v-card-title class="justify-center pa-2">
          PAGAMENTI
        </v-card-title>
        <v-divider class="mb-3"></v-divider>

      </v-card>
    </v-container>
  </div>
</template>
<script>
import Axios from 'axios'
export default {
  name: 'Student',
  props: ['id'],
  data: () => ({
    student: {},
    coursesTab: 0,
    activeCourses: [],
    pastCourses: [],
    datePicker: [],
    infoList: [
      {
        icon: 'mdi-account-circle',
        title: 'NOME',
        value: 'name',
        type: 'string'
      },
      {
        icon: 'mdi-account-circle',
        title: 'COGNOME',
        value: 'lastname',
        type: 'string'
      },
      {
        icon: 'mdi-at',
        title: 'EMAIL',
        value: 'email',
        type: 'string'
      },
      {
        icon: 'mdi-phone',
        title: 'TELEFONO',
        value: 'telephone',
        type: 'string'
      },
      {
        icon: 'mdi-gender-male-female',
        title: 'GENERE',
        value: 'gender',
        type: 'switch'
      },
      {
        icon: 'mdi-cake-variant-outline',
        title: 'DATA DI NASCITA',
        value: 'dateOfBirth',
        type: 'date'
      },
      {
        icon: 'mdi-calendar-check',
        title: 'REGISTRATO',
        value: 'registered',
        type: 'date'
      },
      {
        icon: 'mdi-account-circle',
        title: 'AVATAR',
        value: 'avatar',
        type: 'string'
      }
    ],
    editInfo: false,
    editStudent: {}

  }),
  methods: {
    async getStudent () {
      this.student = (await Axios.get(`http://localhost:8000/api/student/${this.id}`)).data
      this.editStudent = JSON.parse(JSON.stringify(this.student))
      console.log(this.student)
      this.splitCourses()
    },
    splitCourses () {
      this.student.courses.forEach(element => {
        if (element.pivot.active === 0) {
          this.activeCourses.push(element)
        } else {
          this.pastCourses.push(element)
        }
      })
    },
    async saveEditInfo () {
      console.log('edit save', this.editStudent)
      console.log(this.student.id)
      const response = await Axios.post('http://localhost:8000/api/student-edit', this.editStudent)
      console.log({ response })
    },
    undoEdit () {
      this.editStudent = JSON.parse(JSON.stringify(this.student))
      this.editInfo = false
      console.log('undo edit', this.editStudent)
    }
  },
  created () {
    console.log('id', this.id)
    this.getStudent()
  }
}
</script>
