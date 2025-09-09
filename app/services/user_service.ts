import User from '#models/user'
import db from '@adonisjs/lucid/services/db' // Import the database service
import AuditLog from '#models/audit_log' // Import the AuditLog model
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
  const trx = await db.transaction() // Start a new transaction
  try {
    const user = await User.create(payload, { client: trx }) // Pass the transaction client
    // audit log
    await AuditLog.create(
      {
        action: 'CREATE_USER',
        actorId: actorId || null,
        targetId: user.id,
        changes: { after: payload },
        meta: 'New user created',
      },
      { client: trx }
    )
    await trx.commit() // Commit the transaction
    return user
  } catch (error: any) {
    await trx.rollback() // Rollback the transaction on error
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
  const trx = await db.transaction() // Start a new transaction
  try {
    const user = await User.findOrFail(id, { client: trx })
    const before = user.toJSON()

    user.useTransaction(trx) // bind transaction
    await user.merge(payload).save()

    await AuditLog.create(
      {
        action: 'UPDATE_USER',
        actorId: actorId || null,
        targetId: user.id,
        changes: { before, after: payload },
        meta: 'User updated successfully',
      },
      { client: trx }
    )

    await trx.commit()
    return user
  } catch (error: any) {
    throw new Error(`Error updating user: ${error.message}`)
  }
}
// delete user(with audit log + transaction).............................
export const deleteUser = async (id: number, actorId?: number) => {
  const trx = await db.transaction()
  try {
    const user = await User.findOrFail(id, { client: trx })
    const before = user.toJSON()

    user.useTransaction(trx) // bind transaction
    await user.delete()

    await AuditLog.create(
      {
        action: 'DELETE_USER',
        actorId: actorId || null,
        targetId: id,
        changes: { before },
        meta: 'User deleted successfully',
      },
      { client: trx }
    )

    await trx.commit()
  } catch (error: any) {
    await trx.rollback()
    throw new Error(`Error deleting user: ${error.message}`)
  }
}
