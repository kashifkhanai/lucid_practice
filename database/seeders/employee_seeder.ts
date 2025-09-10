//for seeding initial data into the employees table for testing purposes
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Employee from '#models/employee'

export default class extends BaseSeeder {
  async run() {
    await Employee.createMany([
      { name: 'Ali', email: 'ali@company.com', department: 'HR' },
      { name: 'Sara', email: 'sara@company.com', department: 'Finance' },
      { name: 'Ahmed', email: 'ahmed@company.com', department: 'IT' },
    ])
  }
}
