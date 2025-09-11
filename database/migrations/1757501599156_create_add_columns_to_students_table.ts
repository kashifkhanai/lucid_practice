//Adding new columns to existing table
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'students'

  async up() {
    //this table is exsisting so we use alterTable
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('roll_no').nullable().unique()
      table.date('dob').nullable()
    })
  }

  async down() {
    //this table is exsisting so we use alterTable
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('roll_no')
      table.dropColumn('dob')
    })
  }
}
