/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'

Route.post('/login', async ({ auth, request, response }) => {
  const { email, password } = request.only(['email', 'password'])

  try {
    const user = await User.findBy('email', email)
    const token = await auth
      .use('api')
      .attempt(email, password, { expiresIn: '4 hours', name: user?.serialize().email })

    return { token, user: { email: user?.email, id: user?.id } }
  } catch (err) {
    return response.badRequest('Invalid credentials')
  }
})

Route.post('/logout', async ({ auth, request }: HttpContextContract) => {
  await auth.use('api').revoke()

  return {
    revoked: true,
  }
})
