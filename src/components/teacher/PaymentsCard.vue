<template>
  <v-card class="w-35">
    <v-card-title class="pa-2" :class="{ 'justify-space-between': editSalaries, 'justify-center': !editSalaries }">
      STIPENDI
      <div v-if="editSalaries" class="ml-3">
        <v-btn @click="undoEditPayments()" class="mr-2">ANNULLA</v-btn>
      </div>
    </v-card-title>
    <v-divider></v-divider>
    <v-tabs v-model="paymentTab" grow>
      <v-tabs-slider color="blue"></v-tabs-slider>
      <v-tab>
        DA INVIARE
      </v-tab>
      <v-tab>
        PASSATI
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="paymentTab">
      <v-tab-item>
        <div class="d-flex justify-space-between align-center mt-3 pr-5 pl-5">
          <h6>Corso</h6>
          <h6>Somma da versare</h6>
          <h6>Periodo</h6>
          <h6>Action</h6>
        </div>
        <v-divider></v-divider>
        <v-list class="pa-0">
          <template v-for="(payment, index) in unpayedCourse">
            <v-list-item :key="index">
              <v-list-item-icon>
                {{payment.name}}
              </v-list-item-icon>
              <v-list-item-content class="justify-center">
                <v-text-field v-model="payment.value" label="calcolato" outlined hide-details dense></v-text-field>
                <!-- <span v-else>{{payment.value}}</span> -->
              </v-list-item-content>
              <v-list-item-content class="justify-center">
                {{payment.month}}/{{payment.year}}
              </v-list-item-content>
              <v-list-item-content class="justify-end">
                <v-btn v-if="!editSalaries" :disabled="payment.value == null" @click="payCourse(payment.salaries_id, payment.value)">PAGA</v-btn>
                <v-btn v-else @click="cancelPayment(payment.salaries_id)">ANNULLA</v-btn>
              </v-list-item-content>
            </v-list-item>
            <v-divider :key="index"></v-divider>
          </template>
        </v-list>
      </v-tab-item>

      <v-tab-item>
        <div class="d-flex justify-space-between align-center mt-3 pr-5 pl-5">
          <h6>Corso</h6>
          <h6>Somma versata</h6>
          <h6>Periodo</h6>
          <h6>Eseguito il</h6>
          <h6>Status</h6>
        </div>
        <v-divider></v-divider>
        <v-list class="pa-0">
          <template v-for="(payment, index) in paidCourse">
            <v-list-item :key="index">
              <v-list-item-icon>
                {{payment.name}}
              </v-list-item-icon>
              <v-list-item-content class="justify-center">
                  {{payment.value}}
              </v-list-item-content>
              <v-list-item-content class="justify-center">
                {{payment.month}}/{{payment.year}}
              </v-list-item-content>
              <v-list-item-content class="justify-end">
                {{payment.date_of_payment}}
              </v-list-item-content>
              <v-list-item-content class="justify-end">
                <span v-if="!editSalaries">{{formatStatus(payment.status) }}</span>
                <v-btn v-else @click="undoPayment(payment.salaries_id)">ANNULLA</v-btn>

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
import { PaymentStatusEnumeration } from '@/utility/enumerations.js'
export default {
  name: 'PaymentsCard',
  props: ['teacherSalaries', 'editSalaries'],
  data: () => ({
    paymentTab: 0,
    unpayedCourse: [],
    paidCourse: []
  }),
  watch: {
    teacherSalaries () {
      console.log('CULOOO')
      this.splitSalaries()
    }
  },
  methods: {
    splitSalaries () {
      this.unpayedCourse = []
      this.paidCourse = []
      console.log('salaries', this.teacherSalaries)
      this.teacherSalaries.forEach(element => {
        if (element.date_of_payment == null) {
          this.unpayedCourse.push(element)
        } else {
          this.paidCourse.push(element)
        }
      })
      console.log('unpayed', this.unpayedCourse)
    },
    async payCourse (paymentId, value) {
      console.log(paymentId)
      const data = {
        paymentId: paymentId,
        value: value
      }
      const response = await Axios.post('http://localhost:8000/api/pay-salary', data)
      console.log({ response })
      this.$emit('update-course-list')
    },
    async cancelPayment (paymentId) {
      const response = await Axios.post(`http://localhost:8000/api/cancel-salary/${paymentId}`)
      console.log({ response })
      this.$emit('update-course-list')
    },
    async undoPayment (paymentId) {
      const response = await Axios.post(`http://localhost:8000/api/undo-salary/${paymentId}`)
      console.log({ response })
      this.$emit('update-course-list')
    },
    undoEditPayments () {
      this.$emit('undo-edit-courses')
    },
    formatStatus (status) {
      return PaymentStatusEnumeration.codeToLabel(status)
    }
  }
}
</script>
