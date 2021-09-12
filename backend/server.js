import express from 'express'

const app = express()
const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV || 'dev'

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome To Resume Builder API' })
})

app.listen(PORT, () =>
  console.log(`Server is running in ${NODE_ENV} environment on port ${PORT}`)
)
