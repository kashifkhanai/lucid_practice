// import { BaseSchema } from '@adonisjs/lucid/schema'

// export default class extends BaseSchema {
//   protected tableName = 'pupils'

//   async up() {
//     this.schema.dropTable(this.tableName) // delete table
//   }

//   async down() {
//     this.schema.createTable(this.tableName, (table) => {
//       table.increments('id')
//       table.string('full_name').notNullable()
//       table.string('email').notNullable().unique()
//       table.integer('roll_no').nullable().unique()
//       table.date('dob').nullable()
//       table.timestamp('created_at', { useTz: true })
//       table.timestamp('updated_at', { useTz: true })
//     })
//   }
// }

//..................................................................
//If you want remove table you can use above code by uncommenting it
// and running migration "node ace migration:run"
//when you run migration it will delete the table in model sudent/pupil are use less so you can delete them also
