/* eslint-disable no-console*/
import express from 'express'
import { env } from './config/environment'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import exitHook from 'async-exit-hook'
import { APIs_V1 } from '~/routes/v1/index'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()

  app.use(express.json())

  app.use( '/v1', APIs_V1 )

  app.use(errorHandlingMiddleware)
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello ${env.AUTHOR}, I am running at ${ env.APP_HOST }:${ env.APP_PORT }/` )
  })
  exitHook( () => {
    CLOSE_DB()
  })
}

CONNECT_DB()
  .then(() => console.log('connect db '))
  .then(() => START_SERVER())
  .catch(error => {
    console.error(error)
    process.exit(0)
  })

