import express from 'express'
import { getSeasonEpisodes as getSeasonEpisodesBLL } from '../BLL/seasonsBLL'

export const router = express.Router()

router.get('/:id/episodes', async (req, res) => {
  const episodes = await getSeasonEpisodesBLL(Number(req.params.id))
  res.send(episodes)
})
