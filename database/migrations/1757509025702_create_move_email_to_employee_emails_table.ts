// Creating new table for extracting email from employees table in a separate table
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'employee_emails'

  async up() {
    // create employee_emails table
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('employee_id').unsigned().references('employees.id').onDelete('CASCADE')
      table.string('email')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    //copy email data from employees table to employee_emails table
    this.defer(async (db) => {
      const employees = await db.from('employees').select('*')
      await Promise.all(
        employees.map((emp) => {
          if (emp.email) {
            return db.table(this.tableName).insert({
              employee_id: emp.id,
              email: emp.email,
            })
          }
          return Promise.resolve()
        })
      )
    })

    // delete email column from employees table
    this.schema.alterTable('employees', (table) => {
      table.dropColumn('email')
    })
  }

  public async down() {
    // for rollback, add email column back to employees table
    this.schema.alterTable('employees', (table) => {
      table.string('email')
    })
    this.schema.dropTable(this.tableName)
  }
}
