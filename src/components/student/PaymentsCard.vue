<template>
  <v-card class="w-30">
    <v-card-title class="pa-2" :class="{ 'justify-space-between': editPayments, 'justify-center': !editPayments }">
      PAGAMENTI
      <div v-if="editPayments" class="ml-3">
        <v-btn @click="undoEditPayments()" class="mr-2">ANNULLA</v-btn>
      </div>
    </v-card-title>
    <v-divider></v-divider>
    <v-tabs v-model="paymentTab" grow>
      <v-tabs-slider color="blue"></v-tabs-slider>
      <v-tab>
        DA RICEVERE
      </v-tab>
      <v-tab>
        PASSATI
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="paymentTab">
      <v-tab-item>
        <div class="d-flex justify-space-between align-center mt-3 pr-5 pl-5">
          <h6>Corso</h6>
          <h6>Prezzo</h6>
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
                {{payment.value}}
              </v-list-item-content>
              <v-list-item-content class="justify-center">
                {{payment.month}}/{{payment.year}}
              </v-list-item-content>
              <v-list-item-content class="justify-end">
                <v-btn v-if="!editPayments" @click="payCourse(payment.payments_id)">PAGA</v-btn>
                <v-btn v-else @click="cancelPayment(payment.payments_id)">ANNULLA</v-btn>
              </v-list-item-content>
            </v-list-item>
            <v-divider :key="index"></v-divider>
          </template>
        </v-list>
      </v-tab-item>

      <v-tab-item>
        <div class="d-flex justify-space-between align-center mt-3 pr-5 pl-5">
          <h6>Corso</h6>
          <h6>Prezzo</h6>
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
                <span class="text-end" v-if="!editPayments">{{formatStatus(payment.status) }}</span>
                <v-btn v-else @click="undoPayment(payment.payments_id)">ANNULLA</v-btn>
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
  props: ['studentPayments', 'editPayments'],
  data: () => ({
    paymentTab: 0,
    unpayedCourse: [],
    paidCourse: []
  }),
  watch: {
    studentPayments () {
      this.splitPayments()
    }
  },
  methods: {
    splitPayments () {
      this.unpayedCourse = []
      this.paidCourse = []
      this.studentPayments.forEach(element => {
        if (element.date_of_payment == null) {
          this.unpayedCourse.push(element)
        } else {
          this.paidCourse.push(element)
        }
      })
      console.log(this.unpayedCourse)
    },
    async payCourse (paymentId) {
      const response = await Axios.post(`https://the-flow-manager-api.herokuapp.com/api/pay-course/${paymentId}`)
      console.log({ response })
      this.$emit('update-course-list')
    },
    async cancelPayment (paymentId) {
      const response = await Axios.post(`https://the-flow-manager-api.herokuapp.com/api/cancel-payment/${paymentId}`)
      console.log({ response })
      this.$emit('update-course-list')
    },
    async undoPayment (paymentId) {
      const response = await Axios.post(`https://the-flow-manager-api.herokuapp.com/api/undo-payment/${paymentId}`)
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
