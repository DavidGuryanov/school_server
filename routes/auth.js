import express from 'express'
import * as authController from '../controllers/authConstroller.js'

const router = express.Router();
console.log(authController.register)

router.put('/register', authController.register)

router.put('/login', authController.login)

export default router