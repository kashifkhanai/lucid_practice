// this fils child model of User model
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare bio: string

  // Define inverse relationship with User(belongsTo relation)
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
