import express from 'express'
// const User = require('../models/user')
import { newUser } from '../BLL/registerBLL'

export const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const registeredUser = await newUser(req.body)
    res.status(200).send(registeredUser)
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error')
  }
})
