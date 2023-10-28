import express from 'express'
import { getShows as getShowsBLL } from '../BLL/showsBLL'

export const router = express.Router()

router.get('/', async (req, res) => {
  const shows = await getShowsBLL()
  res.send(shows)
})
