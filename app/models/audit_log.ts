import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class AuditLog extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare action: string

  @column({ columnName: 'user_id' })
  declare userId: number | null

  @column()
  declare changes: any | null

  @column()
  declare meta: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}
