//create a controller for Book model with index and store methods for listing and creating books(using custom naming strategy)
import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'

export default class BooksController {
  async index({}: HttpContext) {
    return await Book.all()
  }

  async store({ request }: HttpContext) {
    const data = request.only(['bookTitle', 'authorName', 'publishYear'])
    return await Book.create(data)
  }
}
