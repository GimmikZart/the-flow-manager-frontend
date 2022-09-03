<template>
  <div>

  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'Home',
  data: () => ({
    students: []
  }),
  methods: {
    async getStudents () {
      this.students = (await Axios.get('https://the-flow-manager-api.herokuapp.com/api/students')).data.data
      console.log(this.students)
    }
  },
  created () {
    this.getStudents()
  }
}
</script>
