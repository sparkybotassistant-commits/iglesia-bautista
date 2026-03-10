// Iglesia Bautista Para Las Naciones - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // === STICKY HEADER ===
  const header = document.querySelector('.site-header');
  const topBar = document.querySelector('.top-bar');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  
  // === MOBILE NAVIGATION ===
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
      document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close nav when clicking a link
    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mainNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
  
  // === HERO SLIDER ===
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;
  let slideInterval;
  
  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  };
  
  const nextSlide = () => {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  };
  
  const startSlider = () => {
    slideInterval = setInterval(nextSlide, 5000);
  };
  
  const stopSlider = () => {
    clearInterval(slideInterval);
  };
  
  if (slides.length > 0) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showSlide(i);
        stopSlider();
        startSlider();
      });
    });
    
    startSlider();
  }
  
  // === ACCORDION ===
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all others
      accordionItems.forEach(i => i.classList.remove('active'));
      
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
  
  // === GALLERY ===
  const galleryTabs = document.querySelectorAll('.gallery-tab');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryCategories = ['all', 'iglesia-local', 'trabajo-misionero', 'comedor-de-ninos'];
  
  galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.category;
      
      // Update active tab
      galleryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Filter items
      galleryItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
  // === LIGHTBOX ===
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');
  const lightboxPrev = lightbox?.querySelector('.lightbox-prev');
  const lightboxNext = lightbox?.querySelector('.lightbox-next');
  let lightboxImages = [];
  let currentLightboxIndex = 0;
  
  const openLightbox = (images, index) => {
    lightboxImages = images;
    currentLightboxIndex = index;
    lightboxImg.src = lightboxImages[currentLightboxIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };
  
  const showLightboxImage = (index) => {
    currentLightboxIndex = (index + lightboxImages.length) % lightboxImages.length;
    lightboxImg.src = lightboxImages[currentLightboxIndex];
  };
  
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      const category = item.dataset.category;
      const categoryItems = Array.from(galleryItems).filter(i => i.dataset.category === category);
      const categoryIndex = categoryItems.indexOf(item);
      const images = categoryItems.map(i => i.dataset.full);
      
      openLightbox(images, categoryIndex);
    });
  });
  
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
      showLightboxImage(currentLightboxIndex - 1);
    });
  }
  
  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
      showLightboxImage(currentLightboxIndex + 1);
    });
  }
  
  // Close lightbox on background click
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }
  
  // Keyboard navigation for lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showLightboxImage(currentLightboxIndex - 1);
    if (e.key === 'ArrowRight') showLightboxImage(currentLightboxIndex + 1);
  });
  
  // === DONATION MODAL ===
  const donationFab = document.querySelector('.donation-fab-btn');
  const donationModal = document.querySelector('.donation-modal');
  const donationModalClose = donationModal?.querySelector('.donation-modal-close');
  
  if (donationFab && donationModal) {
    donationFab.addEventListener('click', () => {
      donationModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    
    donationModalClose?.addEventListener('click', () => {
      donationModal.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    donationModal.addEventListener('click', (e) => {
      if (e.target === donationModal) {
        donationModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  // === FADE IN ON SCROLL ===
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  fadeElements.forEach(el => fadeObserver.observe(el));
  
  // === SMOOTH SCROLL ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // === CONTACT FORM ===
  const contactForm = document.querySelector('.contact-form form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
      
      // Simulate form submission (replace with actual endpoint)
      setTimeout(() => {
        alert('¡Mensaje enviado! Nos pondremos en contacto pronto.');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 1500);
    });
  }
});