import { HttpContext } from '@adonisjs/core/http'

export class SuccessService {
  //predefine sucess masges with http code
  private static messages = {
    USER_CREATED: { message: 'User created successfuly', Status: 201 },
    USER_LISTED: { message: 'User retrive successfuly', Status: 200 },
    USER_UPDATED: { message: 'User updated successfuly', Status: 200 },
    USER_DELETED: { message: 'User Deleted Successfuly', Status: 200 },
    // Add more predefined success messages here
  }
  /**
   *
   * @param ctx -Adonis HttpContext
   * @param key -Predefined key from messages
   * @param data -Optional payload
   */
  public static send(
    ctx: HttpContext,
    key: keyof typeof SuccessService.messages,
    data: any = null,
    meta: any = null
  ) {
    const res = this.messages[key]
    return ctx.response.status(res.Status).json({
      Status: true,
      massage: res.message,
      data,
      ...(meta && { meta }),
    })
  }
}
