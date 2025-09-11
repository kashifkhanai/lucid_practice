//create a custom naming strategy
import string from '@adonisjs/core/helpers/string'
import { BaseModel, CamelCaseNamingStrategy } from '@adonisjs/lucid/orm'

export default class MyCustomNamingStrategy extends CamelCaseNamingStrategy {
  // Customize table name
  tableName(model: typeof BaseModel) {
    return string.pluralize(string.snakeCase(model.name)) + '_tbl'
    // Example: Book -> books_tbl
  }

  // Customize column name
  columnName(_model: typeof BaseModel, propertyName: string) {
    return string.snakeCase(propertyName) + '_col'
    // Example: bookTitle -> book_title_col
  }

  // Customize serialized name
  serializedName(_model: typeof BaseModel, propertyName: string) {
    return string.camelCase(propertyName)
    // Example: book_title_col -> bookTitle
  }
}
