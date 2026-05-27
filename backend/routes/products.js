const express = require('express')
const router = express.Router()
const supabase = require('../supabase')

// GET all products
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')

    if (error) return res.status(500).json({ error: error.message })
    res.json(data)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET single product by id
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', req.params.id)
      .single()

    if (error) return res.status(404).json({ error: 'Product not found' })
    res.json(data)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router