/* eslint-disable no-console*/

import { env } from './environment'
import { MongoClient, ServerApiVersion } from 'mongodb'

// Khởi tạo 1 đối tượng trelloDatabaseInstance ban đầu là null
let trelloDatabaseInstance = null
// Khởi tạo một đối tượng Client Instance để connect tới MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi : {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true }
})

// Đóng kết nối tới Database khi cần
export const CLOSE_DB = async() => {
  await mongoClientInstance.close()
}

// Ket noi toi MongoDB
export const CONNECT_DB = async() => {
  // Gọi kết nối tới MongoDB Atlas với URI đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect()
  // Kết nối thành công thì lấy ra Database theo tên và gán ngược lại vào biến trelloDatabaseInstance ở trên
  trelloDatabaseInstance= mongoClientInstance.db(env.DATABASE_NAME)
}

// Sau khi connect thanh cong toi MongoDb thi su dung ham GET_DB export nhieu noi trong code
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to DB first')
  return trelloDatabaseInstance
}