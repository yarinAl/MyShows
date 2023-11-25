import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { router as episodeRouter } from './routers/episodesRouter'
import { router as loginRouter } from './routers/loginRouter'
import { router as registerRouter } from './routers/registerRouter'
import { router as searchRouter } from './routers/searchRouter'
import { router as seasonRouter } from './routers/seasonsRouter'
import { router as showsRouter } from './routers/showsRouter'

dotenv.config()
const app = express()
const port = 3000

app.use(express.json())
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

app.use('/login', loginRouter)

app.use('/register', registerRouter)

//connect to db
mongoose
  .connect(process.env.MONG_URI ?? '')
  .then(() => {})
  .catch((error) => {
    console.log(error)
  })

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
