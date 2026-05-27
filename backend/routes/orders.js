const express = require('express')
const router = express.Router()
const supabase = require('../supabase')

router.post('/', async (req, res) => {
  const { user_id, cart_items, total_price } = req.body

  try {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{ user_id, total_price, status: 'pending' }])
      .select()
      .single()

    if (orderError) return res.status(500).json({ error: orderError.message })

    const items = cart_items.map(item => ({
      order_id:   order.id,
      product_id: item.product_id,
      quantity:   item.quantity,
      price:      item.price
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(items)

    if (itemsError) return res.status(500).json({ error: itemsError.message })

    res.json({ success: true, order_id: order.id })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router