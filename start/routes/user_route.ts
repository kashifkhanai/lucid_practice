import router from '@adonisjs/core/services/router'
import db from '@adonisjs/lucid/services/db'

const UsersController = () => import('#controllers/users_controller')

// 🧑‍💻 Users routes
router
  .group(() => {
    router.get('/listing', [UsersController, 'allUser'])
    router.get('/:id', [UsersController, 'show'])
    router.post('/', [UsersController, 'create'])
    router.patch('/:id', [UsersController, 'update'])
    router.delete('/:id', [UsersController, 'delete'])
  })
  .prefix('/api/user')

// Switching test route
router.get('/api/test/switch-test', async ({ response }) => {
  const results: any = {}

  // Query MySQL
  results.mysql = await db.connection('mysql').rawQuery('SELECT NOW() as now')

  // Query PostgreSQL
  results.pg = await db.connection('pg').rawQuery('SELECT NOW() as now')

  return response.json({
    message: 'Connection switching test successful',
    mysql_time: results.mysql[0][0].now,
    pg_time: results.pg.rows[0].now,
  })
})
