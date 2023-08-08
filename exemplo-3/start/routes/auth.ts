/* eslint-disable prettier/prettier */
import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'

Route.post('/login', async ({ auth, request, response }) => {
  const { email, password } = request.only(['email', 'password'])

  try {
    const user = await User.findBy('email', email)

    const token = await auth
      .use('api')
      .attempt(email, password, { expiresIn: '4 hours', name: user?.serialize().email })

    return { user: { name: user?.name, email: user?.email, id: user?.id, token: token.token } }
  } catch (err) {
    return response.badRequest('Invalid credentials')
  }
})

Route.post('/logout', async ({ auth }) => {
  await auth.use('api').revoke()

  return {
    revoked: true,
  }
})

Route.get('/profile', async ({ auth }) => {
  await auth.use('api').authenticate()
  const user = auth.use('api').user!

  return {
    user,
  }
})
