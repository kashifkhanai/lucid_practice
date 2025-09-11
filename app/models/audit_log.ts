import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class AuditLog extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare action: string

  @column({ columnName: 'actor_id' })
  declare actorId: number | null

  @column({ columnName: 'target_id' })
  declare targetId: number | null
  @column()
  declare changes: any | null

  @column()
  declare meta: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}
