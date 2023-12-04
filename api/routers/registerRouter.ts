import express from 'express'
// const User = require('../models/user')
import { sign } from 'jsonwebtoken'
import { newUser } from '../BLL/registerBLL'

export const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const registeredUser = await newUser(req.body)
    let payload = { subject: registeredUser._id }
    let token = sign(payload, 'secretKey')
    res.status(200).send({ token })
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
})
