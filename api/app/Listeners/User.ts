import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import { EventsList } from '@ioc:Adonis/Core/Event'
import Route from '@ioc:Adonis/Core/Route'

export default class User {
  public async onNewUser({ newUser }: EventsList['new:user']) {
    const appDomain = Env.get('APP_URL')
    const appName = Env.get('APP_NAME')
    const defaultFromEmail = Env.get('DEFAULT_FROM_EMAIL')
    const currentYear = new Date().getFullYear()
    const url = Route.builder()
      .params({ email: newUser.email })
      .prefixUrl(appDomain)
      .makeSigned('verifyEmail', { expiresIn: '24hours' })
    await Mail.send((message) => {
      message
        .from(defaultFromEmail)
        .to(newUser.email)
        .subject('SpottedCAASO: verifique seu e-mail')
        .htmlView('emails/auth/verify', { user: newUser, url, appName, appDomain, currentYear })
    })
  }
}
