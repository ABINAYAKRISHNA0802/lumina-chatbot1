import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import chatRouter from './routes/chat'

const app = express()
const PORT = process.env.PORT ?? 3002

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
}))

app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/chat', chatRouter)

app.listen(PORT, () => {
  console.log(`Lumina server running on http://localhost:${PORT}`)
})
