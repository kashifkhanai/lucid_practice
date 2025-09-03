import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    /**
     * Create 70 sample users
     */
    for (let i = 1; i <= 70; i++) {
      await User.create({
        fullName: `User ${i}`,
        email: `user${i}@example.com`,
        password: 'password123', // password will be automatically hashed in User model
      })
    }

    console.log(' users created successfully!')
  }
}
