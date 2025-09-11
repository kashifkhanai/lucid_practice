// practice for AdonisJS Lucid ORM - Insert & Other Queries
import db from '@adonisjs/lucid/services/db'
import User from '#models/user'

async function runMysqlQueries() {
  try {
    console.log('=== User Insert & Other Query Practice ')

    // 1. Insert single row
    const insertedUser = await User.create({
      email: 'single_mysql@example.com',
      password: 'password123',
      fullName: 'Single Insert MySQL',
    })
    console.log('1. Insert single row:', insertedUser.toJSON())

    // 2. Multi Insert
    const multiInsertedUsers = await User.createMany([
      {
        email: 'multi1_mysql@example.com',
        password: 'pass123',
        fullName: 'Multi Insert 1 MySQL',
      },
      {
        email: 'multi2_mysql@example.com',
        password: 'pass456',
        fullName: 'Multi Insert 2 MySQL',
      },
    ])
    console.log(
      '2. Multi Insert:',
      multiInsertedUsers.map((u) => u.toJSON())
    )

    // 3. Insert using Query Builder
    const inserted = await db.table('users').insert({
      email: 'qb_mysql@example.com',
      password: 'querybuilder123',
      full_name: 'QB Insert MySQL',
    })
    console.log('3. Insert with Query Builder (returns insert id):', inserted)

    // 4. Debug (prints raw SQL in console)
    console.log('4. Debug mode example:')
    await db.table('users').debug(true).insert({
      email: 'debug_mysql@example.com',
      password: 'debug123',
      full_name: 'Debug Example MySQL',
    })

    // 5. Timeout
    console.log('5. Timeout example:')
    try {
      await db
        .from('users')
        .timeout(10) // 10 ms
        .whereRaw('SLEEP(1)') // MySQL delay
    } catch (timeoutErr: unknown) {
      if (timeoutErr instanceof Error) {
        console.error('Timeout triggered as expected:', timeoutErr.message)
      } else {
        console.error('Timeout triggered:', timeoutErr)
      }
    }

    // 6. toSQL (returns SQL string with placeholders)
    const sqlQuery = User.query().where('id', '>', 0).toSQL()
    console.log('6. toSQL:', sqlQuery.sql)

    // 7. toQuery (returns final SQL with bindings applied)
    const builtQuery = User.query().where('id', '>', 0).toQuery()
    console.log('7. toQuery:', builtQuery)

    console.log('\n=== Insert & Other Queries (MySQL, No Status) Completed ===')
  } catch (error) {
    console.error('Error in MySQL queries:', error)
  }
}

// Run queries
runMysqlQueries()
