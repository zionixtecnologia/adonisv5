import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path'

import Moment from 'App/Models/Moment'
import Application from '@ioc:Adonis/Core/Application'

export default class MomentsController {
  private validationOptions = {
    types: ['image'],
    size: '2mb',
  }

  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    const image = request.file('image', this.validationOptions)

    if (image) {
      const imageName = `${uuidv4()}.${image.extname}`

      await image.move(Application.tmpPath('uploads'), {
        name: imageName,
      })

      body.image = imageName
    }

    const moment = await Moment.create(body)

    response.status(201)

    return {
      message: 'Momento criado com sucesso',
      data: moment,
    }
  }

  public async index() {
    const moments = await Moment.all()

    return {
      data: moments,
    }
  }

  public async show({ params }: HttpContextContract) {
    const moment = await Moment.findOrFail(params.id)

    return {
      data: moment,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const moment = await Moment.findOrFail(params.id)

    // exclui a imagem anterior
    if (moment.image) {
      const pathImage = path.join(Application.tmpPath('uploads', moment.image))
      if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage)
      }
    }

    await moment.delete()

    return {
      message: 'Momento excluído com sucesso!',
      data: moment,
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()

    const moment = await Moment.findOrFail(params.id)

    moment.title = body.title
    moment.description = body.description

    if (moment.image !== body.image || !moment.image) {
      const image = request.file('image', this.validationOptions)

      if (image) {
        const imageName = `${uuidv4()}.${image.extname}`

        // exclui a imagem anterior
        if (moment.image) {
          const pathImage = path.join(Application.tmpPath('uploads', moment.image))
          if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage)
          }
        }

        // faz o upload da imagem
        await image.move(Application.tmpPath('uploads'), {
          name: imageName,
        })

        moment.image = imageName
      }
    }

    await moment.save()
    return {
      message: 'Momento atualizado com sucesso!',
      data: moment,
    }
  }
}
