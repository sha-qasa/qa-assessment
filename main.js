{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // Carousel\
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