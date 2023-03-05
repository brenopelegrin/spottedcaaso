import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, hasMany, HasMany, BaseModel } from '@ioc:Adonis/Lucid/Orm'

import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import Post from './Post'
import Comment from './Comment'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public email: string

  @column()
  public username: string

  @column()
  public name: string

  @column()
  public avatar: string

  @column()
  public isActivated: boolean = false

  @column.dateTime({ serializeAs: null })
  public email_verified_at: DateTime

  @column({ serializeAs: null })
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  public async sendVerificationEmail() {
    const appDomain = Env.get('APP_URL')
    const appName = Env.get('APP_NAME')
    const currentYear = new Date().getFullYear()
    const url = Route.builder()
      .params({ email: this.email })
      .prefixUrl(appDomain)
      .makeSigned('verifyEmail', { expiresIn: '24hours' })
    await Mail.send((message) => {
      message
        .from(Env.get('DEFAULT_FROM_EMAIL'))
        .to(this.email)
        .subject('Please verify your email')
        .htmlView('emails/auth/verify', { user: this, url, appName, appDomain, currentYear })
    })
  }
}
