/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const BooksController = () => import('#controllers/books_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

import '#start/routes/user_route'
// import BooksController from '#controllers/books_controller'
router.resource('books', BooksController)
