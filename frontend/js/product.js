const detail = document.getElementById('product-detail')

const API_BASE = ['localhost', '127.0.0.1'].includes(location.hostname)
  ? 'http://localhost:3000'
  : ''

async function loadProduct() {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')

  if (!id) {
    detail.innerHTML = '<p>No product selected. <a href="index.html">Go back</a></p>'
    return
  }

  const response = await fetch(`${API_BASE}/api/products/${id}`)
  const product = await response.json()

  detail.innerHTML = `
    <div style="display:flex; gap:40px; flex-wrap:wrap; padding:32px">
      <img src="${product.image_url}"
        style="width:350px; height:350px; object-fit:cover; border-radius:12px"/>
      <div>
        <h2>${product.name}</h2>
        <p style="color:#666; margin-top:10px">${product.description}</p>
        <h3 style="color:#6366f1; margin-top:16px">$${product.price}</h3>
        <p style="margin-top:8px">In stock: ${product.stock}</p>
        <button onclick="addToCart(${product.id})"
          style="margin-top:20px; width:200px">
          Add to Cart
        </button>
        <br/>
        <a href="index.html"
          style="display:inline-block; margin-top:12px; color:#6366f1">
          ← Back to products
        </a>
      </div>
    </div>
  `
}

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]')
  cart.push(productId)
  localStorage.setItem('cart', JSON.stringify(cart))
  alert('Added to cart!')
}

loadProduct()