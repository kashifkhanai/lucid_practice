import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'create_audit_logs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // primary id
      table.string('action').notNullable() // action performed
      table
        .integer('actor_id') // which  user performed the action
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
        .index()

      table
        .integer('target_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .index() //on action done
      table.json('changes').notNullable() // details of the changes
      table.string('meta').nullable() // additional metadata
      table.timestamp('created_at').defaultTo(this.now()) // timestamp of the action
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
