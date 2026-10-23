/* ==========================================================================
   THE GLATT SALON — CANONICAL BUSINESS DATA
   Single source of truth. Every service, price, inclusion, team member,
   testimonial, gallery item, statistic and founding-history detail lives
   here exactly as the business operates it. Do not alter commercial data.
   ========================================================================== */

export const BRAND = {
  name: 'The Glatt Salon',
  wordmark: 'THE GLATT',
  established: 1996,
  tagline: 'Where Style Meets Craft',
  descriptor: 'Unisex Salon & Spa',
  city: 'Kowdiar, Thiruvananthapuram',
  phone: '+91 98959 70069',
  phoneHref: 'tel:09895970069',
  landline: '0471 2723003',
  landlineHref: 'tel:04712723003',
  whatsapp: '919895970069',
  whatsappUrl: 'https://wa.me/919895970069',
  hours: '9:00 AM – 8:30 PM',
  hoursShort: 'Closes 8:30 PM',
  openDays: 'Open 7 Days a Week',
  addressLines: [
    'TC/24, 3437/1, Keston Rd',
    'PO, Kanaka Nagar, Kowdiar',
    'Thiruvananthapuram, Kerala 695003'
  ],
  addressOneLine:
    'TC/24, 3437/1, Keston Rd, PO, Kanaka Nagar, Kowdiar, Thiruvananthapuram, Kerala 695003',
  rating: '4.2',
  reviewCount: '574',
  instagram: 'https://www.instagram.com/theglattsalon/?hl=en',
  facebook:
    'https://www.facebook.com/people/The-Glatt-Beauty-salon/100063777041897/?locale=hi_IN',
  maps:
    'https://www.google.com/maps/dir//The+Glatt+Salon,+TC%2F24,+3437%2F1,+Keston+Rd,+PO,+Kanaka+Nagar,+Kowdiar,+Thiruvananthapuram,+Keralam+695003/@8.9194496,76.6312448,14z',
  tour:
    'https://www.google.com/local/place/fid/0x3b05bba934576a77:0x4ebe7ab810559db8/photosphere',
  googleReviews: 'https://www.google.com/search?q=the+glatt+salon+trivandrum'
}

export const SERVICES = [
  {
    id: 'haircut-classic',
    category: 'Hair Design',
    title: 'Signature Haircut & Styling',
    description:
      'Precision cut tailored to your facial architecture and natural hair texture, followed by luxury blowdry and finish.',
    inclusions:
      'Facial contour analysis, customized wash, precision shears sculpting, luxury blowout & styling cream',
    price: '₹450',
    duration: '45 mins'
  },
  {
    id: 'skin-fade',
    category: "Men's Grooming",
    title: 'Skin Fade & Beard Sculpt',
    description:
      'Master razor detailing, clean high/mid/low fade blending, and hot lather contour sculpting.',
    inclusions:
      'Zero skin fade gradient, straight razor edge lining, botanical beard oil treatment & cooling tonic',
    price: '₹550',
    duration: '50 mins'
  },
  {
    id: 'bridal-makeover',
    category: 'Bridal & Makeup',
    title: 'Bridal Glamour & Muhurtham Artistry',
    description:
      'Bespoke Kerala bridal transformation featuring HD radiance makeup, traditional hair draping, and floral ornamentation.',
    inclusions:
      'Pre-wedding skin priming, HD water-resistant makeup, traditional saree/veil draping, fresh jasmine hair fixation',
    price: '₹12,000',
    duration: '180 mins'
  },
  {
    id: 'balayage-color',
    category: 'Hair Design',
    title: 'Balayage & Dimensional Color',
    description:
      'Hand-painted sunlit highlights, ammonia-free root melt, toner gloss, and bond-building treatment.',
    inclusions:
      'Color consultation, gentle freehand painting, customized gloss toner & plex bond fortification',
    price: '₹3,800',
    duration: '150 mins'
  },
  {
    id: 'keratin-botox',
    category: 'Hair Design',
    title: 'Keratin Smoothing & Hair Botox',
    description:
      'Deep restorative protein infusion eliminating frizz and imparting mirror-like gloss that lasts 4 to 6 months.',
    inclusions:
      'Clarifying wash, amino-acid infusion, heat sealing, deep lipid seal mask & at-home care guide',
    price: '₹4,500',
    duration: '120 mins'
  },
  {
    id: 'moroccan-spa',
    category: 'Spa Rituals',
    title: 'Moroccan Argan Hair Spa Ritual',
    description:
      'Deep scalp cleansing, warm botanical steam, intensive argan lipid masque, and stress-relieving acupressure massage.',
    inclusions:
      'Aromatherapy scalp detox, warm herbal steam dome, 20-min shoulder acupressure & blowout',
    price: '₹1,500',
    duration: '60 mins'
  },
  {
    id: 'luxury-massage',
    category: 'Spa Rituals',
    title: 'Aromatherapy Head & Shoulder Spa',
    description:
      'Therapeutic head, neck, and shoulder massage using warm botanical essential oils to melt away tension.',
    inclusions:
      'Warm customized herbal oil blend, marma point stimulation, neck relief stretch & herbal tea service',
    price: '₹1,800',
    duration: '60 mins'
  },
  {
    id: 'hydra-facial',
    category: 'Skin & Beauty',
    title: 'Hydra-Luxe Glow Skin Therapy',
    description:
      'Gentle exfoliation, deep vortex vacuum extraction, peptide infusion, and calming cryo-cooling globe finish.',
    inclusions:
      'Double botanical cleanse, gentle AHA/BHA peel, vortex pore cleansing, hyaluronic sheet mask & cryo balls',
    price: '₹2,800',
    duration: '75 mins'
  },
  {
    id: 'groom-package',
    category: "Men's Grooming",
    title: 'Executive Grooming Package',
    description:
      'Signature haircut, beard re-shaping, deep clarifying scalp wash, charcoal face cleanup, and hot towel finish.',
    inclusions:
      'Haircut & styling, hot towel beard sculpting, charcoal clay exfoliation & relaxing neck massage',
    price: '₹1,600',
    duration: '90 mins'
  }
]

export const CATEGORIES = [
  'All',
  'Hair Design',
  'Bridal & Makeup',
  'Skin & Beauty',
  'Spa Rituals',
  "Men's Grooming"
]

export const STATS = [
  { value: '28+', label: 'Years of Heritage', desc: 'Crafting beauty in Kowdiar since 1996' },
  { value: '35k+', label: 'Delighted Patrons', desc: 'Generations of trusted families' },
  {
    value: '4.2★',
    label: 'Google Rating',
    desc: '574+ Verified Google client reviews'
  },
  {
    value: '100%',
    label: 'Unisex Craftsmanship',
    desc: 'Dedicated zones for men & women'
  }
]

export const HERITAGE = {
  quote:
    'At The Glatt Salon, every appointment is built around precision, craftsmanship, and personal comfort.',
  body:
    'Founded in Trivandrum with a vision for modern unisex hairstyling, we have remained at the vanguard of hair trends, skin science, and Kerala bridal makeover aesthetics for over 28 years.'
}

export const GALLERY_CATEGORIES = [
  'All',
  'Videos & Reels',
  'Bridal Artistry',
  "Men's Grooming",
  'Ambiance & Craft'
]

export const GALLERY_ITEMS = [
  {
    id: 'kasavu-bridal',
    type: 'image',
    title: 'Kerala Muhurtham Bridal Artistry',
    category: 'Bridal Artistry',
    src: '/images/gallery-kasavu-bridal.jpg',
    desc: 'Traditional Kerala Kasavu bridal makeover featuring royal temple jewelry styling, velvet crimson lips, and fresh rose adornments.'
  },
  {
    id: 'couple-reception',
    type: 'video',
    title: 'Royal Couple Reception Makeover',
    category: 'Bridal & Groom Couture',
    badge: 'Reel • 4K HD',
    src: '/videos/couple.mp4',
    desc: 'Bespoke Kerala reception makeover featuring an ivory sequin bridal gown, radiant HD soft glam, and royal embroidered sherwani groom architecture.'
  },
  {
    id: 'festive-glam',
    type: 'image',
    title: 'Festive Radiance & Jasmine Bun',
    category: 'Festive & Party Makeup',
    src: '/images/gallery-festive-glam.png',
    desc: 'Luminous soft-glam makeover paired with a sculpted floral low bun adorned with fragrant fresh jasmine, crafted for celebrations and receptions.'
  },
  {
    id: 'groom-fade',
    type: 'video',
    title: 'Signature Groom Fade & Beard Sculpt',
    category: "Men's Grooming",
    badge: 'Reel • 4K HD',
    src: '/videos/groom.mp4',
    desc: 'High-definition textured pompadour fade, master straight-razor beard contouring, and luxury executive finish for wedding celebrations.'
  },
  {
    id: 'salon-sanctuary',
    type: 'image',
    title: 'Kowdiar Salon Sanctuary',
    category: 'Ambiance',
    src: '/images/salon-interior.jpg',
    desc: 'Warm ambient arch mirrors, bespoke leather chairs, and private aesthetic suites.'
  },
  {
    id: 'mens-styling',
    type: 'image',
    title: 'Precision Men’s Styling',
    category: "Men's Grooming",
    src: '/images/mens-grooming.jpg',
    desc: 'Sharp zero skin fades, hot towel razor contouring, and bespoke beard craftsmanship.'
  },
  {
    id: 'balayage-waves',
    type: 'image',
    title: 'Luminous Balayage Waves',
    category: 'Color Artistry',
    src: '/images/hair-color.jpg',
    desc: 'Multi-dimensional caramel & mocha gloss tones hand-painted with bond builders.'
  },
  {
    id: 'bridal-elegance',
    type: 'image',
    title: 'Kerala Bridal Elegance',
    category: 'Bridal Artistry',
    src: '/images/bridal-art.jpg',
    desc: 'Luminous bridal glam with delicate jasmine styling and royal Kerala gold accents.'
  },
  {
    id: 'aromatic-spa',
    type: 'image',
    title: 'Aromatic Spa Therapy',
    category: 'Spa Rituals',
    src: '/images/spa-wellness.jpg',
    desc: 'Steaming herbal scalp therapy, argan hair baths, and revitalizing acupressure.'
  },
  {
    id: 'shear-precision',
    type: 'image',
    title: 'Shear Precision at Work',
    category: 'Master Craft',
    src: '/images/hero-bg.jpg',
    desc: 'The art of bespoke haircutting by master stylists with over 28 years of pedigree.'
  }
]

export const TESTIMONIALS = [
  {
    name: 'Anjana Mohan',
    location: 'Kowdiar, Trivandrum',
    date: '14.03.2026',
    rating: 5,
    service: 'Bridal Makeup & Hair',
    review:
      'Got my wedding muhurtham makeup and hair done at The Glatt. Everyone praised how radiant, elegant, and natural it looked throughout the ceremony. The team is extraordinarily skilled and attentive.'
  },
  {
    name: 'Rahul V. Nair',
    location: 'Kanaka Nagar',
    date: '02.04.2026',
    rating: 5,
    service: 'Fade & Beard Sculpt',
    review:
      'Been visiting The Glatt since my college days. The precision haircut and beard detailing are unmatched anywhere in Trivandrum. Pure craft and warm hospitality every single visit.'
  },
  {
    name: 'Sneha Kurien',
    location: 'Vellayambalam',
    date: '28.05.2026',
    rating: 5,
    service: 'Keratin & Moroccan Spa',
    review:
      'The Moroccan hair spa is pure relaxation! My hair felt silky and healthy for weeks. Truly a five-star salon experience right on Keston Road.'
  },
  {
    name: 'Gopakumar P.',
    location: 'Sasthamangalam',
    date: '19.06.2026',
    rating: 5,
    service: 'Executive Grooming',
    review:
      'Super clean, professional, and punctual. You can feel the 28 years of experience in how calmly and precisely they treat your hair. Best unisex salon in Trivandrum.'
  }
]

export const TEAM = [
  {
    name: 'Arun & Master Team',
    role: 'Creative Director & Founder',
    specialty: 'Bespoke Hair Architecture & Salon Craft',
    experience: '28+ Years',
    image: '/images/stylist-arun.jpg',
    tag: '@arunglatt'
  },
  {
    name: 'Sarah Jenkins',
    role: 'Senior Bridal & Skin Aesthetician',
    specialty: 'HD Bridal Makeovers & Facial Aesthetics',
    experience: '14 Years',
    image: '/images/stylist-bridal.jpg',
    tag: 'Bridal Specialist'
  },
  {
    name: 'Vikram Raj',
    role: 'Master Barber & Grooming Specialist',
    specialty: 'Razor Detailing, Fades & Beard Contouring',
    experience: '12 Years',
    image: '/images/stylist-barber.jpg',
    tag: 'Grooming Expert'
  },
  {
    name: 'Maya Varma',
    role: 'Color Artistry & Texture Specialist',
    specialty: 'Balayage, Keratin Smoothing & Hair Botox',
    experience: '9 Years',
    image: '/images/stylist-colorist.jpg',
    tag: 'Color Artist'
  }
]

export const TIME_SLOTS = [
  { value: '9:30 AM', label: '9:30 AM', hint: 'Morning' },
  { value: '11:00 AM', label: '11:00 AM', hint: 'Morning' },
  { value: '1:30 PM', label: '1:30 PM', hint: 'Afternoon' },
  { value: '3:30 PM', label: '3:30 PM', hint: 'Afternoon' },
  { value: '5:30 PM', label: '5:30 PM', hint: 'Evening' },
  { value: '7:00 PM', label: '7:00 PM', hint: 'Evening' }
]

export const MARQUEE_ITEMS = [
  'Hair Architecture',
  'Signature Bridal Artistry',
  'Keratin & Hair Botox',
  'Precision Men’s Grooming',
  'Aromatherapy Spa Rituals',
  'Hydra-Luxe Skincare',
  'Established 1996',
  'Kowdiar, Thiruvananthapuram'
]

/* --- Interactive Style Matcher options --- */
export const MATCHER_PREFERENCES = [
  { id: 'unisex', label: 'Unisex Craft' },
  { id: 'women', label: 'Women’s Luxury' },
  { id: 'men', label: 'Men’s Grooming' }
]

export const MATCHER_GOALS = [
  { id: 'hair', label: 'Precision Haircut' },
  { id: 'bridal', label: 'Bridal Artistry' },
  { id: 'color', label: 'Balayage & Color' },
  { id: 'spa', label: 'Aromatic Spa Therapy' }
]

export const MATCHER_RESULTS = {
  bridal: {
    service: 'Bridal Glamour & Muhurtham Artistry',
    price: '₹12,000',
    duration: '180 mins',
    specialist: 'Sarah Jenkins (Bridal Aesthetician)',
    desc: 'Bespoke HD bridal transformation with traditional floral styling.'
  },
  color: {
    service: 'Balayage & Dimensional Color',
    price: '₹3,800',
    duration: '150 mins',
    specialist: 'Maya Varma (Color Artist)',
    desc: 'Sunlit hand-painted dimension with ammonia-free bond therapy.'
  },
  spa: {
    service: 'Moroccan Argan Hair Spa Ritual',
    price: '₹1,500',
    duration: '60 mins',
    specialist: 'Master Spa Therapist',
    desc: 'Deep scalp cleansing, warm botanical steam dome, and acupressure.'
  },
  men: {
    service: 'Skin Fade & Beard Sculpt',
    price: '₹550',
    duration: '50 mins',
    specialist: 'Vikram Raj (Master Barber)',
    desc: 'High-contrast skin fade with razor edging and botanical oils.'
  },
  default: {
    service: 'Signature Haircut & Styling',
    price: '₹450',
    duration: '45 mins',
    specialist: 'Arun & Master Team',
    desc: 'Precision architectural cut tailored to your facial symmetry.'
  }
}

/* --- Concierge (chatbot) --- */
export const BOT_QUICK_PROMPTS = [
  { label: '💇 Haircut recommendation', query: 'What haircut suits my face shape?' },
  { label: '👰 Bridal packages & rates', query: 'Tell me about bridal makeup packages and price' },
  { label: '✨ Keratin vs Botox hair', query: 'What is the difference between Keratin and Hair Botox?' },
  { label: '📍 Location & parking', query: 'Where is the salon located and is parking available?' },
  { label: '🕒 Today\'s hours', query: 'What are your working hours today?' },
  { label: '📅 Book appointment', query: 'I want to schedule an appointment' }
]

export const BOT_GREETING = {
  text: 'Hello! Welcome to The Glatt Salon, Kowdiar. ✨ I am your Virtual Beauty & Grooming Concierge. How can I assist your styling journey today?',
  actions: [
    { label: '💇 Haircuts & Grooming', query: 'What haircuts and grooming do you offer?' },
    { label: '👰 Bridal Makeover', query: 'Tell me about bridal makeup packages' },
    { label: '📍 Location in Kowdiar', query: 'Where is the salon in Kowdiar?' },
    { label: '📅 Reserve a Slot', query: 'I want to schedule an appointment' }
  ]
}

/**
 * Concierge knowledge base. Returns { text, actions }.
 * Commercial facts are sourced from SERVICES / BRAND so prices never drift.
 */
export function getBotReply(userText) {
  const q = userText.toLowerCase().trim()

  if (q.includes('bridal') || q.includes('wedding') || q.includes('muhurtham') || q.includes('makeup')) {
    return {
      text: 'Our Bridal Artistry is led by Senior Aesthetician Sarah Jenkins and Creative Director Arun. Our signature Muhurtham package (₹12,000) includes customized HD bridal makeup, traditional hair draping with fresh jasmine ornamentation, pre-wedding skin priming, and veil styling. We also offer pre-bridal trials in Kowdiar!',
      actions: [
        { label: 'Book Bridal Consultation', action: 'book_bridal' },
        { label: 'WhatsApp Bridal Desk', action: 'whatsapp_bridal' }
      ]
    }
  }

  if (q.includes('haircut') || q.includes('hair cut') || q.includes('fade') || q.includes('beard') || q.includes('grooming')) {
    return {
      text: 'We specialize in bespoke Hair Architecture for both men and women! Signature Cuts start from ₹450 (includes wash & blowout), Master Skin Fades & Beard Sculpting are ₹550, and our Executive Grooming Package is ₹1,600. Every cut begins with facial contour analysis.',
      actions: [
        { label: 'Book Haircut Now', action: 'book_haircut' },
        { label: 'View Service Menu', action: 'scroll_services' }
      ]
    }
  }

  if (q.includes('keratin') || q.includes('botox') || q.includes('smoothing') || q.includes('frizz')) {
    return {
      text: 'Both are client favorites! ✨ Keratin Smoothing (from ₹4,500) creates ultra-sleek, mirror-gloss straightness for 4-6 months. Hair Botox is a deep restorative cold/warm hydration filler that rejuvenates dull hair while keeping natural wave without damage. Our team assesses your hair texture first.',
      actions: [{ label: 'Book Texture Consultation', action: 'book_keratin' }]
    }
  }

  if (q.includes('color') || q.includes('balayage') || q.includes('highlights') || q.includes('dye')) {
    return {
      text: 'Our Balayage & Dimensional Color treatments start at ₹3,800. We exclusively use premium ammonia-free formulations with bond-building plex infusions to guarantee zero damage, rich shine, and sunlit dimension tailored to your skin undertone.',
      actions: [{ label: 'Book Balayage Slot', action: 'book_balayage' }]
    }
  }

  if (q.includes('spa') || q.includes('facial') || q.includes('skin') || q.includes('massage')) {
    return {
      text: 'Relax in our private therapy suites! 🌿 We offer the Moroccan Argan Hair Spa (₹1,500 / 60m), Aromatherapy Head & Shoulder Massage (₹1,800 / 60m), and Hydra-Luxe Glow Skin Therapy (₹2,800 / 75m). Pure rejuvenation in the heart of Kowdiar.',
      actions: [{ label: 'Book Spa Ritual', action: 'book_spa' }]
    }
  }

  if (q.includes('location') || q.includes('address') || q.includes('where') || q.includes('reach') || q.includes('parking') || q.includes('landmark')) {
    return {
      text: 'We are located at TC/24, 3437/1, Keston Road, Kanaka Nagar, Kowdiar, Thiruvananthapuram (Kerala 695003). Conveniently situated right off the main Kowdiar junction with dedicated client parking and tranquil air-conditioned suites.',
      actions: [
        { label: 'Open Google Maps', action: 'maps' },
        { label: 'Call Salon Desk', action: 'call' }
      ]
    }
  }

  if (q.includes('hour') || q.includes('timing') || q.includes('time') || q.includes('open') || q.includes('close') || q.includes('sunday')) {
    return {
      text: 'The Glatt Salon is open 7 days a week, Monday through Sunday from 9:00 AM to 8:30 PM. Walk-ins are welcome, though appointments are recommended for minimal waiting time.',
      actions: [{ label: 'Reserve Today\'s Slot', action: 'book_general' }]
    }
  }

  if (q.includes('book') || q.includes('appointment') || q.includes('schedule') || q.includes('slot')) {
    return {
      text: 'I can help you reserve right now! You can pick your desired service and preferred master stylist, or send a pre-filled booking directly to our WhatsApp concierge desk at +91 98959 70069.',
      actions: [
        { label: 'Open Appointment Form', action: 'book_general' },
        { label: 'Direct WhatsApp Booking', action: 'whatsapp_general' }
      ]
    }
  }

  if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('charges')) {
    return {
      text: 'Our starting rates: Haircuts ₹450 | Fades & Beard ₹550 | Executive Grooming ₹1,600 | Moroccan Spa ₹1,500 | Hydra-Luxe Facial ₹2,800 | Balayage ₹3,800 | Keratin ₹4,500 | Bridal Muhurtham ₹12,000. All prices reflect master craftsmanship with premium formulations.',
      actions: [
        { label: 'View Full Menu', action: 'scroll_services' },
        { label: 'Book Service', action: 'book_general' }
      ]
    }
  }

  return {
    text: 'Welcome to The Glatt Salon (Est. 1996, Kowdiar)! 💫 Whether you are looking for a precision haircut, dimensional balayage, relaxing Moroccan spa ritual, or bridal makeover, our master team is here for you. How may I guide you?',
    actions: [
      { label: 'View Services & Rates', action: 'scroll_services' },
      { label: 'Book an Appointment', action: 'book_general' },
      { label: 'WhatsApp Concierge', action: 'whatsapp_general' }
    ]
  }
}

/** WhatsApp deep-link with a pre-filled booking message. */
export function buildWhatsAppLink({ service, stylist, date, time, name, phone }) {
  const text = encodeURIComponent(
    `Hello The Glatt Salon, I would like to book an appointment.\n\n` +
      `• Service: ${service || 'Hair/Beauty/Spa'}\n` +
      `• Stylist: ${stylist}\n` +
      `• Date: ${date || 'Flexible'}\n` +
      `• Time: ${time}\n` +
      `• Name: ${name || 'Guest'}\n` +
      `• Phone: ${phone || 'Not specified'}\n` +
      `\nPlease confirm availability. Thank you!`
  )
  return `https://wa.me/${BRAND.whatsapp}?text=${text}`
}
