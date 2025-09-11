// this is pivot table for many-to-many relationship between students and courses
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class StudentCourses extends BaseSchema {
  protected tableName = 'student_courses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('student_id').unsigned().references('students.id').onDelete('CASCADE')
      table.integer('course_id').unsigned().references('courses.id').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
