//Creating a new model for testing  .defert()/Separate & Shared Migrations Concept
import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import EmployeeEmail from '#models/employee_email'

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  // // remove that column if you are moving email to separate table
  //..............................................................
  // @column()
  // declare email: string
  //..............................................................

  @hasMany(() => EmployeeEmail)
  declare emails: HasMany<typeof EmployeeEmail>

  @column()
  declare department: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
