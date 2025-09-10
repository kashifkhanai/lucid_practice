import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  // @column()
  // declare name: string
  // // after renaming column 'name' to 'full_name'
  @column()
  declare fullName: string

  @column()
  declare email: string
  //..............................................................
  //Newly added columns when we add new columns to existing table
  @column()
  declare rollNo: number | null

  @column()
  declare dob: Date | null
  //..............................................................
  // //Newly removed column when we drop column from existing table
  // @column()
  // declare class: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
