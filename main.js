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
    alert('Payment processed!');
    localStorage.removeItem('cart'); // clear cart after checkout
    loadCheckout();
    loadCart();
  });
}
