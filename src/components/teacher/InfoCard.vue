<template>
  <v-card class="w-25">
    <v-card-title class="pa-2" :class="{ 'justify-space-between': editInfo, 'justify-center': !editInfo }">
      INFORMAZIONI
      <div v-if="editInfo" class="ml-3">
        <v-btn @click="undoEdit()" class="mr-2">ANNULLA</v-btn>
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
            <v-text-field v-if="editInfo && item.type == 'string'" v-model="editTeacher[item.value]" hide-details class="ma-0 pa-0" outlined dense></v-text-field>
            <div v-else-if="editInfo && item.type == 'switch'" class="d-flex align-center">
              <v-icon color="blue" :class="{'opacity-double-half': editTeacher[item.value]}">mdi-face-man</v-icon>
              <v-switch
                color="pink"
                v-model="editTeacher[item.value]"
                inset
                :false-value="0"
                :true-value="1"
                hide-details
                class="ma-0 ml-3 mr-1"
              ></v-switch>
              <v-icon color="pink" :class="{'opacity-double-half': !editTeacher[item.value]}">mdi-face-woman</v-icon>
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
                  v-model="editTeacher[item.value]"
                  label="Data di nascita"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="editTeacher[item.value]"
                @input="datePicker[index] = false"
              ></v-date-picker>
            </v-menu>
            <span v-else class="text-end">{{teacher[item.value]}}</span>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
  </v-card>
</template>
<script>
import Axios from 'axios'
import { GenderEnumeration } from '@/utility/enumerations.js'
export default {
  name: 'InfoCardTeacher',
  props: ['editInfo', 'teacher', 'editTeacher'],
  data: () => ({
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
      }
    ],
    datePicker: [],
    editTeacher: {}
  }),
  watch: {
    teacher () {
      this.editTeacher = JSON.parse(JSON.stringify(this.teacher))
      this.teacher.gender = GenderEnumeration.codeToLabel(this.teacher.gender)
    },
    editInfo () {
      console.log('PORCO DIO')
    }
  },
  methods: {
    async saveEditInfo () {
      const response = await Axios.post('http://localhost:8000/api/teacher-edit', this.editTeacher)
      this.$emit('update-teacher-info', false)
      console.log(response)
    },
    undoEdit () {
      this.editTeacher = JSON.parse(JSON.stringify(this.teacher))
      this.editInfo = false
      this.$emit('undo-edit-info')
    }
  },
  created () {
    console.log('oooo', this.editInfo)
  }
}
</script>
<style scoped>
  ::v-deep .theme--light.v-input--switch .v-input--switch__track,
  ::v-deep .theme--light.v-input--switch .v-input--switch__thumb{
    color: blue;
  }
</style>
