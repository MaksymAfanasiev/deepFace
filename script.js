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

// Before/After Slider functionality
document.addEventListener('DOMContentLoaded', () => {
  const sliderContainer = document.querySelector('.slider-container');
  if (!sliderContainer) return;

  const afterImageContainer = sliderContainer.querySelector('.slider-image.after');
  const sliderHandle = sliderContainer.querySelector('.slider-handle');
  let isDragging = false;

  // Set initial width based on container
  const updateSliderWidth = () => {
    const containerWidth = sliderContainer.offsetWidth;
    afterImageContainer.style.width = (containerWidth / 2) + 'px';
    sliderHandle.style.left = (containerWidth / 2) + 'px';
  };

  // Initial call and update on resize
  updateSliderWidth();
  window.addEventListener('resize', updateSliderWidth);

  sliderHandle.addEventListener('mousedown', (e) => {
    isDragging = true;
    sliderContainer.style.cursor = 'ew-resize';
  });

  sliderContainer.addEventListener('mouseup', () => {
    isDragging = false;
    sliderContainer.style.cursor = 'default';
  });

  sliderContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const containerRect = sliderContainer.getBoundingClientRect();
    let x = e.clientX - containerRect.left;

    // Clamp x within container bounds
    x = Math.max(0, Math.min(x, containerRect.width));

    afterImageContainer.style.width = x + 'px';
    sliderHandle.style.left = x + 'px';
  });

  // Touch events for mobile
  sliderHandle.addEventListener('touchstart', (e) => {
    isDragging = true;
    e.preventDefault(); // Prevent scrolling
  });

  sliderContainer.addEventListener('touchend', () => {
    isDragging = false;
  });

  sliderContainer.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches[0]) return;

    const containerRect = sliderContainer.getBoundingClientRect();
    let x = e.touches[0].clientX - containerRect.left;

    // Clamp x within container bounds
    x = Math.max(0, Math.min(x, containerRect.width));

    afterImageContainer.style.width = x + 'px';
    sliderHandle.style.left = x + 'px';
  });
});

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
