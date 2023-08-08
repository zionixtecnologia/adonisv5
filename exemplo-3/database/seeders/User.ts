import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        name: 'Pablo George',
        email: 'pablogeokar@hotmail.com',
        password: '123456',
      },
      {
        name: 'Zionix',
        email: 'zionixtecnologia@gmail.com',
        password: '123456',
      },
    ])
  }
}
