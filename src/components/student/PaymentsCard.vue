<template>
  <v-card class="w-30">
    <v-card-title class="justify-center pa-2">
      PAGAMENTI
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
                <v-btn>PAGA</v-btn>
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
          <h6>Pagato il</h6>
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
            </v-list-item>
            <v-divider :key="index"></v-divider>
          </template>
        </v-list>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
export default {
  name: 'PaymentsCard',
  props: ['studentPayments'],
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
      this.studentPayments.forEach(element => {
        if (element.date_of_payment == null) {
          this.unpayedCourse.push(element)
        } else {
          this.paidCourse.push(element)
        }
      })
    }
  }
}
</script>
