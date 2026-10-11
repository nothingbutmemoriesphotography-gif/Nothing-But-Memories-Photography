/* =====================================================================
   NOTHING BUT MEMORIES PHOTOGRAPHY — CONTENT FILE
   =====================================================================
   This is the ONLY file you should need to edit to update your website.
   Everything on the site — text, photos, videos, testimonials — is
   listed below in plain English. Do not touch index.html, style.css
   or main.js unless you know what you're doing.

   HOW TO EDIT SAFELY:
   1. Open this file in Notepad (Windows) or TextEdit (Mac) — set
      TextEdit to "Plain Text" mode (Format > Make Plain Text).
   2. Only change the text INSIDE the quotes " ... "
   3. Never delete a comma, a quote mark, or a curly bracket { }
      unless you're removing a whole item (see examples below).
   4. Save the file and refresh the website in your browser to see
      the change.

   Full step-by-step instructions (adding photos, videos, hosting the
   site online) are in the README.txt file in this same folder.
   ===================================================================== */

const SITE_CONTENT = {

  // -------------------------------------------------------------------
  // 1. BUSINESS DETAILS
  // -------------------------------------------------------------------
  business: {
    name: "Nothing But Memories Photography",

    // Your WhatsApp number, WITH country code, NO spaces, NO + sign.
    // Example for an Indian number 98765 43210 -> "919876543210"
    whatsappNumber: "918867917134",   // <-- REPLACE WITH YOUR REAL NUMBER

    email: "nothingbutmemoriesphotography@gmail.com",

    // Optional. Leave the quotes empty "" if you don't have one yet.
    instagramUrl: "",

    // The logo shown in the top menu and footer. A simple monogram logo
    // is already made for you at images/logo/logo-mark.svg — you don't
    // need to do anything. If you later get a proper logo designed
    // (by a designer, on Canva, Fiverr, etc.), just put that file inside
    // the images/logo folder and change the file name below to match.
    // PNG, JPG or SVG all work.
    logoImage: "images/logo/Nothing but Memories 1.png?v=2"
    // Optional client-side email sending configuration (EmailJS)
    // To enable: set provider to "emailjs" and fill serviceId, templateId and userId
    , emailService: {
      provider: "emailjs", // set to "emailjs" to enable
      serviceId: "service_b9xn2qf",
      templateId: "template_us7bfqs",
      userId: "bK9SZJrHeu9L41cFs"
    }
  },

  // -------------------------------------------------------------------
  // 2. HERO SECTION (the big full-screen images at the very top)
  // -------------------------------------------------------------------
  hero: {
    heading: "Capture. Create. Cherish.",
    subheading: "Turning your biggest days into the memories you'll return to for the rest of your life.",

    // Add as many photos as you like. They will fade in and out as a slideshow.
    // "src" is the file path. Put your photo files inside the /images/hero folder
    // and just change the file name below to match.
    slides: [
      { src: "images/hero/hero-1.jpg", alt: "Wedding couple portrait" },
      { src: "images/hero/hero-2.jpg", alt: "Candid wedding moment" },
      { src: "images/hero/hero-3.jpg", alt: "Bride and groom close up" },
      { src: "images/hero/hero-4.jpg", alt: "Bride and groom close up" },
      { src: "images/hero/hero-5.jpg", alt: "Bride and groom close up" }

    ]
  },

  // -------------------------------------------------------------------
  // 3. THE THREE PILLARS — Create / Capture / Cherish
  // -------------------------------------------------------------------
  pillars: [
    { word: "Capture", text: "In the moment, unposed, unrepeatable — we're there for the laughter, the tears and everything between." },
    { word: "Create", text: "We plan every frame around your story, your families and the little details you'll want to remember." },
    { word: "Cherish", text: "Beautifully edited photographs and films you'll come back to for a lifetime, and hand down for another." }
  ],

  // -------------------------------------------------------------------
  // 4. GALLERY — your portfolio photos
  // -------------------------------------------------------------------
  // "category" is used to create the filter buttons at the top of the
  // gallery (e.g. "Wedding", "Pre-Wedding", "Portrait"). Use the same
  // category spelling for photos that belong together.
  //
  // TO ADD A PHOTO: copy one whole { ... } block below, paste it above
  // the closing bracket ], change the file name, category and caption.
  // TO REMOVE A PHOTO: delete its whole { ... } block.
  gallery: [
    { src: "images/gallery/wedding-01.webp", category: "Wedding", caption: "Riya & Arjun, Udaipur", groupFolder: "images/gallery/riya-arjun-udaipur", groupCount: 8 },
    { src: "images/gallery/wedding-02.webp", category: "Wedding", caption: "Riya & Arjun, Udaipur" },
    { src: "images/gallery/wedding-03.webp", category: "Wedding", caption: "Meher & Kabir, Goa", groupFolder: "images/gallery/meher-kabir-goa", groupCount: 7 },
    { src: "images/gallery/wedding-04.webp", category: "Pre-Wedding", caption: "Ananya & Vivaan", groupFolder: "images/gallery/ananya-vivaan", groupCount: 7 },
    { src: "images/gallery/wedding-05.webp", category: "Pre-Wedding", caption: "Ananya & Vivaan" },
    { src: "images/gallery/wedding-06.webp", category: "Portrait", caption: "Family Portrait, Delhi", groupFolder: "images/gallery/family-portrait-delhi", groupCount: 5 },
    { src: "images/gallery/wedding-07.webp", category: "Candid", caption: "Sangeet Night, Jaipur", groupFolder: "images/gallery/sangeet-night-jaipur", groupCount: 6 },
    { src: "images/gallery/wedding-08.webp", category: "Candid", caption: "Reception, Bengaluru", groupFolder: "images/gallery/reception-bengaluru", groupCount: 6 },
    { src: "images/gallery/wedding-09.webp", category: "Wedding", caption: "Simran & Rohan, Jodhpur", groupFolder: "images/gallery/simran-rohan-jodhpur", groupCount: 7 },
    { src: "images/gallery/wedding-10.webp", category: "Portrait", caption: "Soundarya & Nagesh", groupFolder: "images/gallery/Soundarya & Nagesh", groupCount: 5 },
    { src: "images/gallery/wedding-11.webp", category: "Candid", caption: "Reception, Bengaluru", groupFolder: "images/gallery/reception-bengaluru", groupCount: 6 },
    { src: "images/gallery/wedding-12.webp", category: "Wedding", caption: "Simran & Rohan, Jodhpur", groupFolder: "images/gallery/simran-rohan-jodhpur", groupCount: 7 },
    { src: "images/gallery/wedding-13.webp", category: "Portrait", caption: "Soundarya & Nagesh", groupFolder: "images/gallery/Soundarya & Nagesh", groupCount: 5 },
    { src: "images/gallery/wedding-14.webp", category: "Destination", caption: "Sunset vows in Bali" },
    { src: "images/gallery/wedding-15.webp", category: "Candid", caption: "Laughter under the mandap" },
    { src: "images/gallery/wedding-16.webp", category: "Portrait", caption: "Bride's quiet moment" },
    { src: "images/gallery/wedding-17.webp", category: "Pre-Wedding", caption: "Wedding glow by the lake" },
    { src: "images/gallery/wedding-18.webp", category: "Wedding", caption: "First dance sparks" },
    { src: "images/gallery/wedding-19.webp", category: "Candid", caption: "Family cheers at the reception" },
    { src: "images/gallery/wedding-20.webp", category: "Portrait", caption: "Couple portrait in the garden" },
    { src: "images/gallery/wedding-21.webp", category: "Destination", caption: "Rings and ocean breeze" },
    { src: "images/gallery/wedding-22.webp", category: "Wedding", caption: "Ceremony details and decor" },
    { src: "images/gallery/wedding-23.webp", category: "Candid", caption: "Joy captured between vows" },
    { src: "images/gallery/wedding-24.webp", category: "Portrait", caption: "Bride’s laughter in the sun" },
    { src: "images/gallery/wedding-25.webp", category: "Pre-Wedding", caption: "Couple silhouettes by the sea" },
    { src: "images/gallery/wedding-26.webp", category: "Wedding", caption: "Bridal entrance under petals" },
    { src: "images/gallery/wedding-27.webp", category: "Candid", caption: "Toast reactions in motion" },
    { src: "images/gallery/wedding-28.webp", category: "Portrait", caption: "Groom’s quiet moment" },
    { src: "images/gallery/wedding-29.webp", category: "Destination", caption: "Sunset ceremony shadows" },
    { src: "images/gallery/wedding-30.webp", category: "Wedding", caption: "Decor highlights and lanterns" },
    { src: "images/gallery/wedding-31.webp", category: "Candid", caption: "First look smiles" },
    { src: "images/gallery/wedding-32.webp", category: "Portrait", caption: "Couple under a floral arch" },
    { src: "images/gallery/wedding-33.webp", category: "Pre-Wedding", caption: "Playful moments before the day" },
    { src: "images/gallery/wedding-34.webp", category: "Wedding", caption: "Golden hour vows" }

  ],

  // -------------------------------------------------------------------
  // 5. FILMS — your wedding videos
  // -------------------------------------------------------------------
  // The easiest way to add a video: upload it to YouTube (you can set
  // it to "Unlisted" so it won't show up in public search), then copy
  // just the ID from the video's URL.
  // Example: https://www.youtube.com/watch?v=ABC123xyz  -> youtubeId: "ABC123xyz"
  //
  // If you'd rather use your own video file instead of YouTube, put the
  // file inside the /videos folder and use "videoFile" instead of
  // "youtubeId" (see the commented example below).
  films: [
    { title: "Shirisha & Pavan — Engagement Teaser", youtubeId: "ngbt_i-SYrc"},
    { title: "Lavanya & Jashwanth — Teaser", youtubeId: "T0dLSq0O8SE"},
    { title: "Sindhu & Srinivas - Teaser", youtubeId: "A0MQGHynz1Y"},
    { title: "Lavanya & Jashwanth — Wedding Film", youtubeId: "IYEbRwKQljE"},
    { title: "Divya & Abhishek - Wedding Film", youtubeId: "3xE6PD6RwnM"},
    { title: "Sindhu & Srinivas - Wedding Film", youtubeId: "vmEV4yW3i6o"},
    // { title: "Rakshu & Vishal — Haldi Film", youtubeId: "B3WbXm9X6XA"},
    // { title: "Rakshu & Vishal — Wedding Teaser", youtubeId: "RBznxdC58As"},
    // { title: "Rakshu & Vishal — Engagement Film", youtubeId: "czE85Y2lqYE"},
    { title: "Sahana & Vikas — Wedding Film", youtubeId: "VYg_qYfzRE0"},
    { title: "Sahana & Vikas — Wedding Teaser", youtubeId: "8tVZf8gMq1Y"}

    // Example using your own video file instead of YouTube:
    // { title: "Simran & Rohan — Highlights", videoFile: "videos/simran-rohan.mp4", thumbnail: "images/gallery/wedding-04.jpg" }
  ],

  // -------------------------------------------------------------------
  // 6. ABOUT SECTION
  // -------------------------------------------------------------------
  about: {
    heading: "Behind the Lens: The Journey of Nothing But Memories",
    introduction: "We didn’t start with expensive lenses, fancy studios, or high-end gear. We started with a shared dream, an endless passion for storytelling, and a deep belief that every genuine smile deserves to live forever.",
    origin: "The photo you see here isn’t just an image in our portfolio; it is where our story began. Captured at our very first wedding, we shot this without owning a single camera of our own. Armed only with borrowed equipment, raw nervous excitement, and pure passion, we stepped into the world of wedding photography.",
    profession: "Software Engineers by profession, Photographers by heart.",
    approach: "By day, we build logic and write code; by weekend, we preserve soul, romance, and unscripted joy. Our background in engineering gives us precision, discipline, and an obsession with detail. But our passion for photography allows us to freeze moments that words often fail to express: the quiet tear during a vow, the uncontrolled laughter among best friends, and the warm embrace of family.",
    highlightsHeading: "Why Our Journey Matters to Your Story",
    highlights: [
      { title: "Pure & Authentic Passion", text: "Because we started from absolute zero, every wedding we photograph is a privilege we never take for granted." },
      { title: "Precision Meets Emotion", text: "We bring an engineer’s eye for perfection and an artist’s heart for fleeting, beautiful moments." },
      { title: "100% Candid & Natural", text: "No forced poses, no stiffness—just you, your loved ones, and authentic memories." }
    ],
    quote: "We don’t just take pictures—we preserve the moments you’ll want to hold onto forever.",
    founders: "Sagar Purohit & Srinivas Thiruvattur",
    founderRole: "Founders & Lead Photographers, Nothing But Memories"
    // Put your own photo at images/about-photo.webp
  },

  // -------------------------------------------------------------------
  // 7. TESTIMONIALS
  // -------------------------------------------------------------------
  testimonials: [
    { quote: "They disappeared into the background and somehow captured every single moment we would have wanted to remember. We cried watching the film.", names: "Rakshu & Vishal", image: "images/testimonials/client1.jpg" },
    { quote: "Warm, unobtrusive and incredibly talented. Our families are still talking about how comfortable they felt in front of the camera.", names: "Aishwarya & Shivu", image: "images/testimonials/client2.jpg" },
    { quote: "Worth every rupee. The photos feel like us — not like a catalogue.", names: "Soundarya & Nagesh", image: "images/testimonials/client3.jpg" }
  ]

};
