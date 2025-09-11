// this is the Student model that defines the many-to-many relationship with Course model
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Course from '#models/course'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare email: string

  @manyToMany(() => Course, {
    pivotTable: 'student_courses',
  })
  declare courses: ManyToMany<typeof Course>
}
