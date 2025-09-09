import { logAudit } from '../utils/audit_helper.js'
import User from '#models/user'
import db from '@adonisjs/lucid/services/db' // Import the database service
import { CreatUserInterface, UpdateUserInterface } from '#validators/user'
import paginationConfig from '#config/pagination'

// get all users
export const listing = async (page: number = 1, limit?: number) => {
  try {
    const perPage = Math.min(limit || paginationConfig.defaultLimit, paginationConfig.maxLimit)
    return await User.query().paginate(page, perPage)
  } catch (error: any) {
    throw new Error(`Error retrieving users: ${error.message}`)
  }
}
// create new user(with audit log + transaction)........................................
export const createUser = async (payload: CreatUserInterface, actorId?: number) => {
  try {
    return await db.transaction(async (trx) => {
      const user = await User.create(payload, { client: trx })
      await logAudit(trx, 'CREATE_USER', actorId, user.id, payload, 'New user created')
      return user
    })
  } catch (error: any) {
    throw new Error(`Error creating user: ${error.message}`)
  }
}
// get user by id
export const getUserById = async (id: number) => {
  try {
    const user = await User.find(id)
    if (!user) throw new Error('User not found')
    return user
  } catch (error: any) {
    throw new Error(`Error retrieving user: ${error.message}`)
  }
}
// update user(with audit log + transaction).............................
export const updateUser = async (id: number, payload: UpdateUserInterface, actorId?: number) => {
  try {
    return await db.transaction(async (trx) => {
      const user = await User.findOrFail(id, { client: trx })
      const before = user.toJSON()
      user.useTransaction(trx)
      await user.merge(payload).save()
      await logAudit(
        trx,
        'UPDATE_USER',
        actorId,
        user.id,
        { before, after: payload },
        'User updated successfully'
      )
      return user
    })
  } catch (error: any) {
    throw new Error(`Error updating user: ${error.message}`)
  }
}
// delete user(with audit log + transaction).............................
export const deleteUser = async (id: number, actorId?: number) => {
  try {
    return await db.transaction(async (trx) => {
      const user = await User.findOrFail(id, { client: trx })
      const before = user.toJSON()
      user.useTransaction(trx)
      await user.delete()
      await logAudit(trx, 'DELETE_USER', actorId, id, before, 'User deleted successfully')
    })
  } catch (error: any) {
    throw new Error(`Error deleting user: ${error.message}`)
  }
}
