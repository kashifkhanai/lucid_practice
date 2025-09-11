import AuditLog from '#models/audit_log'

/**
 * Sanitize sensitive fields from payload
 */
export const sanitizePayload = (payload: any, maskFields: string[] = ['password']): any => {
  const sanitized = { ...payload }
  maskFields.forEach((field) => {
    if (field in sanitized) sanitized[field] = '[REDACTED]'
  })
  return sanitized
}

/**
 * Create audit log inside a transaction
 */
export const logAudit = async (
  trx: any,
  action: string,
  actorId: number | undefined,
  targetId: number,
  payload: any,
  meta: string
) => {
  try {
    await AuditLog.create(
      {
        action,
        actorId: actorId || null,
        targetId,
        changes: { after: sanitizePayload(payload) },
        meta,
      },
      { client: trx }
    )
  } catch (error: any) {
    throw new Error(`Audit log failed: ${error.message}`)
  }
}
