import router from '@adonisjs/core/services/router'
const SchoolsController = () => import('#controllers/schools_controller')

router
  .group(() => {
    router.get('/', [SchoolsController, 'index'])
    router.post('/', [SchoolsController, 'store'])
    router.get('/:id', [SchoolsController, 'show'])
    router.put('/:id', [SchoolsController, 'update'])
    router.delete('/:id', [SchoolsController, 'destroy'])
  })
  .prefix('/api/school')
