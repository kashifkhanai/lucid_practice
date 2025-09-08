import { HttpContext } from '@adonisjs/core/http'

export default class ErrorService {
  /**
   * Formats error objects or arrays into a consistent structure for further processing.
   * @example
   * formatErrors([{ message: 'Error occurred', rule: 'required', field: 'email' }])
   * Returns the same array if the input is an array.
   * @param {any} errors - Error or array of errors to be formatted.
   * @returns {Array} An array of error objects with message, rule, and field properties.
   * @description
   *   - Converts a non-array error input into an array with a single formatted error object.
   *   - Default values for 'rule' and 'field' are 'unknown' if they are not present in the input.
   *   - The function assumes error input might not always follow a specific structure.
   */

  private static formatErrors(errors: any) {
    if (Array.isArray(errors)) {
      return errors
    }

    return [
      {
        message: errors.message || errors,
        rule: errors.rule || 'unknown',
        field: errors.field || 'unknown',
      },
    ]
  }

  /**
   * Handles validation-related errors and returns a formatted response.
   * @example
   * ErrorService.handleValidationError(ctx, error)
   * Returns a 200 response with validation error details.
   * @param {HttpContext} ctx - AdonisJS HTTP context containing request and response objects.
   * @param {any} error - The validation error object containing messages.
   * @returns {any} A JSON response with status, message, and formatted validation errors.
   * @description
   *   - Extracts and formats validation error messages.
   *   - Responds with HTTP 200 status and detailed error information.
   */

  public static handleValidationError(ctx: HttpContext, error: any) {
    const formattedErrors = this.formatErrors(error.messages)

    return ctx.response.status(200).json({
      status: false,
      message: 'Validation failure',
      errors: formattedErrors,
    })
  }

  /**
   * Handles database-related errors and returns a consistent error response.
   * @example
   * ErrorService.handleDatabaseError(ctx, error)
   * Returns a 200 response with a database error message.
   * @param {HttpContext} ctx - AdonisJS HTTP context containing request and response objects.
   * @param {any} error - The database error object or message string.
   * @returns {any} A JSON response with status, message, and formatted database errors.
   * @description
   *   - Formats and returns errors encountered during database operations.
   *   - Provides a safe and consistent output for database errors.
   */

  public static handleDatabaseError(ctx: HttpContext, error: any) {
    const formattedErrors = this.formatErrors(error.message || error)

    return ctx.response.status(200).json({
      status: false,
      message: 'Database error',
      errors: formattedErrors,
    })
  }

  /**
   * Handles authentication errors and responds with HTTP 401 status.
   * @example
   * ErrorService.handleAuthenticationError(ctx, error)
   * Returns a 401 response with authentication error details.
   * @param {HttpContext} ctx - AdonisJS HTTP context containing request and response objects.
   * @param {any} error - The authentication error object or message.
   * @returns {any} A JSON response with status, message, and formatted authentication errors.
   * @description
   *   - Formats and returns errors related to authentication failures.
   *   - Responds with an unauthorized status and details for the client.
   */

  public static handleAuthenticationError(ctx: HttpContext, error: any) {
    const formattedErrors = this.formatErrors(error.message || error)

    return ctx.response.status(401).json({
      status: false,
      message: 'Authentication error',
      errors: formattedErrors,
    })
  }

  /**
   * Handles generic or unknown errors in the system.
   * @example
   * ErrorService.handleGenericError(ctx, error)
   * Returns a 200 response with a generic error message.
   * @param {HttpContext} ctx - AdonisJS HTTP context containing request and response objects.
   * @param {any} error - The error object or message to be handled.
   * @returns {any} A JSON response with status, message, and formatted error details.
   * @description
   *   - Provides a fallback error handler for unexpected cases.
   *   - Ensures consistent error output format.
   */

  public static handleGenericError(ctx: HttpContext, error: any) {
    const formattedErrors = this.formatErrors(error.message || 'An unexpected error occurred')

    return ctx.response.status(200).json({
      status: false,
      message: 'Something went wrong',
      errors: formattedErrors,
    })
  }

  /**
   * Handles errors based on their type and executes the appropriate error handling function.
   * @example
   * handleError(ctx, error)
   * Error handling response based on error code.
   * @param {HttpContext} ctx - Context object containing the request and response.
   * @param {any} error - Error object which includes an error code to differentiate error types.
   * @returns {any} Returns the result of the specific error handling function, or a generic error handling response.
   * @description
   *   - Differentiates errors by their error code.
   *   - Calls a specific error handler function based on the provided error code.
   *   - Falls back to a generic error handler if the error code does not match predefined types.
   */

  public static handleError(ctx: HttpContext, error: any) {
    if (error.code === 'E_VALIDATION_ERROR') {
      return this.handleValidationError(ctx, error)
    }

    if (error.code === 'E_AUTHENTICATION_ERROR') {
      return this.handleAuthenticationError(ctx, error)
    }

    if (error.code === 'E_DATABASE_ERROR') {
      return this.handleDatabaseError(ctx, error)
    }

    return this.handleGenericError(ctx, error)
  }
}
