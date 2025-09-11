// this migration creates the courses table
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Courses extends BaseSchema {
  protected tableName = 'courses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title').notNullable()
      table.text('description').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
