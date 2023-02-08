/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import Post from 'App/Models/Post'
import User from 'App/Models/User'

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})

Route.group(() => {
  Route.get('feed', async ({ auth, response }) => {
    if (await auth.use('api').check()) {
      response.send({ authenticated: true })
    } else {
      response.send({ authenticated: false })
    }
  })
}).prefix('api/v1/protected')

Route.group(() => {
  // registration logic
  Route.post('register', 'Users/AuthController.register').as('register')
  Route.post('login', 'Users/AuthController.login').as('login')
  Route.post('logout', 'Users/AuthController.logout').as('logout')
  Route.get('/verify-email/:email', 'Users/EmailVerificationsController.confirm').as('verifyEmail')
}).prefix('api/v1/auth/')
