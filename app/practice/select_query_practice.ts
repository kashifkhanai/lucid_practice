import Database from '@ioc:Adonis/Lucid/Database'

async function main() {
  // 1. Select all columns
  const allUsers = await Database.from('users').select('*')
  console.log('All Users:', allUsers)

  // 2. Select specific columns
  const userColumns = await Database.from('users').select('id', 'email')
  console.log('Specific Columns:', userColumns)

  // 3. Where clause
  const whereUser = await Database.from('users').where('id', 1).first()
  console.log('Where User:', whereUser)

  // 4. OR Where
  const orWhereUser = await Database.from('users')
    .where('id', 1)
    .orWhere('email', 'test@example.com')
    .first()
  console.log('OR Where User:', orWhereUser)

  // 5. Order by
  const orderedUsers = await Database.from('users').orderBy('created_at', 'desc')
  console.log('Ordered Users:', orderedUsers)

  // 6. Limit & Offset
  const limitedUsers = await Database.from('users').limit(5).offset(0)
  console.log('Limited Users:', limitedUsers)

  // 7. Group By & Having
  const groupedUsers = await Database.from('users')
    .select('status')
    .count('* as total')
    .groupBy('status')
    .having('total', '>', 1)
  console.log('Grouped Users:', groupedUsers)

  // 8. Joins
  const joinedUsers = await Database.from('users')
    .join('orders', 'users.id', 'orders.user_id')
    .select('users.id', 'users.email', 'orders.id as orderId')
  console.log('Joined Users:', joinedUsers)

  // 9. Distinct
  const distinctStatuses = await Database.from('users').distinct('status')
  console.log('Distinct Statuses:', distinctStatuses)

  // 10. Aggregates
  const totalUsers = await Database.from('users').count('* as total')
  const avgId = await Database.from('users').avg('id as avgId')
  console.log('Total Users:', totalUsers)
  console.log('Average ID:', avgId)

  // 11. Raw Query
  const rawQuery = await Database.raw('SELECT * FROM users WHERE status = ?', ['active'])
  console.log('Raw Query Result:', rawQuery)

  // 12. SubQuery
  const subQueryUsers = await Database.from('users')
    .select('id', 'email')
    .whereIn('id', Database.from('orders').select('user_id').where('status', 'completed'))
  console.log('SubQuery Users:', subQueryUsers)

  // 13. Pagination
  const paginatedUsers = await Database.from('users').select('*').paginate(1, 5)
  console.log('Paginated Users:', paginatedUsers)

  // 14. Debug
  const debugQuery = Database.from('users').select('*').debug()
  console.log('Debug Query:', debugQuery)

  // 15. ToSQL
  const toSQLQuery = Database.from('users').select('*').toSQL()
  console.log('Generated SQL:', toSQLQuery.sql)
}

main()
