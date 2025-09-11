//model file for Book with custom naming strategy
import { BaseModel, column } from '@adonisjs/lucid/orm'
import MyCustomNamingStrategy from '../strategies/my_custom_naming_strategy.js'

export default class Book extends BaseModel {
  static namingStrategy = new MyCustomNamingStrategy()

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare bookTitle: string

  @column()
  declare authorName: string

  @column()
  declare publishYear: number
}
