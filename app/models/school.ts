import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeSave,
  beforeCreate,
  beforeDelete,
  beforeUpdate,
} from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'

export default class School extends BaseModel {
  // ifyou want to use UUIDs as primary keys instead of auto-incrementing integers
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare email: string

  @column()
  declare address: string | null

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  //Hook 1 – Assign UUID before creating a new record
  @beforeCreate()
  static assignUuid(school: School) {
    school.id = randomUUID()
  }

  //Hook 2 – Format email to lowercase before saving
  @beforeSave()
  static formatEmail(school: School) {
    if (school.$dirty.email) {
      school.email = school.email.toLowerCase()
    }
  }
  // Hook 3 – Normalize name before updating
  @beforeUpdate()
  static normalizeName(school: School) {
    if (school.$dirty.name) {
      school.name = school.name.charAt(0).toUpperCase() + school.name.slice(1).toLowerCase()
    }
  }
  // Hook 4 – Log deletions of records (beforeDelete)
  @beforeDelete()
  static async logDelete(school: School) {
    console.log(`School deleted: ${school.id} - ${school.name}`)
  }
}
