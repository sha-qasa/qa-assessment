// Carousel\
let currentIndex = 0;\
const imgs = document.querySelectorAll('.carousel-img');\
setInterval(() => \{\
  imgs[currentIndex].classList.remove('active');\
  currentIndex = (currentIndex + 1) % imgs.length;\
  imgs[currentIndex].classList.add('active');\
\}, 3000);\
\
// Expand/Collapse Product\
document.querySelectorAll('.expand-btn').forEach(btn => \{\
  btn.addEventListener('click', e => \{\
    const info = e.target.nextElementSibling;\
    if (info.style.display === 'none') info.style.display = 'block';\
    else info.style.display = 'none';\
  \});\
\});\
\
// Cart Calculation (intentional bug)\
const qtyInputs = document.querySelectorAll('.qty');\
qtyInputs.forEach(input => \{\
  input.addEventListener('change', () => \{\
    const row = input.parentElement.parentElement;\
    const price = parseFloat(row.querySelector('.price').innerText);\
    const total = row.querySelector('.total');\
    total.innerText = (price * input.value) + 5; // intentional bug\
  \});\
\});\
}
