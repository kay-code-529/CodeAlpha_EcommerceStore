const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())

app.use('/api/products', require('./routes/products'))
app.use('/api/orders',   require('./routes/orders'))

const PORT = process.env.PORT || 3000

// Local dev only — Vercel imports the exported app as a serverless function
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

module.exports = app