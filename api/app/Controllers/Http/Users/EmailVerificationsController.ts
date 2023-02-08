import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class EmailVerificationsController {
  public async confirm({ response, request, params }: HttpContextContract) {
    if (request.hasValidSignature()) {
      const user = await User.findByOrFail('email', params.email)
      if (!user.isActivated) {
        user.email_verified_at = DateTime.local()
        user.isActivated = true
        user.save()
        return response.status(202).send({ message: 'Account verified and activated' })
      } else {
        return response.status(409).send({ message: 'Account was already verified' })
      }
    } else {
      return response.status(403).send({ error: { message: 'Invalid token' } })
    }
  }
}
