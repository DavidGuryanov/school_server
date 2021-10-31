import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  },
  courses: {
    type: Array,
    default: ['javascript']
  }
})

export default mongoose.model('User', userSchema)