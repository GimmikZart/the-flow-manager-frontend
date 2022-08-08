<template>
  <div class="main-container">
    <v-app-bar dense flat app>
      <v-spacer></v-spacer>
      <v-btn depressed color="blue" @click="dialog = true">
        EDIT
      </v-btn>
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
        <v-card-title class="justify-center pa-2">
          INFORMAZIONI
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
              {{student.name}}
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
        <v-divider class="mb-3"></v-divider>

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
    tab: 0
  }),
  methods: {
    async getStudent () {
      this.student = (await Axios.get(`http://localhost:8000/api/student/${this.id}`)).data.data
      console.log(this.student)
    }
  },
  created () {
    console.log('id', this.id)
    this.getStudent()
  }
}
</script>
