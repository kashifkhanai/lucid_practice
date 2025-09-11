//Creating a new model for extracting email from employees table in a separate table
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Employee from '#models/employee'

export default class EmployeeEmail extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare employeeId: number

  @column()
  declare email: string

  @belongsTo(() => Employee)
  declare employee: BelongsTo<typeof Employee>
}
