let cart = JSON.parse(localStorage.getItem('cart')) || [];

async function fetchProducts() {
  const res = await fetch('/api/products');
  return await res.json();
}

function addToCart(productId) {
  cart.push(productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Product added to cart!');
}

async function renderCart() {
  const cartList = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  if (!cartList || !cartTotal) return;

  const products = await fetchProducts();

  let total = 0;
  cartList.innerHTML = '';

  if (cart.length === 0) {
    cartList.innerHTML = '<li>Your cart is empty.</li>';
    cartTotal.textContent = '$0.00';
    return;
  }

  cart.forEach(id => {
    const product = products.find(p => p.id === id);
    if (product) {
      total += product.price;
      const li = document.createElement('li');
      li.textContent = `${product.name} - $${product.price.toFixed(2)}`;
      cartList.appendChild(li);
    }
  });

  cartTotal.textContent = `$${total.toFixed(2)}`;
}

window.onload = () => {
  renderCart();
};

