import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/test_user_controler')
const StudentsController = () => import('#controllers/students_controller')

router
  .group(() => {
    // Users routes
    router.get('/listing', [UsersController, 'allUser'])
    router.get('/:id', [UsersController, 'show'])
    router.post('/', [UsersController, 'create'])
    router.patch('/:id', [UsersController, 'update'])
    router.delete('/:id', [UsersController, 'delete'])
    router.post('/:id/profile', [UsersController, 'createProfile'])
    router.post('/:id/posts', [UsersController, 'createPost'])

    // Students & Courses routes
    router.post('/student', [StudentsController, 'store']) // Create student
    router.post('/course', [StudentsController, 'createCourse']) // Create course
    router.post('/student/:id/courses', [StudentsController, 'attachCourses']) // Attach courses
    router.get('/student/:id', [StudentsController, 'show']) // Show student with courses
    router.get('/course/:id/students', [StudentsController, 'courseStudents']) // Show course with students
  })
  .prefix('/api/relation')
