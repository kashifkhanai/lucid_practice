import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.query({ connection: 'pg' }).del()

    for (let i = 1; i <= 70; i++) {
      await User.create(
        {
          fullName: `User ${i}`,
          email: `user${i}@example.com`,
          password: 'password123',
        },
        { connection: 'pg' }
      )
    }
  }
}
