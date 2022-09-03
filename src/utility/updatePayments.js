import Axios from 'axios'

export class UpdatePayments {
  static async updateAllPaymentsTable () {
    const responseUpdate = await Axios.get('https://the-flow-manager-api.herokuapp.com/api/check-payments')
    console.log({ responseUpdate })
  }

  static async updateAllSalariesTable () {
    const responseUpdate = await Axios.get('https://the-flow-manager-api.herokuapp.com/api/check-salaries')
    console.log({ responseUpdate })
  }
}
