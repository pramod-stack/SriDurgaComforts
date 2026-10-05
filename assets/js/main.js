/**
 * Sri Durga Comforts — Luxury Hospitality Interactive Controller
 * Handles Navigation, Gallery Lightbox, Interactive Journey, Booking Form WhatsApp Encoding, and Accessibility.
 */

const SriDurgaData = {
  property: {
    name: "Sri Durga Comforts",
    tagline: "A Comfortable Stay at the Heart of Bellur Cross",
    address: {
      street: "Mangalore–Bangalore Highway (NH-75), Near Adichunchanagiri University, Javaranahalli",
      locality: "Bellur, Nagamangala Taluk, Mandya District",
      state: "Karnataka",
      postalCode: "571418",
      country: "India"
    },
    phones: {
      primary: "+91 99757 28106",
      primaryRaw: "919975728106",
      secondary: "+91 73491 64171",
      secondaryRaw: "917349164171"
    },
    maps: "https://maps.app.goo.gl/2ZUZXkTBWyFUqPs5A",
    owner: {
      name: "Raghavendra",
      experience: "15 Years in Hospitality"
    }
  },

  gallery: [
    {
      src: "assets/images/reception-night-glow.webp",
      caption: "Illuminated Front Desk & Reception at Sri Durga Comforts with Official SDC Seal",
      alt: "Sri Durga Comforts reception desk with illuminated fluted counter and blue halo SDC logo",
      category: "Reception"
    },
    {
      src: "assets/images/room-double-bed-editorial.webp",
      caption: "Double Bedroom with Upholstered Headboard, Fluted Wood Accents & SDC Linens",
      alt: "Double bed at Sri Durga Comforts with upholstered grey headboard and timber accents",
      category: "Rooms"
    },
    {
      src: "assets/images/hero-highway-dusk.webp",
      caption: "Panoramic Balcony Sunset View overlooking NH-75 Highway and Bellur Skyline",
      alt: "Sunset view from Sri Durga Comforts balcony looking over NH-75 highway",
      category: "Views"
    },
    {
      src: "assets/images/room-wardrobe-tv-console.webp",
      caption: "Guest Room Vanity, Full Wardrobe & Wall-Mounted Flat-Screen TV",
      alt: "Guest room interior showing wooden wardrobe, vanity mirror and wall mounted television",
      category: "Rooms"
    },
    {
      src: "assets/images/bathroom-marble-geyser.webp",
      caption: "Private Attached Bathroom with Marble Tiling & Dedicated Hot Water Geyser",
      alt: "Private bathroom at Sri Durga Comforts with modern fixtures and water heater geyser",
      category: "Bathrooms"
    },
    {
      src: "assets/images/hotel-corridor.webp",
      caption: "Spacious Guest Floor Hallway with Dado Tiles & Recessed Ceiling Lighting",
      alt: "Well-lit hotel hallway leading to guest rooms at Sri Durga Comforts",
      category: "Lobby & Corridors"
    },
    {
      src: "assets/images/lobby-reception-arrival.webp",
      caption: "Second Floor Arrival Lobby with Passenger Elevator & Lounge Seating",
      alt: "Second floor arrival lounge and lift access at Sri Durga Comforts",
      category: "Lobby & Corridors"
    },
    {
      src: "assets/images/hotel-exterior-building.webp",
      caption: "Sri Durga Comforts at BHM Arcade on NH-75 (Bellur Cross)",
      alt: "Exterior facade of Sri Durga Comforts on NH-75 highway Bellur Cross",
      category: "Exterior"
    },
    {
      src: "assets/images/room-double-bed-wide.webp",
      caption: "Executive Double Room with Armchairs, Coffee Table & Air Conditioning",
      alt: "Executive bedroom showing seating area with armchairs and split air conditioner",
      category: "Rooms"
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initLightbox();
  initBookingForm();
  initJourney();
  initRoomEnquiries();
  initDiscountModal();
  initNearbyToggle();
});

/* ==========================================================================
   NAVIGATION & SCROLL PROGRESS
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

function initMobileMenu() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  if (!toggleBtn || !drawer) return;

  const toggle = (force) => {
    const isOpen = typeof force === 'boolean' ? force : !drawer.classList.contains('open');
    drawer.classList.toggle('open', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen.toString());
    drawer.setAttribute('aria-hidden', (!isOpen).toString());
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  toggleBtn.addEventListener('click', () => toggle());

  // Close when tapping links
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggle(false));
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      toggle(false);
    }
  });
}

/* ==========================================================================
   GALLERY LIGHTBOX
   ========================================================================== */
let currentLightboxIndex = 0;

function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox || !galleryItems.length) return;

  const lbImage = lightbox.querySelector('.lightbox__image');
  const lbCaption = lightbox.querySelector('.lightbox__caption');
  const lbCounter = lightbox.querySelector('.lightbox__counter');
  const prevBtn = lightbox.querySelector('.lightbox__prev');
  const nextBtn = lightbox.querySelector('.lightbox__next');
  const closeBtn = lightbox.querySelector('.lightbox__close');

  const updateLightbox = (index) => {
    currentLightboxIndex = (index + SriDurgaData.gallery.length) % SriDurgaData.gallery.length;
    const item = SriDurgaData.gallery[currentLightboxIndex];
    
    lbImage.src = item.src;
    lbImage.alt = item.alt;
    lbCaption.textContent = item.caption;
    lbCounter.textContent = `${currentLightboxIndex + 1} / ${SriDurgaData.gallery.length}`;
  };

  const openLightbox = (index) => {
    updateLightbox(index);
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  galleryItems.forEach(el => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.getAttribute('data-index') || '0', 10);
      openLightbox(idx);
    });
  });

  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); updateLightbox(currentLightboxIndex - 1); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); updateLightbox(currentLightboxIndex + 1); });
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox__dialog') || e.target.classList.contains('lightbox__image-frame')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') updateLightbox(currentLightboxIndex - 1);
    if (e.key === 'ArrowRight') updateLightbox(currentLightboxIndex + 1);
  });

  // Touch Swipe for Mobile
  let touchStartX = 0;
  let touchEndX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) updateLightbox(currentLightboxIndex + 1);
    if (touchEndX > touchStartX + 50) updateLightbox(currentLightboxIndex - 1);
  }, { passive: true });
}

/* ==========================================================================
   BOOKING ENQUIRY VIA WHATSAPP (REAL SUBMISSION)
   ========================================================================== */
function initBookingForm() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  // Set default dates: check-in today, check-out tomorrow
  const checkinInput = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');

  if (checkinInput && checkoutInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formatDate = (d) => d.toISOString().split('T')[0];
    checkinInput.min = formatDate(today);
    checkinInput.value = formatDate(today);
    
    checkoutInput.min = formatDate(tomorrow);
    checkoutInput.value = formatDate(tomorrow);

    checkinInput.addEventListener('change', () => {
      const selected = new Date(checkinInput.value);
      selected.setDate(selected.getDate() + 1);
      checkoutInput.min = formatDate(selected);
      if (new Date(checkoutInput.value) <= new Date(checkinInput.value)) {
        checkoutInput.value = formatDate(selected);
      }
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('guestName')?.value.trim() || 'Guest';
    const phone = document.getElementById('guestPhone')?.value.trim() || 'Not specified';
    const checkin = checkinInput?.value || 'TBD';
    const checkout = checkoutInput?.value || 'TBD';
    const guests = document.getElementById('guestCount')?.value || '2';
    const roomPref = document.getElementById('roomPreference')?.value || 'Double Room';
    const notes = document.getElementById('specialNotes')?.value.trim();

    // Calculate nights
    let nightsText = '';
    if (checkin && checkout && checkin !== 'TBD' && checkout !== 'TBD') {
      const d1 = new Date(checkin);
      const d2 = new Date(checkout);
      const diffTime = Math.abs(d2 - d1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 0) nightsText = ` (${diffDays} night${diffDays > 1 ? 's' : ''})`;
    }

    const messageLines = [
      `*Sri Durga Comforts — Booking Enquiry*`,
      `Name: ${name}`,
      `Contact Phone: ${phone}`,
      `Check-in: ${checkin}`,
      `Check-out: ${checkout}${nightsText}`,
      `Number of Guests: ${guests}`,
      `Room Choice: ${roomPref}`
    ];

    if (notes) {
      messageLines.push(`Notes / Requirements: ${notes}`);
    }

    messageLines.push(`_Enquired via official website_`);

    const encoded = encodeURIComponent(messageLines.join('\n'));
    const waUrl = `https://wa.me/${SriDurgaData.property.phones.primaryRaw}?text=${encoded}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });
}

/* ==========================================================================
   ROOM SPECIFIC ENQUIRIES
   ========================================================================== */
function initRoomEnquiries() {
  document.querySelectorAll('[data-enquire-room]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const roomName = btn.getAttribute('data-enquire-room') || 'Double Room';
      const msg = encodeURIComponent(`Hello Sri Durga Comforts, I would like to check current tariff and availability for the ${roomName}.`);
      const url = `https://wa.me/${SriDurgaData.property.phones.primaryRaw}?text=${msg}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });
}

/* ==========================================================================
   INTERACTIVE LOCATION JOURNEY
   ========================================================================== */
function initJourney() {
  const steps = document.querySelectorAll('.journey-step');
  steps.forEach(step => {
    step.addEventListener('mouseenter', () => {
      steps.forEach(s => s.classList.remove('current'));
      step.classList.add('current');
    });
  });
}

/* ==========================================================================
   10% SPECIAL DIRECT BOOKING OFFER POPUP (DISCOUNT MODAL)
   ========================================================================== */
function initDiscountModal() {
  const modal = document.getElementById('discountModal');
  if (!modal) return;

  const closeBtn = document.getElementById('discountModalClose');
  const maybeLaterBtn = document.getElementById('btnDiscountMaybeLater');
  const copyBtn = document.getElementById('btnCopyCode');
  const copyBtnLabel = document.getElementById('copyBtnLabel');
  const bookBtn = document.getElementById('btnBookWithDiscount');

  const STORAGE_DISMISSED = 'sriDurgaDiscountPopupDismissed';
  const STORAGE_COPIED = 'sriDurgaDiscountCodeCopied';

  try {
    if (localStorage.getItem(STORAGE_DISMISSED) || localStorage.getItem(STORAGE_COPIED)) {
      return;
    }
  } catch (e) {
    // Graceful fallback if localStorage is disabled
  }

  let previousActiveElement = null;

  const openModal = () => {
    previousActiveElement = document.activeElement;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    if (closeBtn) closeBtn.focus();
  };

  const closeModal = (recordDismissal = true) => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    if (recordDismissal) {
      try {
        localStorage.setItem(STORAGE_DISMISSED, 'true');
      } catch (e) {}
    }
    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      previousActiveElement.focus();
    }
  };

  // Automatically show ~5 seconds after page load
  setTimeout(() => {
    openModal();
  }, 5000);

  // Close triggers
  if (closeBtn) closeBtn.addEventListener('click', () => closeModal(true));
  if (maybeLaterBtn) maybeLaterBtn.addEventListener('click', () => closeModal(true));

  // Light dismiss: click outside dialog box
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(true);
    }
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal(true);
    }
  });

  // Copy discount code UX
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const code = 'SD10';
      const onSuccess = () => {
        if (copyBtnLabel) copyBtnLabel.textContent = '✓ Code Copied';
        copyBtn.classList.add('copied');
        try {
          localStorage.setItem(STORAGE_COPIED, 'true');
        } catch (e) {}

        setTimeout(() => {
          if (copyBtnLabel) copyBtnLabel.textContent = 'Copy Code';
          copyBtn.classList.remove('copied');
        }, 2000);
      };

      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(code).then(onSuccess).catch(() => {
          fallbackCopyText(code, onSuccess);
        });
      } else {
        fallbackCopyText(code, onSuccess);
      }
    });
  }

  // Book with 10% off CTA dismisses modal
  if (bookBtn) {
    bookBtn.addEventListener('click', () => {
      closeModal(true);
    });
  }
}

function fallbackCopyText(text, callback) {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    if (callback) callback();
  } catch (err) {
    if (callback) callback();
  }
}

/* ==========================================================================
   NEARBY PLACES 30 KM EXPANSION CONTROLLER
   ========================================================================== */
function initNearbyToggle() {
  const toggleBtn = document.getElementById('btnToggleDiscovery');
  const extendedGrid = document.getElementById('nearbyExtendedGrid');
  if (!toggleBtn || !extendedGrid) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = extendedGrid.classList.toggle('open');
    toggleBtn.classList.toggle('active', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen.toString());
    const labelSpan = toggleBtn.querySelector('span');
    if (labelSpan) {
      labelSpan.textContent = isOpen 
        ? 'Show Fewer Places' 
        : 'Discover More Places Within ~30 KM';
    }
  });
}
