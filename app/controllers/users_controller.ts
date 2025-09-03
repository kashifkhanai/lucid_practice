import ErrorService from '#services/error_service'
import { listing, createUser, getUserById, updateUser, deleteUser } from '#services/user_service'
import type { HttpContext } from '@adonisjs/core/http'
import { CreatUserValidator, UpdateUserValidator } from '#validators/user'
import { SuccessService } from '#services/success_service'
export default class UsersController {
  //get all user.....................
  public async allUser(ctx: HttpContext) {
    try {
      const page = Number(ctx.request.input('page', 1)) // default = 1
      const rawLimit = ctx.request.input('limit')
      const limit = rawLimit ? Number(rawLimit) : undefined

      const users = await listing(page, limit)

      return SuccessService.send(ctx, 'USER_LISTED', users)
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }
  // getby id.........................
  public async show(ctx: HttpContext) {
    try {
      const user = await getUserById(ctx.params.id)
      return SuccessService.send(ctx, 'USER_LISTED', user)
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }
  // create new user.........................
  public async create(ctx: HttpContext) {
    try {
      const payload = await ctx.request.validateUsing(CreatUserValidator)
      const user = await createUser(payload)
      return SuccessService.send(ctx, 'USER_CREATED', user)
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }
  //update user........................
  public async update(ctx: HttpContext) {
    try {
      const payload = await ctx.request.validateUsing(UpdateUserValidator)
      const user = await updateUser(ctx.params.id, payload)
      return SuccessService.send(ctx, 'USER_UPDATED', user)
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }
  // delet user..........................
  public async delete(ctx: HttpContext) {
    try {
      await deleteUser(ctx.params.id)
      return SuccessService.send(ctx, 'USER_DELETED')
    } catch (error) {
      return ErrorService.handleError(ctx, error)
    }
  }
}
