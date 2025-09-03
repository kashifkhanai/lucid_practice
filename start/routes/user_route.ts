import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/users_controller')

router
  .group(() => {
    router.get('/listing', [UsersController, 'allUser'])
    router.get('/:id', [UsersController, 'show'])
    router.post('/', [UsersController, 'create'])
    router.patch('/:id', [UsersController, 'update'])
    router.delete('/:id', [UsersController, 'delete'])
  })
  .prefix('/api/user')
