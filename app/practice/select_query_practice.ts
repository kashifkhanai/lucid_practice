// practice for AdonisJS Lucid ORM - Select Queries
import db from '@adonisjs/lucid/services/db'
import User from '#models/user'

async function runUserQueries() {
  try {
    console.log('=== User Query Builder Practice ===\n')

    // 1. Select all columns
    const allUsers = await User.query().select('*')
    console.log('1. select(*):', allUsers.slice(0, 2))

    // 2. Select specific columns
    const userColumns = await User.query().select('id', 'email', 'fullName')
    console.log('2. select(specific columns):', userColumns.slice(0, 2))

    // 3. where clause(condition) example (id = 1)
    const userWhere = await User.query().where('id', 1).first()
    console.log('3. where(id=1):', userWhere)

    // 4. OR Where
    const userOr = await User.query().where('id', 1).orWhere('email', 'test@example.com').first()
    console.log('4. orWhere:', userOr)

    // 5. Order by
    const orderedUsers = await User.query().orderBy('createdAt', 'desc')
    console.log('5. orderBy(createdAt desc):', orderedUsers.slice(0, 2))

    // 6. Limit & Offset
    const limitedUsers = await User.query().limit(2).offset(1)
    console.log('6. limit & offset:', limitedUsers)

    // 7. Group By & Having (example: status)
    const groupedUsers = await User.query()
      .select('status')
      .count('* as total')
      .groupBy('status')
      .having('total', '>', 0)
    console.log('7. groupBy & having:', groupedUsers)

    // 8. Join example (assuming orders table exists)
    const joinedUsers = await User.query()
      .join('orders', 'users.id', 'orders.user_id')
      .select('users.id', 'users.email', 'orders.id as orderId')
    console.log('8. join users -> orders:', joinedUsers.slice(0, 2))

    // 9. Distinct
    const distinctStatuses = await User.query().distinct('status')
    console.log('9. distinct status:', distinctStatuses)

    // 10. Aggregates
    const totalUsers = await User.query().count('* as total')
    const avgId = await User.query().avg('id as avgId')
    console.log('10. count & avg:', { totalUsers: totalUsers[0], avgId: avgId[0] })

    // 11. Raw query
    const rawResult = await db.rawQuery('SELECT * FROM users WHERE status = ?', ['active'])
    console.log('11. rawQuery:', rawResult)

    // 12. SubQuery (users with completed orders)
    const subQuery = db.from('orders').select('user_id').where('status', 'completed')
    const usersWithCompletedOrders = await User.query().whereIn('id', subQuery)
    console.log('12. subQuery:', usersWithCompletedOrders.slice(0, 2))

    // 13. Pagination
    const paginatedUsers = await User.query().paginate(1, 2)
    console.log('13. paginate:', {
      total: paginatedUsers.total,
      perPage: paginatedUsers.perPage,
      currentPage: paginatedUsers.currentPage,
      data: paginatedUsers.all(),
    })

    // 14. Debug
    console.log('14. debug query (check console):')
    await User.query().debug(true).select('id', 'email').limit(1)

    // 15. ToSQL
    const sqlQuery = User.query().where('id', 1).toSQL()
    console.log('15. toSQL:', sqlQuery.sql)

    console.log('\n=== All User Query Examples Completed ===')
  } catch (error) {
    console.error('Error in queries:', error)
  }
}

// Run queries
runUserQueries()
