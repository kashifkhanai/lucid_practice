// Practice for AdonisJS Lucid ORM - Raw SQL Queries
import db from '@adonisjs/lucid/services/db'
import { HttpContext } from '@adonisjs/core/http'

export default class RawQueryController {
  // Get all users

  async index({ response }: HttpContext) {
    const result = await db.rawQuery('SELECT * FROM users')
    return response.json(result[0]) // MySQL ka result rows array [0] me hota hai
  }

  //Get single user by ID

  async show({ params, response }: HttpContext) {
    const result = await db.rawQuery('SELECT * FROM users WHERE id = ?', [params.id])
    return response.json(result[0][0] || {}) // ek hi row return karega
  }

  // Create new user

  async store({ request, response }: HttpContext) {
    const { username, email, password } = request.only(['username', 'email', 'password'])

    await db.rawQuery('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [
      username,
      email,
      password,
    ])

    return response.json({ message: 'User created successfully' })
  }

  // Update user by ID
  async update({ params, request, response }: HttpContext) {
    const { username, email } = request.only(['username', 'email'])

    await db.rawQuery('UPDATE users SET username = ?, email = ? WHERE id = ?', [
      username,
      email,
      params.id,
    ])

    return response.json({ message: 'User updated successfully' })
  }

  //Delete user by ID

  async destroy({ params, response }: HttpContext) {
    await db.rawQuery('DELETE FROM users WHERE id = ?', [params.id])
    return response.json({ message: 'User deleted successfully' })
  }
}
