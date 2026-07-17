====================================================================
NOTHING BUT MEMORIES PHOTOGRAPHY — WEBSITE GUIDE
====================================================================
No coding needed. Read this once and you'll be able to manage
everything yourself.

--------------------------------------------------------------------
1. HOW TO VIEW THE SITE ON YOUR COMPUTER
--------------------------------------------------------------------
Just double-click "index.html". It opens in your web browser
(Chrome/Edge/Safari) and you'll see the site exactly as visitors will.
You need an internet connection open so the fonts load properly.

Every time you make a change below, save the file and press refresh
(Ctrl+R or Cmd+R) in the browser tab to see it update.

--------------------------------------------------------------------
2. HOW TO ADD OR CHANGE PHOTOS
--------------------------------------------------------------------
Right now the site is a template — every photo is showing a plain
placeholder tile (a green box with a little camera icon) with a file
name written on it, like "wedding-01.jpg". That's telling you exactly
what file to add.

Step by step:
  a) Put your photo file inside the matching folder:
       - Homepage slideshow photos -> images/hero/
       - Portfolio/gallery photos  -> images/gallery/
       - Your own photographer photo -> images/about-photo.jpg
  b) Name the file EXACTLY the way it's written on the placeholder,
     or open js/content.js and change the file name listed there to
     match whatever you named your photo.
  c) Refresh the browser. The placeholder becomes your real photo.

TO ADD A NEW PHOTO to the gallery (not just replace one):
  - Open js/content.js
  - Find the "gallery:" list
  - Copy one whole line that looks like:
      { src: "images/gallery/wedding-04.jpg", category: "Wedding", caption: "Simran & Rohan, Jodhpur" },
  - Paste it as a new line, change the file name, category and caption.
  - Save the file and put the matching photo in images/gallery/.

TO REMOVE A PHOTO: delete its whole line from the list in content.js.

Tip: for the best-looking gallery, use photos that are roughly the
same shape (portrait orientation, e.g. 1600 x 2000 pixels works well).

--------------------------------------------------------------------
3. HOW TO ADD VIDEOS / WEDDING FILMS
--------------------------------------------------------------------
The easiest way (recommended):
  a) Upload your wedding film to YouTube. When uploading, set the
     Visibility to "Unlisted" — this means it will NOT show up in
     YouTube search or on your channel, only people with the exact
     link (or through your website) can see it.
  b) Copy the video's ID from the address bar. If the link is:
       https://www.youtube.com/watch?v=AbCdEfGhIjK
     then the ID is the part after "v=", i.e.  AbCdEfGhIjK
  c) Open js/content.js, find the "films:" list, and paste that ID
     into the matching youtubeId: "" field, e.g.
       { title: "Riya & Arjun — Wedding Film", youtubeId: "AbCdEfGhIjK" }
  d) Save and refresh. A thumbnail with a play button will appear —
     clicking it plays the video right on your site.

If you'd rather not use YouTube, you can add your own video file
directly into the /videos folder and reference it with "videoFile"
instead of "youtubeId" — there's a commented example already inside
content.js showing exactly how to write it.

--------------------------------------------------------------------
4. HOW TO CHANGE ANY TEXT (headings, about section, testimonials)
--------------------------------------------------------------------
Open js/content.js in Notepad or TextEdit. Every piece of text on the
site is written there in plain English, labelled with a comment
explaining what it is. Just change the words inside the quote marks
" " and save. Do not delete the quote marks, commas or curly brackets.

--------------------------------------------------------------------
5. YOUR LOGO
--------------------------------------------------------------------
A logo has already been made for you: a gold ring with the monogram
"NBM" inside, at images/logo/logo-mark.svg. It shows up in the top
menu, the footer, and the browser tab icon — you don't need to do
anything for it to work.

If you'd like your own logo instead (designed by you, a designer, or
made on a site like Canva):
  a) Save your logo file inside the images/logo folder — PNG, JPG or
     SVG all work. A square image with a transparent background looks
     best (roughly 200 x 200 pixels or larger).
  b) Open js/content.js, find "logoImage:" near the top, and change
     the file name to match your new logo, e.g.
       logoImage: "images/logo/my-new-logo.png"
  c) Save and refresh the browser — it updates everywhere at once
     (menu, footer and browser tab).

--------------------------------------------------------------------
6. HOW ENQUIRIES WORK
--------------------------------------------------------------------
The "Enquire" section has two buttons:
  - "Chat on WhatsApp" opens WhatsApp with a ready-made message
    template (name, date, venue, events, package) already typed in
    for the client to fill in and send to you.
  - "Email Us" opens the client's email app addressed to
    nothingbutmemoriesphotography@gmail.com with the same template.

IMPORTANT — before you publish the site, open js/content.js and set
your real WhatsApp number in the "whatsappNumber" field:
  whatsappNumber: "911234567890"
Use the country code with no + sign and no spaces. For an Indian
number like 98765 43210, write: "919876543210"

--------------------------------------------------------------------
7. HOW TO PUT THE SITE ONLINE (so clients can visit it)
--------------------------------------------------------------------
The simplest free option is Netlify:
  a) Go to https://app.netlify.com/drop in your browser.
  b) Drag this whole folder into the page.
  c) Netlify gives you a live web address in a few seconds.
  d) You can later connect your own domain name (e.g.
     nothingbutmemoriesphotography.com) from Netlify's site settings
     if you buy one from a domain registrar like GoDaddy or Google
     Domains.

You do not need to touch any code to do this — just drag and drop.

--------------------------------------------------------------------
8. FILES IN THIS FOLDER
--------------------------------------------------------------------
index.html        The page structure. Don't edit unless you know HTML.
css/style.css      The look and feel (colours, fonts, layout).
js/content.js      <-- YOU EDIT THIS ONE for text, photos, videos.
js/main.js         Makes the site work. Don't edit.
images/            Put your photos here, in the matching sub-folder.
images/logo/       Your logo lives here (logo-mark.svg by default).
videos/            Put your own video files here (optional).

Questions or stuck? Any web developer can pick this up easily since
it's a standard, plain HTML/CSS/JavaScript website — no special
software required.
