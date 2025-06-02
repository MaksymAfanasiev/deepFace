// Notification function
const notificationElement = document.getElementById('notification');
function showNotification(message) {
  notificationElement.textContent = message;
  notificationElement.classList.add('show');
  setTimeout(() => {
    notificationElement.classList.remove('show');
  }, 3000); // Hide after 3 seconds
}

// Function to copy text to clipboard
function copyToClipboard(text) {
  const tempInput = document.createElement('textarea');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  showNotification('Скопировано!');
}

// Global Slider Functionality for reusable Before/After sliders
function initializeBeforeAfterSlider(container) {
  const afterImage = container.querySelector('.interactive-slider-image.after');
  // const afterImageActual = afterImage.querySelector('img'); // Get the actual img tag
  const sliderHandle = container.querySelector('.interactive-slider-handle');
  let isDragging = false;

  // Set initial width based on container
  const updateSliderWidth = (x) => {
    const containerWidth = container.offsetWidth;
    // Clamp x within container bounds
    x = Math.max(0, Math.min(x, containerWidth));

    afterImage.style.width = x + 'px';
    sliderHandle.style.left = x + 'px';

    // Adjust the position of the *actual image* inside the clipped container
    // to keep it aligned with the 'before' image
    // afterImageActual.style.marginLeft = -x + 'px';
    // afterImageActual.style.width = containerWidth + 'px'; // Ensure image inside is full width of original
  };

  // Initial call
  // Use requestAnimationFrame to ensure layout is stable
  requestAnimationFrame(() => updateSliderWidth(container.offsetWidth / 2));


  // Mouse events
  sliderHandle.addEventListener('mousedown', (e) => {
    isDragging = true;
    container.style.cursor = 'ew-resize';
    e.preventDefault(); // Prevent default drag behavior
  });

  container.addEventListener('mouseup', () => {
    isDragging = false;
    container.style.cursor = 'default';
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const containerRect = container.getBoundingClientRect();
    let x = e.clientX - containerRect.left;
    updateSliderWidth(x);
  });

  // Touch events for mobile
  sliderHandle.addEventListener('touchstart', (e) => {
    isDragging = true;
    container.style.cursor = 'ew-resize';
    e.preventDefault(); // Prevent scrolling
  });

  container.addEventListener('touchend', () => {
    isDragging = false;
    container.style.cursor = 'default';
  });

  container.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches[0]) return;
    const containerRect = container.getBoundingClientRect();
    let x = e.touches[0].clientX - containerRect.left;
    updateSliderWidth(x);
  });

  // Update on resize
  new ResizeObserver(() => updateSliderWidth(container.offsetWidth / 2)).observe(container);
}


// Cookie Policy Popup
const cookieModalOverlay = document.getElementById('cookie-modal-overlay');
const acceptCookiesBtn = document.getElementById('accept-cookies-btn');

// Check if cookies were already accepted on page load
if (localStorage.getItem('cookiesAccepted') !== 'true') {
  // Show modal if not accepted
  cookieModalOverlay.classList.remove('hidden');
  cookieModalOverlay.style.display = 'flex'; // Ensure it's visible as flex for centering
} else {
  // Ensure it's hidden if already accepted
  cookieModalOverlay.classList.add('hidden');
  cookieModalOverlay.style.display = 'none';
}

acceptCookiesBtn.addEventListener('click', () => {
  localStorage.setItem('cookiesAccepted', 'true');
  cookieModalOverlay.classList.add('hidden');
  cookieModalOverlay.style.display = 'none'; // Hide it properly
});

// Smooth scroll for header links and close mobile menu
document.querySelectorAll('nav a.nav-link').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });

      // Close mobile menu if open
      const navbarCollapse = document.getElementById('navbarNav');
      const bsCollapseInstance = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapseInstance && navbarCollapse.classList.contains('show')) {
        bsCollapseInstance.hide();
      }
    }
  });
});


// Initialize all interactive sliders in the Demos section
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.interactive-slider-container').forEach(container => {
    initializeBeforeAfterSlider(container);
  });
});