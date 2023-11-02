import express from 'express'
import { getEpisode } from '../BLL/episodesBLL'

export const router = express.Router()

router.get('/:id', async (req, res) => {
  const episode = await getEpisode(Number(req.params.id))
  res.send(episode)
})
