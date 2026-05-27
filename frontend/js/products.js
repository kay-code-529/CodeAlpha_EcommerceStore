const grid = document.getElementById('products-grid')

const API_BASE = ['localhost', '127.0.0.1'].includes(location.hostname)
  ? 'http://localhost:3000'
  : ''

async function loadProducts() {
  const response = await fetch(`${API_BASE}/api/products`)
  const products = await response.json()

  products.forEach(product => {
    const card = document.createElement('div')
    card.classList.add('product-card')
    card.innerHTML = `
      <img src="${product.image_url || ''}" alt="${product.name}"
        onerror="this.onerror=null; this.src='https://placehold.co/240x200?text=No+Image'" />
      <div class="product-card-body">
        <h3>${product.name}</h3>
        <p class="price">$${product.price}</p>
        <p class="stock">In stock: ${product.stock}</p>
        <button onclick="event.stopPropagation(); addToCart(${product.id})">
          🛒 Add to Cart
        </button>
      </div>
    `
    card.addEventListener('click', () => {
      window.location.href = `product.html?id=${product.id}`
    })
    grid.appendChild(card)
  })
}

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]')
  cart.push(productId)
  localStorage.setItem('cart', JSON.stringify(cart))
  alert('Added to cart!')
}

loadProducts()