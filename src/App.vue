<template>
  <v-app>
    <v-navigation-drawer permanent app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            THE FLOW
          </v-list-item-title>
          <v-list-item-subtitle>
            manager
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in router"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'App',

  data: () => ({
    router: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/dashboard' },
      { title: 'Studenti', icon: 'mdi-image', to: '/studenti' },
      { title: 'Insegnanti', icon: 'mdi-help-box', to: '/insegnanti' },
      { title: 'Corsi', icon: 'mdi-help-box', to: '/corsi' }
    ]
  }),
  methods: {
    async updatePayments () {
      const paymentsResponse = (await Axios.get('https://the-flow-manager-api.herokuapp.com/api/check-payments')).data
      const salariesResponse = (await Axios.get('https://the-flow-manager-api.herokuapp.com/api/check-salaries')).data
      console.log({ paymentsResponse })
      console.log({ salariesResponse })
    }
  },
  created () {
    this.updatePayments()
  },
  updated () {
    this.updatePayments()
  }
}
</script>
<style lang="scss">
  @use "scss/style";
</style>
