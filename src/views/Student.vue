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
    <!-- <v-container fluid>
      <v-tabs v-model="tab" grow>
        <v-tabs-slider color="blue"></v-tabs-slider>
        <v-tab>
          INFORMAZIONI
        </v-tab>
        <v-tab>
          CORSI
        </v-tab>
        <v-tab>
          PAGAMENTI
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <div>
            Nome: {{student.name}}
          </div>
          <div>
            Cognome: {{student.lastname}}
          </div>
          <div>
            Gender: {{student.gender}}
          </div>
          <div>
            Data di nascita: {{student.dateOfBirth}}
          </div>
          <div>
            Registrato: {{student.registered}}
          </div>
          <div>
            Email: {{student.email}}
          </div>
          <div>
            Telefono: {{student.telephone}}
          </div>
        </v-tab-item>
        <v-tab-item>
          CORSIIIIIIIIIIIII
        </v-tab-item>
        <v-tab-item>
          PAGAMENTIIIIIIIIIIIIIIII
        </v-tab-item>
      </v-tabs-items>

    </v-container> -->
    <v-container fluid class="d-flex justify-space-around">
      <v-card class="w-30">
        <v-card-title class="justify-space-between pa-2">
          INFORMAZIONI
          <v-btn v-if="!editInfo" @click="editInfo = true">EDIT</v-btn>
          <div v-if="editInfo">
            <v-btn @click="editInfo = false">ANNULLA</v-btn>
            <v-btn @click="saveEditInfo()">SALVA</v-btn>
          </div>
        </v-card-title>
        <v-divider></v-divider>
        <v-list class="pa-0">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>
                mdi-account-circle
              </v-icon>
              NOME
            </v-list-item-icon>
            <v-list-item-content class="justify-end">
              <v-text-field v-if="editInfo" v-model="student.name" hide-details class="ma-0 pa-0" outlined dense></v-text-field>
              <span v-else class="text-end">{{student.name}}</span>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>
                mdi-account-circle
              </v-icon>
              COGNOME
            </v-list-item-icon>
            <v-list-item-content class="justify-end">
              {{student.lastname}}
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>
                mdi-at
              </v-icon>
              EMAIL
            </v-list-item-icon>
            <v-list-item-content class="justify-end">
              {{student.email}}
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>
                mdi-phone
              </v-icon>
              Telefono
            </v-list-item-icon>
            <v-list-item-content class="justify-end">
              {{student.telephone}}
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>
                mdi-gender-male-female
              </v-icon>
              GENERE
            </v-list-item-icon>
            <v-list-item-content class="justify-end">
              {{student.gender}}
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>
                mdi-cake-variant-outline
              </v-icon>
              Data di nascita
            </v-list-item-icon>
            <v-list-item-content class="justify-end">
              {{student.dateOfBirth}}
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>
                mdi-calendar-check
              </v-icon>
              Registrato
            </v-list-item-icon>
            <v-list-item-content class="justify-end">
              {{student.registered}}
            </v-list-item-content>
          </v-list-item>
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

    editInfo: false

  }),
  methods: {
    async getStudent () {
      this.student = (await Axios.get(`http://localhost:8000/api/student/${this.id}`)).data
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
    }
  },
  created () {
    console.log('id', this.id)
    this.getStudent()
  }
}
</script>
