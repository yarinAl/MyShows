import express from 'express'
import { getSearchResults as getSearchResultsBLL } from '../BLL/searchBLL'

export const router = express.Router()

router.get('/:id', async (req, res) => {
  const shows = await getSearchResultsBLL(req.params.id)
  res.send(shows)
})

// router.get('/shows', async (req, res) => {
//   var q = req.query.q
//   if (typeof q !== 'string') {
//     // If it's not a string, you can try to convert it
//     q = String(q)
//   }
//   let n = res.json({
//     q,
//   })
//   console.log(q)
//   const shows = await getSearchResultsBLL(q)
//   res.send(shows)
// })
