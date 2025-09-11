//create a controller for Book model with index and store methods for listing and creating books(using custom naming strategy)
import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'

export default class BooksController {
  async index({ request }: HttpContext) {
    const year = request.input('year')
    const author = request.input('author')

    // if both year and author are given
    if (year && author) {
      return await Book.query().withScopes((scopes) => {
        scopes.byYear(year).byAuthor(author).recent()
      })
    }

    // if only year is given
    if (year) {
      return await Book.query().withScopes((scopes) => scopes.byYear(year))
    }

    // if only author is given
    if (author) {
      return await Book.query().withScopes((scopes) => scopes.byAuthor(author))
    }

    // by default return recent books
    return await Book.query().withScopes((scopes) => scopes.recent())
  }

  async store({ request }: HttpContext) {
    const data = request.only(['bookTitle', 'authorName', 'publishYear'])
    return await Book.create(data)
  }
}
