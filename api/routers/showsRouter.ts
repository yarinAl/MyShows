import express from 'express'
import {
  getShow as getShowBLL,
  getShowSeasons as getShowSeasonsBLL,
  getShows as getShowsBLL,
} from '../BLL/showsBLL'

export const router = express.Router()

router.get('/', async (req, res) => {
  const shows = await getShowsBLL(Number(req.query.count))
  res.send(shows)
})

router.get('/:id', async (req, res) => {
  const shows = await getShowBLL(Number(req.params.id))
  res.send(shows)
})

router.get('/:id/seasons', async (req, res) => {
  const seasons = await getShowSeasonsBLL(Number(req.params.id))
  res.send(seasons)
})
