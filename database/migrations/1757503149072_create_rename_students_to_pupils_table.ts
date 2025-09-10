//Renaming existing table
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.renameTable('students', 'pupils') // table rename
  }
  async down() {
    this.schema.renameTable('pupils', 'students') // rollback me dobara purana naam
  }
}
