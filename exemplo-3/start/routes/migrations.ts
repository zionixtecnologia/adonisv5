/* eslint-disable prettier/prettier */

import Route from '@ioc:Adonis/Core/Route'
import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'
import Migrator from '@ioc:Adonis/Lucid/Migrator'

/**
 *  A rota /migration é responsável por atualizar as migrations
 *  sem a necessidade de rodar o comando node ace migration:run na shell
 */
Route.get('/migrations', async () => {
  const migrator = new Migrator(Database, Application, {
    direction: 'up',
    dryRun: false,
  })

  await migrator.run()
  return migrator.migratedFiles
})
Route.get('/migrations/check', async () => {
  const migrator = new Migrator(Database, Application, { dryRun: false, direction: 'up' })

  const migrations = await migrator.getList()
  return migrations
})
