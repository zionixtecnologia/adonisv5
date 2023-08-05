/* eslint-disable prettier/prettier */

import Route from '@ioc:Adonis/Core/Route'
import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'
import Migrator from '@ioc:Adonis/Lucid/Migrator'

/**
 *  a rota /migration é responsável por atualizar as migrations
 *  sem a necessidade de rodar o comando node ace migration:run na shell
 */
Route.get('/migration', async () => {
  const migrator = new Migrator(Database, Application, {
    direction: 'up',
    dryRun: false,
  })

  await migrator.run()
  return migrator.migratedFiles
})
Route.get('/migration/check', async () => {
  const migrator = new Migrator(Database, Application, { dryRun: false, direction: 'up' })

  const migrations = await migrator.getList()
  return migrations
})
