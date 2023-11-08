import express from 'express'
import { getSearchResults as getSearchResultsBLL } from '../BLL/searchBLL'

export const router = express.Router()

router.get('/', async (req, res) => {
  const shows = await getSearchResultsBLL(`${req.query.q}`)
  res.send(shows)
})
