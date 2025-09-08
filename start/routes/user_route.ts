import router from '@adonisjs/core/services/router'
import db from '@adonisjs/lucid/services/db'
const UsersController = () => import('#controllers/users_controller')

// Existing Users routes
router
  .group(() => {
    router.get('/listing', [UsersController, 'allUser'])
    router.get('/:id', [UsersController, 'show'])
    router.post('/', [UsersController, 'create'])
    router.patch('/:id', [UsersController, 'update'])
    router.delete('/:id', [UsersController, 'delete'])
  })
  .prefix('/api/user')

// ✅ Pooling test route
router.get('/pool-test', async ({ response }) => {
  const promises = []

  // Test 20 concurrent queries for MySQL
  for (let i = 1; i <= 20; i++) {
    promises.push(db.connection('mysql').rawQuery('SELECT SLEEP(1)'))
    // PostgreSQL ke liye:
    // promises.push(db.connection('pg').rawQuery('SELECT pg_sleep(1)'))
  }

  const start = Date.now()
  await Promise.all(promises)
  const end = Date.now()

  return response.json({
    message: 'All queries completed',
    duration: end - start,
  })
})
