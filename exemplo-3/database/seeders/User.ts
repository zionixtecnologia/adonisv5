import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        email: 'pablogeokar@hotmail.com',
        password: '123456',
      },
      {
        email: 'zionixtecnologia@gmail.com',
        password: '123456',
      },
    ])
  }
}
