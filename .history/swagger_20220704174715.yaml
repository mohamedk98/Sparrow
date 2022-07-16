/
  @swagger
  tags:
    name: Books
    description: API to manage your books.
 /

/
  @swagger
  path:
   /books/:
     post:
       summary: Creates a new book
       tags: [Books]
       requestBody:
         required: true
         content:
           application/json:
             schema:
               $ref: '#/components/schemas/Book'
       responses:
         "200":
           description: The created book.
           content:
             application/json:
               schema:
                 $ref: '#/components/schemas/Book'
 /