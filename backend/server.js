import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

import users from './routes/users.js'

dotenv.config()
connectDB()
const app = express()
const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV || 'dev'

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome To Resume Builder API' })
})

app.use('/api/v1/users', users)

app.listen(PORT, () =>
  console.log(`Server is running in ${NODE_ENV} environment on port ${PORT}`)
)
