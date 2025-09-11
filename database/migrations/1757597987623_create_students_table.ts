// this migration creates the courses table
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Students extends BaseSchema {
  protected tableName = 'students'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('email').unique().notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
