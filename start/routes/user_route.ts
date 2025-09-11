import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/users_controller')
import db from '@adonisjs/lucid/services/db'

router
  .group(() => {
    router.get('/listing', [UsersController, 'allUser'])
    router.get('/:id', [UsersController, 'show'])
    router.post('/', [UsersController, 'create'])
    router.patch('/:id', [UsersController, 'update'])
    router.delete('/:id', [UsersController, 'delete'])
  })
  .prefix('/api/user')

// Test route to verify database connection and query execution
router.get('/debug-test', async () => {
  // Simple select query
  const users = await db.query().from('users').select('*')
  return users
})
