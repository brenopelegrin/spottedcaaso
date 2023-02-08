import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Event from '@ioc:Adonis/Core/Event'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    // validate email
    const validations = await schema.create({
      email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string({}, [rules.confirmed()]),
      username: schema.string({}, [rules.unique({ table: 'users', column: 'username' })]),
    })
    const data = await request.validate({ schema: validations })
    const newUser = await User.create(data)

    //newUser?.sendVerificationEmail()

    Event.emit('new:user', {
      newUser,
    })
    return response.created(newUser)
  }

  //   login function
  public async login({ request, response, auth }: HttpContextContract) {
    const password = await request.input('password')
    const email = await request.input('email')

    try {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '24hours',
      })
      return token.toJSON()
    } catch {
      return response
        .status(400)
        .send({ error: { message: 'User with provided credentials could not be found' } })
    }
  }

  //   logout function
  public async logout({ auth, response }: HttpContextContract) {
    if (await auth.use('api').check()) {
      await auth.logout()
      return response.status(200).send({ success: true, message: 'you were logged out' })
    } else {
      return response
        .status(400)
        .send({ success: false, message: 'you are not logged in or the token is invalid' })
    }
  }
}
