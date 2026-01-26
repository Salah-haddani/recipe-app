# Recipe App Specifications

> MEAN stack application for recipes management. User can check a variaty of recipes. Publishers can create their own recipes and publish it to be seen by all users.

#

## Backend

These are the technologies to be used :

NodeJS | Express & JWT | MongoDB(Mongoose)
--- | --- | ---

### Users & Authentication
- Authentication using JWT
- User registration
  * Register as a "user" or "publisher"
  * Passwords must be hashed
- User login
  * User can login with email and password
- User logout
- Get user
  * Route to get the currently logged in user
- Users can only be made admin by updating the database field manually

### Recipes
- List all recipes in the database
   * Filter by fields
- Get single recipe
- Create new recipe
  * Authenticated users only
  * Must have the role "publisher"
- Upload a photo for recipe
  * Owner only
- Update recipe
  * Owner only
- Delete recipe
  * Owner only

### Security
- Encrypt passwords
- Prevent NoSQL injections
- Add headers for security (helmet)
- Prevent cross site scripting - XSS
- Protect against http param polution
- Use cors to make API public to certain origins

#
## Frontend
These are the technologies to be used :
Angular | Bootstrap
--- | ---


These are the pages that will be in the application:
### Authentication
- Login
- Register

### Home
- List of all recipes published
- Filtering recipes

### Details
- All infos of recipe clicked

### MyKitchen
- Create and publish a recipe
    * Must be authenticated and has the role 'publisher' or 'admin'
- Update a recipe
    * Owner only
- Delete a recipe
    * Owner only

### About
- Description of service provided by the application...
#