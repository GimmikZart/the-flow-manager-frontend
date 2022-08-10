import Axios from 'axios'

export class UpdatePayments {
  static async updateAllPaymentsTable () {
    const responseUpdate = await Axios.get('http://localhost:8000/api/check-payments')
    console.log({ responseUpdate })
  }

  static async updateAllSalariesTable () {
    const responseUpdate = await Axios.get('http://localhost:8000/api/check-salaries')
    console.log({ responseUpdate })
  }
}
