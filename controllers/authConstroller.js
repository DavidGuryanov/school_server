import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import dotenv from "dotenv"

dotenv.config()
console.log(process.env.JWTSECRET, ' here')

export const register = (req, res, next) => {
  let savedUser;
  const {email, userName, password} = req.body
  bcrypt.hash(password, 12)
    .then(hashedPass => {
      const user = new User({
        email,
        userName,
        password: hashedPass
      })
      savedUser = user
      return user.save()
    })
    .then(result => {
      res.status(201).json({message: 'User created', userId: savedUser._id})
    })
    .catch(err => {
      next(err)
    })
}

export const login = (req, res, next) => {
  const {email, password} = req.body
  let loadedUser
  User.findOne({email: email})
    .then(user => {
      if (!user) {
        throw new Error('No user with such email')
      }
      loadedUser = user
      return bcrypt.compare(password, user.password)
    })
    .then(isEqual => {
      if (!isEqual) {
        throw new Error('Wrong password')
      }
      const token = jwt.sign({
        email: loadedUser.email,
        userId: loadedUser._id.toString()
      }, process.env.JWTSECRET, {expiresIn: '1h'})
      res.status(200).json({token, userId: loadedUser._id.toString()})
    })

    .catch(err => next(err))
}