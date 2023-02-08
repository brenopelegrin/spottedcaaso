import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable()
      table.string('username', 255).notNullable().unique()
      table.string('avatar').nullable()
      table.dateTime('email_verified_at').nullable()
      table.boolean('is_activated').notNullable().defaultTo(false)
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()

      table.index(['id', 'username'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
