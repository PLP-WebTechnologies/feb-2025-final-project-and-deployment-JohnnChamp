let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showNotification("Product added to cart!");
  renderCart(); // Updates if on cart page
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function updateQuantity(productId, newQuantity) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = Math.max(1, parseInt(newQuantity) || 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
}

function updateCartCount() {
  const countElement = document.getElementById('cart-count');
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (countElement) {
    countElement.textContent = totalCount;
  }
}

function renderCart() {
  const cartList = document.getElementById('cart-items');
  if (!cartList) return;

  cartList.innerHTML = '';

  if (cart.length === 0) {
    cartList.innerHTML = '<li>Your cart is empty.</li>';
    return;
  }

  cart.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      Product ${item.id} — 
      Quantity: <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)" />
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartList.appendChild(li);
  });
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 2000);
}

window.onload = () => {
  updateCartCount();
  renderCart();
};
