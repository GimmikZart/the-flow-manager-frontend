<template>
  <div class="main-container">
    <v-app-bar dense flat app>
      <v-spacer></v-spacer>
      <v-btn depressed color="green" @click="saveStudent()">
        SAVE
      </v-btn>
    </v-app-bar>

    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Nome"
        required
      ></v-text-field>
      <v-text-field
        v-model="lastname"
        :counter="10"
        :rules="lastnameRules"
        label="Cognome"
        required
      ></v-text-field>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="telephone"
        :rules="telephoneRules"
        label="Recapito telefonico"
        required
      ></v-text-field>

      <div class="d-flex align-center">
        <v-icon color="blue" :class="{'opacity-double-half': gender}">mdi-face-man</v-icon>
        <v-switch
          color="pink"
          v-model="gender"
          inset
          :false-value="0"
          :true-value="1"
          hide-details
          class="ma-0 ml-3 mr-1"

        ></v-switch>
        <v-icon color="pink" :class="{'opacity-double-half': !gender}">mdi-face-woman</v-icon>
      </div>

      <v-text-field
        v-model="avatar"
        :counter="10"
        label="Avatar"
        required
      ></v-text-field>

      <v-menu
        v-model="dateOfBirthMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dateOfBirth"
            label="Data di nascita"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="dateOfBirth"
          @input="dateOfBirthMenu = false"
        ></v-date-picker>
      </v-menu>

      <v-menu
        v-model="registeredMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="registered"
            label="Iscritto il"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="registered"
          @input="registeredMenu = false"
        ></v-date-picker>
      </v-menu>
    </v-form>
  </div>
</template>
<script>
import Axios from 'axios'
export default {
  name: 'AddStudent',
  data: () => ({
    dateOfBirthMenu: false,
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Il nome è richiesto!'
    ],
    lastname: '',
    lastnameRules: [
      v => !!v || 'Il cognome è richiesto!'
    ],
    email: '',
    emailRules: [
      v => /.+@.+\..+/.test(v) || "L'email deve essere valida!"
    ],
    telephone: '',
    gender: 0,
    avatar: '',
    dateOfBirth: '',
    registered: ''
  }),
  methods: {
    async saveStudent () {
      this.$refs.form.validate()
      console.log(this.gender)
      const object = {
        name: this.name,
        lastname: this.lastname,
        gender: this.gender,
        email: this.email,
        telephone: this.telephone,
        avatar: this.avatar,
        dateOfBirth: this.dateOfBirth,
        registered: this.registered
      }
      console.log(object)
      const response = await Axios.post('https://the-flow-manager-api.herokuapp.com/api/student-create', object)
      console.log({ response })
    }
  }
}
</script>
<style scoped>
  ::v-deep .theme--light.v-input--switch .v-input--switch__track,
  ::v-deep .theme--light.v-input--switch .v-input--switch__thumb{
    color: blue;
  }
</style>
