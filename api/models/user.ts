import mongoose from 'mongoose'

// export interface User {
//   id: number
//   name: string
//   email: string
//   password: string
// }
const Schema = mongoose.Schema
const userSchema = new Schema({
  // id: String,
  name: String,
  email: String,
  password: String,
})

export default mongoose.model('user', userSchema, 'users')
