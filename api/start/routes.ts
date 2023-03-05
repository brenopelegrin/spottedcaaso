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
import Comment from 'App/Models/Comment'
import AnonPost from 'App/Models/AnonPost'
import User from 'App/Models/User'

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest({ report: report })
})

Route.group(() => {
  Route.post('spotted', async ({ request, response }) => {
    const validations = await schema.create({
      text: schema.string([rules.maxLength(1024)]),
    })
    try {
      const data = await request.validate({ schema: validations })
      const newPost = await AnonPost.create({
        text: data.text,
      })
      response.send({ created: true, post: await AnonPost.find(newPost.id) })
    } catch (error) {
      response.badRequest({ errors: error.messages })
    }
  })
  Route.get('/spotted/:id', async ({ request, response }) => {
    const id = await request.params().id
    try {
      const desiredPost = await AnonPost.findOrFail(id)
      response.send({ post: desiredPost })
    } catch (error) {
      response.badRequest({ errors: error.messages })
    }
  })
  Route.get('feed', async ({ response }) => {
    const allPosts = await AnonPost.all()
    response.send({ posts: JSON.parse(JSON.stringify(allPosts)) })
  })
}).prefix('api/v1/unprotected')

Route.group(() => {
  Route.get('health', async ({ auth, response }) => {
    if (await auth.use('api').check()) {
      response.send({ authenticated: true })
    } else {
      response.send({ authenticated: false })
    }
  })
  Route.get('feed', async ({ auth, response }) => {
    if (await auth.use('api').check()) {
      const allPosts = await Post.query()
        .preload('comments', (commentQuery) => {
          commentQuery.preload('user')
        })
        .preload('user')
      response.send({ posts: JSON.parse(JSON.stringify(allPosts)) })
    } else {
      response.send({ authenticated: false })
    }
  })
  Route.get('/spotted/:id', async ({ request, response }) => {
    const id = await request.params().id
    try {
      const desiredPost = await Post.findOrFail(id)
      const authorUser = await User.findOrFail(desiredPost?.id)
      response.send({ post: desiredPost, user: authorUser })
    } catch (error) {
      response.badRequest({ errors: error.messages })
    }
  })
  Route.post('/spotted/:postId/comment', async ({ auth, request, response }) => {
    const id = await request.params().postId
    const validations = await schema.create({
      text: schema.string([rules.maxLength(1024)]),
    })

    try {
      // get current User object from authentication
      const currentUser = await User.findOrFail(auth.user?.id)

      // get Post object from postId param on URL
      const data = await request.validate({ schema: validations })
      const desiredPost = await Post.findOrFail(id)

      // create new comment related to the Post object and associate current User with it
      const newComment = await desiredPost.related('comments').create({ text: data.text })
      await newComment.related('user').associate(currentUser)

      response.send({ created: true, comment: await Comment.find(newComment.id) })
    } catch (error) {
      response.badRequest({ errors: error.messages })
    }
  })
  Route.post('/spotted', async ({ auth, request, response }) => {
    const validations = await schema.create({
      text: schema.string([rules.maxLength(1024)]),
    })
    try {
      const data = await request.validate({ schema: validations })
      const newPost = await auth.user?.related('posts').create({
        text: data.text,
      })
      response.send({ created: true, post: await Post.find(newPost?.id) })
    } catch (error) {
      response.badRequest({ errors: error.messages })
    }
  })
})
  .prefix('api/v1/protected')
  .middleware('auth')

Route.group(() => {
  // registration logic
  Route.post('register', 'Users/AuthController.register').as('register')
  Route.post('login', 'Users/AuthController.login').as('login')
  Route.post('logout', 'Users/AuthController.logout').as('logout')
  Route.get('/verify-email/:email', 'Users/EmailVerificationsController.confirm').as('verifyEmail')
  Route.post('/resend', 'Users/AuthController.resend').as('resend')
}).prefix('api/v1/auth/')
