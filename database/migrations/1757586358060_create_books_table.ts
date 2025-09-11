//migration file to create books_tbl with custom column names for naming strategy
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books_tbl'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('book_title_col').notNullable()
      table.string('author_name_col').notNullable()
      table.integer('publish_year_col').notNullable()
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
