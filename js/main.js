/* =====================================================================
   MAIN.JS — renders the site using the data in content.js
   You do not need to edit this file. Go edit js/content.js instead.
   ===================================================================== */
(function(){
  const C = SITE_CONTENT;

  function el(tag, className, html){
    const e = document.createElement(tag);
    if (className) e.className = className;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  // Builds an image element, or a placeholder tile if the file is missing.
  function makeImage(src, alt, wrapClass){
    const wrap = el('div', wrapClass || '');
    const img = new Image();
    img.alt = alt || '';
    img.loading = 'lazy';
    img.onerror = function(){
      wrap.innerHTML = '';
      const ph = el('div', 'ph-image');
      ph.setAttribute('data-label', src.split('/').pop());
      wrap.appendChild(ph);
    };
    img.src = src;
    wrap.appendChild(img);
    return wrap;
  }

  function compressedGallerySrc(src){
    return src.replace(/(^|\/)images\/gallery\//, '$1images/compressed/').replace(/\.webp$/i, '_result.webp');
  }

  function originalGallerySrc(src){
    return src.replace(/(^|\/)images\/compressed\//, '$1images/gallery/').replace(/_result\.webp$/i, '.webp');
  }

  /* ---------------- HEADER TEXT / LINKS ---------------- */
  document.title = C.business.name;
  document.getElementById('heroTitle').textContent = C.hero.heading;
  document.getElementById('heroSub').textContent = C.hero.subheading;
  document.getElementById('footerYear').textContent = new Date().getFullYear();

  const waMessage = encodeURIComponent(
    "Hi Nothing But Memories Photography! I'd like to enquire about my wedding.\n\n" +
    "Name/s: \nWedding date: \nCity/Venue: \nEvents to cover: \nPackage of interest: \n"
  );
  const waLink = `https://wa.me/${C.business.whatsappNumber}?text=${waMessage}`;
  const emailSubject = encodeURIComponent("Wedding Photography Enquiry");
  const emailBody = encodeURIComponent(
    "Name/s: \nWedding date: \nCity/Venue: \nEvents to cover: \nPackage of interest: \n"
  );
  const emailLink = `mailto:${C.business.email}?subject=${emailSubject}&body=${emailBody}`;

  ['whatsappBtn','footerWhatsapp'].forEach(id => document.getElementById(id).href = waLink);
  ['emailBtn','footerEmailLink'].forEach(id => document.getElementById(id).href = emailLink);

  // Logo (header + footer) — swappable via business.logoImage in content.js
  [document.getElementById('logoMark'), document.getElementById('footerLogoMark')].forEach(img => {
    if (!img) return;
    img.src = C.business.logoImage;
    img.onerror = () => { img.style.display = 'none'; };
  });

  const igLink = document.getElementById('footerInstagram');
  if (C.business.instagramUrl){
    igLink.href = C.business.instagramUrl;
  } else {
    igLink.style.display = 'none';
  }

  // Intercept contact buttons to show a small contact form modal
  function attachContactInterceptors(){
    const waIds = ['whatsappBtn','footerWhatsapp'];
    const emIds = ['emailBtn','footerEmailLink'];

    waIds.forEach(id => {
      const elBtn = document.getElementById(id);
      if (!elBtn) return;
      elBtn.addEventListener('click', (e) => { e.preventDefault(); openContactForm('whatsapp'); });
    });

    emIds.forEach(id => {
      const elBtn = document.getElementById(id);
      if (!elBtn) return;
      elBtn.addEventListener('click', (e) => { e.preventDefault(); openContactForm('email'); });
    });
  }
  attachContactInterceptors();

  /* ---------------- HERO SLIDER ---------------- */
  const heroWrap = document.getElementById('heroSlides');
  C.hero.slides.forEach((s, i) => {
    const slide = makeImage(s.src, s.alt, 'hero-slide' + (i === 0 ? ' active' : ''));
    heroWrap.appendChild(slide);
  });
  const slides = heroWrap.querySelectorAll('.hero-slide');
  if (slides.length > 1){
    let idx = 0;
    setInterval(() => {
      slides[idx].classList.remove('active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('active');
    }, 5500);
  }

  /* ---------------- PILLARS ---------------- */
  const pillarsWrap = document.getElementById('pillarsInner');
  C.pillars.forEach(p => {
    const d = el('div', 'pillar');
    d.appendChild(el('p', 'pillar-word', p.word));
    d.appendChild(el('p', 'pillar-text', p.text));
    pillarsWrap.appendChild(d);
  });

  /* ---------------- GALLERY ---------------- */
  const galleryGrid = document.getElementById('galleryGrid');

  function shuffleArray(array){
    const clone = array.slice();
    for (let i = clone.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [clone[i], clone[j]] = [clone[j], clone[i]];
    }
    return clone;
  }

  const displayGallery = shuffleArray(C.gallery).map(g => ({
    ...g,
    thumbnailSrc: compressedGallerySrc(g.src),
  }));
  const galleryBatchSize = 7;
  let galleryCursor = 0;

  const masonryState = {
    cols: 4,
    gap: 18,
    items: [],
    resizeTimeout: null,
  };

  const galleryLoadMore = el('div', 'gallery-load-more', 'Loading more photographs...');
  galleryLoadMore.setAttribute('aria-live', 'polite');
  galleryGrid.parentNode.appendChild(galleryLoadMore);

  function createGalleryItem(g, index){
    const item = el('div', 'gallery-item');
    item.dataset.index = index;
    item.style.opacity = '0';
    item.appendChild(makeImage(g.thumbnailSrc, g.caption));
    item.addEventListener('click', () => openGalleryLightbox(index));
    galleryGrid.appendChild(item);
    masonryState.items.push(item);
    observer.observe(item);
  }

  function appendGalleryBatch(){
    const nextItems = displayGallery.slice(galleryCursor, galleryCursor + galleryBatchSize);
    nextItems.forEach((g, offset) => createGalleryItem(g, galleryCursor + offset));
    galleryCursor += nextItems.length;
    galleryLoadMore.hidden = galleryCursor >= displayGallery.length;
    requestAnimationFrame(refreshMasonry);
  }

  function getColumnCount(){
    if (window.innerWidth <= 360) return 1;
    if (window.innerWidth <= 760) return 2;
    if (window.innerWidth <= 1080) return 3;
    return 4;
  }

  function updateGalleryColumns(){
    masonryState.cols = getColumnCount();
    masonryState.gap = window.innerWidth <= 760 ? 12 : 18;
    galleryGrid.style.setProperty('--masonry-columns', masonryState.cols);
    galleryGrid.style.setProperty('--masonry-gap', masonryState.gap + 'px');
  }

  function waitForImages(items){
    return Promise.all(items.map(item => {
      const img = item.querySelector('img');
      if (!img) return Promise.resolve();
      if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
      return new Promise(resolve => { img.addEventListener('load', resolve, { once: true }); img.addEventListener('error', resolve, { once: true }); });
    }));
  }

  function layoutMasonry(){
    masonryState.items.forEach(item => {
      if (item.classList.contains('hidden')){
        item.style.display = 'none';
        return;
      }
      item.style.display = 'block';
    });

    const visibleItems = masonryState.items.filter(item => !item.classList.contains('hidden'));
    const columns = Array.from({ length: masonryState.cols }, () => 0);
    const colWidth = (galleryGrid.clientWidth - (masonryState.cols - 1) * masonryState.gap) / masonryState.cols;
    let maxHeight = 0;

    visibleItems.forEach(item => {
      const img = item.querySelector('img');
      if (!img) return;
      const width = img.naturalWidth || img.width || item.offsetWidth;
      const height = img.naturalHeight || img.height || item.offsetHeight;
      const itemHeight = width > 0 ? (height * colWidth / width) : item.offsetHeight;
      const smallestCol = columns.indexOf(Math.min(...columns));
      const x = smallestCol * (colWidth + masonryState.gap);
      const y = columns[smallestCol];
      item.style.width = colWidth + 'px';
      item.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      item.style.opacity = '1';
      columns[smallestCol] += itemHeight + masonryState.gap;
      maxHeight = Math.max(maxHeight, columns[smallestCol]);
    });

    galleryGrid.style.height = maxHeight > 0 ? maxHeight + 'px' : '0px';
  }

  async function refreshMasonry(){
    updateGalleryColumns();
    const itemsToLayout = masonryState.items.filter(item => !item.classList.contains('hidden'));
    await waitForImages(itemsToLayout);
    layoutMasonry();
  }

  function scheduleLayout(){
    clearTimeout(masonryState.resizeTimeout);
    masonryState.resizeTimeout = setTimeout(refreshMasonry, 80);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('developed');
    });
  }, { threshold: 0.25 });

  appendGalleryBatch();

  let loadMoreScheduled = false;
  function loadMoreOnScroll(){
    if (loadMoreScheduled || galleryCursor >= displayGallery.length) return;

    const sentinelTop = galleryLoadMore.getBoundingClientRect().top;
    if (sentinelTop > window.innerHeight + 500) return;
    loadMoreScheduled = true;
    requestAnimationFrame(() => {
      loadMoreScheduled = false;
      appendGalleryBatch();
    });
  }
  window.addEventListener('scroll', loadMoreOnScroll, { passive: true });

  window.addEventListener('resize', scheduleLayout);
  window.addEventListener('load', refreshMasonry);
  setTimeout(refreshMasonry, 300);

  // Recalculate layout when any gallery image finishes loading
  masonryState.items.forEach(item => {
    const img = item.querySelector('img');
    if (img){
      img.addEventListener('load', () => requestAnimationFrame(refreshMasonry));
      img.addEventListener('error', () => requestAnimationFrame(refreshMasonry));
    }
  });

  // ---------------- GALLERY LIGHTBOX ----------------
  function openGalleryLightbox(startIndex){
    const overlay = el('div', 'gallery-lightbox open');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Photo viewer');

    const imgEl = new Image();
    imgEl.className = 'gallery-lightbox-image';

    const closeBtn = el('button', 'gallery-lightbox-close', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>');
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', 'Close photo viewer');

    const prevBtn = el('button', 'gallery-lightbox-arrow gallery-lightbox-prev', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>');
    prevBtn.type = 'button';
    prevBtn.setAttribute('aria-label', 'Previous photo');

    const nextBtn = el('button', 'gallery-lightbox-arrow gallery-lightbox-next', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>');
    nextBtn.type = 'button';
    nextBtn.setAttribute('aria-label', 'Next photo');

    overlay.appendChild(imgEl);
    overlay.appendChild(closeBtn);
    overlay.appendChild(prevBtn);
    overlay.appendChild(nextBtn);
    document.body.appendChild(overlay);

    let index = startIndex;

    function show(nextIndex){
      index = (nextIndex + displayGallery.length) % displayGallery.length;
      imgEl.src = originalGallerySrc(displayGallery[index].thumbnailSrc);
      imgEl.alt = displayGallery[index].caption || '';
    }

    function closeModal(){
      document.removeEventListener('keydown', keyHandler);
      overlay.remove();
    }

    function keyHandler(event){
      if (event.key === 'Escape') closeModal();
      if (event.key === 'ArrowLeft') show(index - 1);
      if (event.key === 'ArrowRight') show(index + 1);
    }

    prevBtn.addEventListener('click', () => show(index - 1));
    nextBtn.addEventListener('click', () => show(index + 1));
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', event => {
      if (event.target === overlay) closeModal();
    });
    overlay.addEventListener('wheel', event => event.preventDefault(), { passive: false });
    overlay.addEventListener('touchmove', event => event.preventDefault(), { passive: false });
    document.addEventListener('keydown', keyHandler);
    show(index);
    closeBtn.focus();
  }

    // ---------------- CONTACT FORM MODAL ----------------
    function openContactForm(mode){ // mode: 'whatsapp' | 'email'
      const overlay = el('div', 'contact-modal');
      overlay.innerHTML = `
        <div class="contact-card">
          <button class="contact-close" aria-label="Close">&times;</button>
          <h3>Get in touch</h3>
          <div class="contact-fields">
            <label>Name<input type="text" id="cf-name" placeholder="Your full name" required></label>
            <label>Phone<input type="tel" id="cf-phone" placeholder="Mobile number" required pattern="[0-9]{10,}" title="Enter a valid phone number (10+ digits)"></label>
            <label>Email<input type="email" id="cf-email" placeholder="you@example.com" title="Enter a valid email address"></label>
            <label>Event<input type="text" id="cf-event" placeholder="e.g. Wedding reception"></label>
            <label>Venue<input type="text" id="cf-venue" placeholder="City / Venue"></label>
            <label>Date<input type="date" id="cf-date"></label>
            <label>Message<textarea id="cf-message" placeholder="Write a short message" rows="4"></textarea></label>
          </div>
          <div class="contact-actions">
            <button class="btn btn-outline" id="cf-cancel">Cancel</button>
            <button class="btn btn-solid" id="cf-send">Send</button>
          </div>
        </div>`;
      document.body.appendChild(overlay);

      const closeBtn = overlay.querySelector('.contact-close');
      const cancelBtn = overlay.querySelector('#cf-cancel');
      const sendBtn = overlay.querySelector('#cf-send');

      function remove(){ overlay.remove(); document.removeEventListener('keydown', onKey); }
      function onKey(e){ if (e.key === 'Escape') remove(); }
      document.addEventListener('keydown', onKey);
      overlay.addEventListener('click', (e) => { if (e.target === overlay) remove(); });
      closeBtn.addEventListener('click', remove);
      cancelBtn.addEventListener('click', remove);

      sendBtn.addEventListener('click', () => {
        const name = (document.getElementById('cf-name').value || '').trim();
        const phone = (document.getElementById('cf-phone').value || '').trim();
        const email = (document.getElementById('cf-email').value || '').trim();
        const event = (document.getElementById('cf-event').value || '').trim();
        const venue = (document.getElementById('cf-venue').value || '').trim();
        const date = (document.getElementById('cf-date').value || '').trim();
        const userMessage = (document.getElementById('cf-message').value || '').trim();

        // Validation: Name and Phone are required
        if (!name || !phone){
          alert('Please enter at least your name and phone number.');
          return;
        }

        // Validation: Phone number (10 digits or 12 digits with country code 91)
        const phoneRegex = /^(\d{10}|91\d{10})$/;
        if (!phoneRegex.test(phone.replace(/\D/g, ''))){
          alert('Please enter a valid phone number (10 digits or with country code 91).');
          return;
        }

        // Validation: Email format (only if email is provided)
        if (email){
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)){
            alert('Please enter a valid email address.');
            return;
          }
        }

        const message = `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nEvent: ${event}\nVenue: ${venue}\nDate: ${date}\n\nMessage: ${userMessage}`;

        // copy to clipboard where available
        if (navigator.clipboard && navigator.clipboard.writeText){
          navigator.clipboard.writeText(message).catch(()=>{});
        }

        if (mode === 'whatsapp'){
          const waPhone = C.business.whatsappNumber || '';
          const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(message)}`;
          window.open(waUrl, '_blank');
        } else {
          // If EmailJS is configured, send via EmailJS API so the site sends directly
          const svc = (C.business && C.business.emailService) ? C.business.emailService : null;
          if (svc && svc.provider === 'emailjs' && svc.serviceId && svc.templateId && svc.userId){
            const payload = {
              service_id: svc.serviceId,
              template_id: svc.templateId,
              user_id: svc.userId,
              template_params: {
                from_name: name,
                from_email: email,
                phone: phone,
                event: event,
                venue: venue,
                date: date,
                message: message
              }
            };
            fetch('https://api.emailjs.com/api/v1.0/email/send', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            }).then(res => {
              if (res.ok){
                alert('Request sent — we will contact you soon.');
              } else {
                alert('Sending failed — opening your email client instead.');
                const subject = `Website enquiry from ${name}`;
                const to = C.business.email || '';
                const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
                window.location.href = mailto;
              }
            }).catch(() => {
              alert('Error sending — opening your email client instead.');
              const subject = `Website enquiry from ${name}`;
              const to = C.business.email || '';
              const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
              window.location.href = mailto;
            });
          } else {
            // Fallback: open user's mail client (mailto)
            const subject = `Website enquiry from ${name}`;
            const to = C.business.email || '';
            const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
            window.location.href = mailto;
          }
        }

        remove();
      });
    }

  /* ---------------- FILMS ---------------- */
  const filmsGrid = document.getElementById('filmsGrid');
  const lightbox = document.getElementById('videoLightbox');
  const lightboxFrame = document.getElementById('lightboxFrame');

  C.films.forEach(f => {
    const card = el('div', 'film-card');
    const thumbSrc = f.youtubeId
      ? `https://img.youtube.com/vi/${f.youtubeId}/hqdefault.jpg`
      : (f.thumbnail || '');

    if (thumbSrc){
      const img = new Image();
      img.src = thumbSrc;
      img.alt = f.title || '';
      img.onerror = () => { img.style.display = 'none'; card.classList.add('ph-image'); card.setAttribute('data-label', f.title || 'film.mp4'); };
      card.appendChild(img);
    } else {
      card.classList.add('ph-image');
      card.setAttribute('data-label', (f.title || 'film') + ' — add a video');
    }

    const playBtn = el('div', 'play-btn', '<span>&#9658;</span>');
    card.appendChild(playBtn);
    card.appendChild(el('div', 'film-title', f.title || ''));

    card.addEventListener('click', () => {
      if (f.youtubeId){
        const embedUrl = `https://www.youtube-nocookie.com/embed/${f.youtubeId}?autoplay=1&playsinline=1&rel=0&controls=1&modestbranding=1`;
        lightboxFrame.innerHTML = `<iframe src="${embedUrl}" title="${f.title||''}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
      } else if (f.videoFile){
        lightboxFrame.innerHTML = `<video src="${f.videoFile}" controls autoplay></video>`;
      } else {
        return; // nothing to play yet
      }
      lightbox.classList.add('open');
    });

    filmsGrid.appendChild(card);
  });

  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
  function closeLightbox(){
    lightbox.classList.remove('open');
    lightboxFrame.innerHTML = '';
  }

  /* ---------------- ABOUT ---------------- */
  document.getElementById('aboutHeading').textContent = C.about.heading;
  document.getElementById('aboutIntro').textContent = C.about.introduction;
  document.getElementById('aboutOrigin').textContent = C.about.origin;
  document.getElementById('aboutProfession').textContent = C.about.profession;
  document.getElementById('aboutApproach').textContent = C.about.approach;
  document.getElementById('aboutHighlightsHeading').textContent = C.about.highlightsHeading;
  const aboutHighlights = document.getElementById('aboutHighlights');
  C.about.highlights.forEach(highlight => {
    const item = el('li', 'about-highlight');
    item.appendChild(el('strong', '', highlight.title));
    item.appendChild(el('span', '', highlight.text));
    aboutHighlights.appendChild(item);
  });
  document.getElementById('aboutQuote').textContent = C.about.quote;
  document.getElementById('aboutFounders').textContent = C.about.founders;
  document.getElementById('aboutFounderRole').textContent = C.about.founderRole;
  const aboutPhoto = document.querySelector('.about-photo');
  aboutPhoto.classList.remove('ph-image');
  const aboutImg = new Image();
  aboutImg.src = 'images/about-photo.JPG';
  aboutImg.alt = 'The photographer';
  aboutImg.onerror = () => {
    aboutPhoto.innerHTML = '';
    aboutPhoto.classList.add('ph-image');
    aboutPhoto.setAttribute('data-label', 'about-photo.jpg');
  };
  aboutPhoto.appendChild(aboutImg);

  /* ---------------- TESTIMONIALS ---------------- */
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('testimonialDots');
  C.testimonials.forEach((t, i) => {
    const slide = el('div', 'testimonial-slide' + (i === 0 ? ' active' : ''));
    
    // Add client image if available
    if (t.image){
      const imgWrap = makeImage(t.image, t.names, 'testimonial-image');
      slide.appendChild(imgWrap);
    }
    
    slide.appendChild(el('p', 'testimonial-quote', '"' + t.quote + '"'));
    slide.appendChild(el('p', 'testimonial-name', t.names));
    track.appendChild(slide);

    const dot = el('button', 'tdot' + (i === 0 ? ' active' : ''));
    dot.addEventListener('click', () => showTestimonial(i));
    dotsWrap.appendChild(dot);
  });

  let tIdx = 0;
  function showTestimonial(i){
    track.querySelectorAll('.testimonial-slide').forEach((s, idx) => s.classList.toggle('active', idx === i));
    dotsWrap.querySelectorAll('.tdot').forEach((d, idx) => d.classList.toggle('active', idx === i));
    tIdx = i;
  }
  if (C.testimonials.length > 1){
    setInterval(() => showTestimonial((tIdx + 1) % C.testimonials.length), 6000);
  }

  /* ---------------- NAV BEHAVIOUR ---------------- */
  const header = document.getElementById('siteHeader');
  const nav = document.getElementById('siteNav');
  const navToggle = document.getElementById('navToggle');
  navToggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 60);
    header.classList.toggle('hide', y > lastScroll && y > 300);
    lastScroll = y;
  });

})();
