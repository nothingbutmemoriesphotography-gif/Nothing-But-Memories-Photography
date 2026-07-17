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
  const filtersWrap = document.getElementById('galleryFilters');
  const categories = ['All', ...new Set(C.gallery.map(g => g.category))];

  categories.forEach((cat, i) => {
    const btn = el('button', 'filter-btn' + (i === 0 ? ' active' : ''), cat);
    btn.addEventListener('click', () => {
      filtersWrap.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.gallery-item').forEach(item => {
        const show = cat === 'All' || item.dataset.category === cat;
        item.classList.toggle('hidden', !show);
      });
    });
    filtersWrap.appendChild(btn);
  });

  C.gallery.forEach(g => {
    const item = el('div', 'gallery-item');
    item.dataset.category = g.category;
    item.dataset.caption = g.caption || '';
    item.appendChild(makeImage(g.src, g.caption));
    item.appendChild(el('div', 'caption', g.caption || ''));
    // clicking a gallery tile opens a lightbox showing either:
    // - all images with the same caption (default), or
    // - a numbered set inside a folder when `groupFolder` is provided in `js/content.js`
    item.addEventListener('click', () => openCoupleGallery(g));
    galleryGrid.appendChild(item);
  });

  // "developing photograph" reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('developed');
    });
  }, { threshold: 0.25 });
  document.querySelectorAll('.gallery-item').forEach(item => observer.observe(item));

  // ---------------- COUPLE GALLERY LIGHTBOX ----------------
  function openCoupleGallery(galItem){
    let items = [];
    let caption = '';
    // If the gallery item specifies a folder and count, build a numbered set
    if (galItem && galItem.groupFolder){
      caption = galItem.caption || '';
      const folder = (galItem.groupFolder || '').replace(/\/$/, '');
      const count = parseInt(galItem.groupCount, 10) || 7;
      for (let i = 1; i <= count; i++){
        items.push({ src: `${folder}/couple${i}.jpg`, caption: caption });
      }
    } else {
      // Fallback: gather all images that share the same caption
      caption = (galItem && galItem.caption) ? galItem.caption : (typeof galItem === 'string' ? galItem : '');
      items = C.gallery.filter(g => (g.caption || '') === (caption || ''));
    }
    if (!items.length) return;

    // build modal elements
    const overlay = el('div', 'couple-lightbox open');
    const closeBtn = el('button', 'couple-close', '&times;');
    overlay.appendChild(closeBtn);

    const frame = el('div', 'couple-frame');
    const preview = el('div', 'couple-preview');
    const meta = el('div', 'couple-meta');
    const metaPanel = el('div', 'panel');

    const imgEl = new Image();
    imgEl.alt = caption;
    imgEl.src = items[0].src;
    preview.appendChild(imgEl);

    const captionEl = el('div', 'couple-caption', caption);
    const indexEl = el('div', 'couple-index', `1 / ${items.length}`);
    const controls = el('div', 'couple-controls');
    const prevBtn = el('button', '', 'Prev');
    const nextBtn = el('button', '', 'Next');
    controls.appendChild(prevBtn);
    controls.appendChild(nextBtn);

    metaPanel.appendChild(captionEl);
    metaPanel.appendChild(indexEl);
    metaPanel.appendChild(controls);
    meta.appendChild(metaPanel);

    frame.appendChild(preview);
    frame.appendChild(meta);
    overlay.appendChild(frame);
    document.body.appendChild(overlay);

    let idx = 0;
    function show(i){
      idx = (i + items.length) % items.length;
      imgEl.src = items[idx].src;
      indexEl.textContent = `${idx+1} / ${items.length}`;
    }

    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); show(idx-1); });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); show(idx+1); });
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', keyHandler);

    function keyHandler(e){
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') show(idx-1);
      if (e.key === 'ArrowRight') show(idx+1);
    }

    function closeModal(){
      document.removeEventListener('keydown', keyHandler);
      overlay.remove();
    }
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
        lightboxFrame.innerHTML = `<iframe src="https://www.youtube.com/embed/${f.youtubeId}?autoplay=1" title="${f.title||''}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
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
  function closeLightbox(){
    lightbox.classList.remove('open');
    lightboxFrame.innerHTML = '';
  }

  /* ---------------- ABOUT ---------------- */
  document.getElementById('aboutHeading').textContent = C.about.heading;
  document.getElementById('aboutText').textContent = C.about.text;
  document.getElementById('aboutQuote').textContent = C.about.quote;
  const aboutPhoto = document.querySelector('.about-photo');
  aboutPhoto.classList.remove('ph-image');
  const aboutImg = new Image();
  aboutImg.src = 'images/about-photo.jpg';
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
