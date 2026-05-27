const cartDiv     = document.getElementById('cart-items')
const totalDiv    = document.getElementById('cart-total')
const checkoutBtn = document.getElementById('checkout-btn')
const orderMsg    = document.getElementById('order-msg')

let cartProducts = []

const API_BASE = ['localhost', '127.0.0.1'].includes(location.hostname)
  ? 'http://localhost:3000'
  : ''

async function loadCart() {
  const cartIds = JSON.parse(localStorage.getItem('cart') || '[]')

  if (cartIds.length === 0) {
    cartDiv.innerHTML = '<p>Your cart is empty. <a href="index.html">Shop now</a></p>'
    return
  }

  let total = 0
  cartProducts = []

  for (const id of cartIds) {
    const response = await fetch(`${API_BASE}/api/products/${id}`)

    if (!response.ok) continue

    const product = await response.json()

    if (!product || !product.name) continue

    total += parseFloat(product.price)
    cartProducts.push({ product_id: product.id, quantity: 1, price: product.price })

    const item = document.createElement('div')
    item.style = "display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid #eee"
    item.innerHTML = `
      <span>${product.name}</span>
      <span>$${product.price}</span>
    `
    cartDiv.appendChild(item)
  }

  if (cartProducts.length > 0) {
    totalDiv.textContent = `Total: $${total.toFixed(2)}`
    checkoutBtn.style.display = 'block'
  } else {
    cartDiv.innerHTML = '<p>Your cart is empty. <a href="index.html">Shop now</a></p>'
  }
}

async function checkout() {
  checkoutBtn.disabled = true
  checkoutBtn.textContent = 'Processing...'

  const total = cartProducts.reduce((sum, item) => sum + parseFloat(item.price), 0)

  try {
    const response = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id:     null,
        cart_items:  cartProducts,
        total_price: total.toFixed(2)
      })
    })

    const result = await response.json()

    if (result.success) {
      localStorage.removeItem('cart')
      cartDiv.innerHTML   = ''
      totalDiv.textContent = ''
      checkoutBtn.style.display = 'none'
      orderMsg.style.color = 'green'
      orderMsg.textContent = `✅ Order #${result.order_id} placed successfully! Thank you for shopping with us.`
    } else {
      orderMsg.style.color = 'red'
      orderMsg.textContent = 'Something went wrong: ' + (result.error || 'Please try again.')
      checkoutBtn.disabled = false
      checkoutBtn.textContent = 'Checkout'
    }

  } catch (err) {
    orderMsg.style.color = 'red'
    orderMsg.textContent = 'Network error: ' + err.message
    checkoutBtn.disabled = false
    checkoutBtn.textContent = 'Checkout'
  }
}

loadCart()