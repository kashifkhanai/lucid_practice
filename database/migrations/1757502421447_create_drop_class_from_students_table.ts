//Removing column from existing table
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'students'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('class')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('class').nullable()
    })
  }
}
