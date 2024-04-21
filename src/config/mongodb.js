/* eslint-disable no-console*/

import { env } from './environment'
import { MongoClient, ServerApiVersion } from 'mongodb'
let trelloDatabaseInstance = null

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi : {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true }
})
export const CLOSE_DB = async() => {await mongoClientInstance.close()}
// Ket noi toi MongoDB
export const CONNECT_DB = async() => {await mongoClientInstance.connect(); trelloDatabaseInstance= mongoClientInstance.db(env.DB_NAME)}
// Sau khi connect thanh cong toi MongoDb thi su dung ham GET_DB export nhieu noi trong code
export const GET_DB = () => {if (!trelloDatabaseInstance) throw new Error('Must connect to DB first') ;return trelloDatabaseInstance}