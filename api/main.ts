import cors from 'cors'
import express from 'express'
import { router as episodeRouter } from './routers/episodesRouter'
import { router as searchRouter } from './routers/searchRouter'
import { router as seasonRouter } from './routers/seasonsRouter'
import { router as showsRouter } from './routers/showsRouter'

const app = express()
const port = 3000

// app.use(express.json())
app.use(cors())

app.use('/home', () => {
  // get all shows
})

app.use('/watch/:id', () => {
  // get show
})

app.use('/shows', showsRouter)

app.use('/seasons', seasonRouter)

app.use('/episodes', episodeRouter)

app.use('/search', searchRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
