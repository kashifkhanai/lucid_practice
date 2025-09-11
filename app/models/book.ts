import { BaseModel, column, scope } from '@adonisjs/lucid/orm'
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

  // 🔹 Scope: filter by year
  static byYear = scope((query, year: number) => {
    query.where('publishYear', year)
  })

  // 🔹 Scope: filter by author
  static byAuthor = scope((query, author: string) => {
    query.where('authorName', author)
  })

  // 🔹 Scope: recent books (latest first)
  static recent = scope((query) => {
    query.orderBy('id', 'desc')
  })
}
