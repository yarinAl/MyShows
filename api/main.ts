import express from 'express'
import { router as showsRouter } from './routers/showsRouter'

const app = express()
const port = 3000

// app.use(express.json())

app.use('/shows', showsRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
