// this is the Course model that defines the many-to-many relationship with Student model
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Student from '#models/student'

export default class Course extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @manyToMany(() => Student, {
    pivotTable: 'student_courses',
  })
  declare students: ManyToMany<typeof Student>
}
