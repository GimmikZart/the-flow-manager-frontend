<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="600"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        v-bind="attrs"
        v-on="on"
      >Aggiungi corso</v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar
          color='primary'
          dark
        >Crea nuovo corso</v-toolbar>
        <v-card-text>
          <v-text-field
            v-model="name"
            label='Nome'
            required>
          </v-text-field>
          <v-text-field
            v-model="price"
            label='Prezzo'
            required
            type='number'>
          </v-text-field>
        </v-card-text>
        <v-card-actions class='justify-end'>
          <v-btn
            text
            @click="saveCourse();dialog.value = false"
          >Salva</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
import Axios from 'axios'
export default {
  name: 'AddCourseModal',
  data: () => ({
    name: '',
    price: undefined,
    dialog: undefined
  }),
  methods: {
    async saveCourse () {
      const object = {
        name: this.name,
        price: this.price
      }
      console.log(object)
      const response = await Axios.post('https://the-flow-manager-api.herokuapp.com/api/create-course', object)
      console.log({ response })
    }
  }
}
</script>
<style scoped>

</style>
