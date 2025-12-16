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

// ===== Add to Cart Button (simulate) =====
document.querySelectorAll('.add-cart-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Product added to cart! (simulation for QA)');
  });
});

// ===== Cart Quantity & Calculation Bug =====
const qtyInputs = document.querySelectorAll('.qty');

qtyInputs.forEach(input => {
  input.addEventListener('change', () => {
    const row = input.parentElement.parentElement;
    const price = parseFloat(row.querySelector('.price').innerText);
    const total = row.querySelector('.total');
    total.innerText = (price * input.value) + 5; // intentional bug
    updateGrandTotal();
  });
});

// ===== Remove Product Button =====
document.querySelectorAll('.remove-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const row = e.target.parentElement.parentElement;
    row.remove();
    updateGrandTotal();
  });
});

// ===== Update Grand Total (with bug) =====
function updateGrandTotal() {
  const totals = document.querySelectorAll('.total');
  let sum = 0;
  totals.forEach(t => {
    sum += parseFloat(t.innerText);
  });
  const grandTotalElem = document.getElementById('grand-total');
  if (grandTotalElem) grandTotalElem.innerText = sum + 10; // intentional bug
}

// ===== Checkout Form Bug =====
const checkoutForm = document.getElementById('checkout-form');
if (checkoutForm) {
  checkoutForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Payment processed! (tax bug intentional: tax always 0)');
  });
}
