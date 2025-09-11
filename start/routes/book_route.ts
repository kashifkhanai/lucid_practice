import router from '@adonisjs/core/services/router'
const BooksController = () => import('#controllers/books_controller')

router
  .group(() => {
    router.get('/', [BooksController, 'index'])
    router.post('/', [BooksController, 'store'])
  })
  .prefix('/api/books')

//.......................................................................
/* you can test the above routes using curl or postman
1. List all books (recent first):
   GET http://localhost:3333/api/books

2. List books by year:
   GET http://localhost:3333/api/books?year=2020

3. List books by author:
   GET http://localhost:3333/api/books?author=John%20Doe

4. List books by year and author:
   GET http://localhost:3333/api/books?year=2020&author=John%20Doe

5. Create a new book:
   POST http://localhost:3333/api/books
   Body (JSON):
   {
     "bookTitle": "New Book",
     "authorName": "Jane Smith",
     "publishYear": 2021
   }
*/
