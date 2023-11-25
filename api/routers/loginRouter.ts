import express from 'express'
import { login } from '../BLL/loginBLL'

export const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const user = await login(req.body)

    if (!user) {
      res.status(401).send('Invalid email!')
    } else if (user.password !== req.body.password) {
      res.status(401).send('Invalid password')
    } else {
      res.status(200).send(user)
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})
