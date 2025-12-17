// ===== Carousel =====
let currentIndex = 0;
const imgs = document.querySelectorAll('.carousel-img');

if (imgs.length > 0) {
  setInterval(() => {
    imgs[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % imgs.length;
    imgs[currentIndex].classList.add('active');
  }, 3000);
}

// ===== Expand / Collapse Product Info =====
document.querySelectorAll('.expand-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const info = e.target.nextElementSibling;
    if (info.style.display === 'none') info.style.display = 'block';
    else info.style.display = 'none';
  });
});

// ===== Add to Cart using localStorage =====
document.querySelectorAll('.add-cart-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const card = e.target.parentElement;
    const name = card.querySelector('h3').innerText;
    const price = parseFloat(card.querySelector('p').innerText.replace('Price: RM ', ''));
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    let item = cart.find(i => i.name === name);
    if (item) {
      item.qty += 1;
    } else {
      cart.push({name: name, price: price, qty: 1});
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
  });
});
function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartTableBody = document.querySelector('#cart-table tbody');
  const grandTotalElem = document.getElementById('grand-total');

  cartTableBody.innerHTML = '';

  if (cart.length === 0) {
    cartTableBody.innerHTML =
      `<tr><td colspan="5">Your cart is empty</td></tr>`;
    if (grandTotalElem) grandTotalElem.innerText = 0;
    return; // stop further rendering
  }

  // loop untuk render setiap item
  cart.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.name}</td>
      <td class="price">${item.price}</td>
      <td>
        <div class="qty-control">
          <button class="minus-btn">−</button>
          <input type="number" class="qty" value="${item.qty}" min="1">
          <button class="plus-btn">+</button>
        </div>
      </td>
      <td class="total">${item.price * item.qty}</td>
      <td><button class="remove-btn">Remove</button></td>
    `;
    cartTableBody.appendChild(tr);
  });

  // calculate grand total
  let total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  if (grandTotalElem) grandTotalElem.innerText = total;
}

// ===== Cart Page =====
const cartTableBody = document.querySelector('#cart-table tbody');
const grandTotalElem = document.getElementById('grand-total');

function loadCart() {
  if (!cartTableBody) return;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartTableBody.innerHTML = ''; 
  let sum = 0;

  cart.forEach(item => {
    let total = item.price * item.qty + 5; 
    sum += total;
    
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td class="price">${item.price}</td>
      <td><input type="number" class="qty" value="${item.qty}" min="1"></td>
      <td class="total">${total}</td>
      <td><button class="remove-btn">Remove</button></td>
    `;
    cartTableBody.appendChild(row);
  });

  if (grandTotalElem) grandTotalElem.innerText = sum + 10; // intentional bug
}

loadCart();
// ===== Plus / Minus Buttons =====
if (cartTableBody) {
  cartTableBody.addEventListener('click', e => {

    if (e.target.classList.contains('plus-btn') ||
        e.target.classList.contains('minus-btn')) {

      const row = e.target.closest('tr');
      const name = row.querySelector('td').innerText;
      const qtyInput = row.querySelector('.qty');

      let qty = parseInt(qtyInput.value);
      if (e.target.classList.contains('plus-btn')) qty++;
      if (e.target.classList.contains('minus-btn') && qty > 1) qty--;

      qtyInput.value = qty;

      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      let item = cart.find(i => i.name === name);
      item.qty = qty;

      localStorage.setItem('cart', JSON.stringify(cart));
      loadCart();
    }

  });
}

// ===== Quantity & Remove Buttons =====

if (cartTableBody) {
  cartTableBody.addEventListener('input', e => {
    if (e.target.classList.contains('qty')) {
      const row = e.target.parentElement.parentElement;
      const name = row.querySelector('td').innerText;
      const price = parseFloat(row.querySelector('.price').innerText);
      let cart = JSON.parse(localStorage.getItem('cart'));
      
      let item = cart.find(i => i.name === name);
      item.qty = parseInt(e.target.value);
      localStorage.setItem('cart', JSON.stringify(cart));
      loadCart();
    }
  });

  cartTableBody.addEventListener('click', e => {
    if (e.target.classList.contains('remove-btn')) {
      const row = e.target.parentElement.parentElement;
      const name = row.querySelector('td').innerText;
      let cart = JSON.parse(localStorage.getItem('cart'));
      cart = cart.filter(i => i.name !== name);
      localStorage.setItem('cart', JSON.stringify(cart));
      loadCart();
    }
  });
}

// ===== Checkout Page Sync =====
const subtotalElem = document.getElementById('subtotal');
const taxElem = document.getElementById('tax');
const totalElem = document.getElementById('total');

function loadCheckout() {
  if (!subtotalElem || !taxElem || !totalElem) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.qty;
  });

  subtotalElem.innerText = subtotal;

  let tax = 0; 
  taxElem.innerText = tax;

  let total = subtotal + tax;
  totalElem.innerText = total;
}

loadCheckout();

// ===== Checkout Form Submit =====
const checkoutForm = document.getElementById('checkout-form');

if (checkoutForm) {
  checkoutForm.addEventListener('submit', e => {
    e.preventDefault();

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    localStorage.setItem('lastOrder', JSON.stringify(cart));

    localStorage.removeItem('cart');
    window.location.href = 'receipt.html';
  });
}
const checkoutBtn = document.getElementById('checkout-btn');

if (checkoutBtn) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    checkoutBtn.style.pointerEvents = 'none';
    checkoutBtn.style.opacity = '0.5';
  }
}

// ===== Receipt Page =====
const receiptItems = document.getElementById('receipt-items');

if (receiptItems) {
  const cart = JSON.parse(localStorage.getItem('lastOrder')) || [];
  let subtotal = 0;

  receiptItems.innerHTML = '';

  cart.forEach(item => {
    subtotal += item.price * item.qty;

    const li = document.createElement('li');
    li.innerText = `${item.name} x ${item.qty}`;
    receiptItems.appendChild(li);
  });

  document.getElementById('r-subtotal').innerText = subtotal;
  document.getElementById('r-tax').innerText = 0; 
  document.getElementById('r-total').innerText = subtotal;

  document.getElementById('order-id').innerText =
    'ORD-' + Math.floor(Math.random() * 10000);
}

