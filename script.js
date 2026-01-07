// Smooth scroll for nav links
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = link.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Project slider logic
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prevBtn = document.querySelector('.slider-btn-prev');
  const nextBtn = document.querySelector('.slider-btn-next');
  const dotsContainer = document.querySelector('.slider-dots');
  
  let currentIndex = 0;
  
  function createDots() {
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (index === currentIndex) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }
  
  function updateDots() {
    const dots = dotsContainer.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    updateDots();
  }
  
  function goToSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }
  
  function prevSlideFunc() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }
  
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlideFunc);
  
  createDots();
  showSlide(currentIndex);
  
  // Optional: auto-rotate slider
  let autoSlideInterval = setInterval(nextSlide, 7000);
  
  [prevBtn, nextBtn, dotsContainer].forEach(el => {
    el.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    el.addEventListener('mouseleave', () => {
      autoSlideInterval = setInterval(nextSlide, 7000);
    });
  });
  
  