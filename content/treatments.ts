import type { ImageId } from "@/lib/media";

export type Treatment = {
  slug: string;
  name: string;
  short: string;
  keyword: string;
  image: ImageId;
  whatItIs: string;
  whoNeedsIt: string[];
  steps: { title: string; text: string }[];
  duration: string;
  visits: string;
  /** DEMO price in rupees */
  priceFrom: number;
  priceNote: string;
  faqs: { q: string; a: string }[];
};

// DEMO — treatment list and prices are placeholders for the doctor to confirm.
export const treatments: Treatment[] = [
  {
    slug: "checkup-cleaning",
    name: "Check-up and cleaning",
    short: "A full check, gentle scaling and polishing, and a clear plan.",
    keyword: "Dental check-up and cleaning in Anna Nagar, Madurai",
    image: "treat-checkup-cleaning",
    whatItIs:
      "A careful look at every tooth and your gums, X-rays only if needed, then a gentle clean that removes tartar and stains. You leave with a written note of anything that needs attention, and what can wait.",
    whoNeedsIt: [
      "Anyone who hasn’t had a check-up in the last six months",
      "Bleeding gums when brushing, or bad breath that doesn’t go away",
      "Before starting braces, aligners or whitening",
    ],
    steps: [
      { title: "Check", text: "We look at teeth, gums and bite, and take an X-ray only if something needs a closer look." },
      { title: "Clean", text: "Ultrasonic scaling removes tartar, then a soft polish lifts surface stains." },
      { title: "Plan", text: "You get a short written summary with prices for anything we recommend." },
    ],
    duration: "40–60 minutes",
    visits: "1 visit",
    priceFrom: 500,
    priceNote: "Check-up from ₹500; scaling and polishing from ₹1,200",
    faqs: [
      { q: "Does cleaning damage enamel?", a: "No. Scaling removes hardened tartar that brushing can’t. Enamel is far harder than the deposits being removed." },
      { q: "How often should I come?", a: "Most adults every six months. If your gums need extra care we may suggest every three or four months for a while." },
      { q: "Will it hurt?", a: "Most people feel vibration and cold water, not pain. If your gums are sensitive we can numb the area first." },
    ],
  },
  {
    slug: "root-canal",
    name: "Root canal treatment",
    short: "Save a painful, infected tooth instead of removing it.",
    keyword: "Root canal treatment in Anna Nagar, Madurai",
    image: "treat-root-canal",
    whatItIs:
      "When the nerve inside a tooth is infected or inflamed, a root canal cleans out the inside of the tooth, disinfects it and seals it. The tooth stays in your mouth and the pain goes away. Most teeth then need a crown to protect them.",
    whoNeedsIt: [
      "Toothache that wakes you at night or lingers after hot or cold",
      "Swelling or a small pimple on the gum near a tooth",
      "A deep cavity or a cracked tooth",
    ],
    steps: [
      { title: "Diagnose", text: "An X-ray and a few simple tests confirm which tooth is affected." },
      { title: "Numb and clean", text: "The tooth is fully numbed. Fine instruments clean and shape the canals." },
      { title: "Seal", text: "The canals are filled and sealed so bacteria can’t return." },
      { title: "Protect", text: "A crown is fitted, usually a week or two later, to stop the tooth cracking." },
    ],
    duration: "60–90 minutes per visit",
    visits: "1–2 visits, plus crown",
    priceFrom: 4500,
    priceNote: "From ₹4,500 per tooth; crown priced separately",
    faqs: [
      { q: "Is a root canal painful?", a: "The tooth is fully numbed, so the treatment feels much like a filling. It usually relieves the pain you came in with." },
      { q: "Why not just remove the tooth?", a: "Your own tooth chews better and keeps neighbouring teeth from drifting. Replacing a lost tooth later costs more." },
      { q: "Do I always need a crown?", a: "Back teeth almost always do, because a treated tooth becomes brittle. We’ll tell you honestly if yours doesn’t." },
    ],
  },
  {
    slug: "implants",
    name: "Dental implants",
    short: "A fixed, natural-looking replacement for a missing tooth.",
    keyword: "Dental implants in Anna Nagar, Madurai",
    image: "treat-implants",
    whatItIs:
      "An implant is a small titanium post placed in the jaw where a tooth is missing. Once it has bonded with the bone, a porcelain crown is fitted on top. It looks, feels and chews like a natural tooth and doesn’t touch the teeth beside it.",
    whoNeedsIt: [
      "One or more missing teeth",
      "Loose dentures that make eating difficult",
      "A tooth that can’t be saved and needs removing",
    ],
    steps: [
      { title: "Assess", text: "A 3D scan checks bone height and nearby nerves, and we agree the plan and price." },
      { title: "Place", text: "The post is placed under local anaesthetic, usually in under an hour." },
      { title: "Heal", text: "Two to four months for the bone to bond with the implant. A temporary tooth can be worn." },
      { title: "Restore", text: "A porcelain crown is made to match your teeth and fixed on top." },
    ],
    duration: "3–5 months start to finish",
    visits: "3–4 visits",
    priceFrom: 25000,
    priceNote: "From ₹25,000 per implant including crown",
    faqs: [
      { q: "Am I too old for implants?", a: "Age itself isn’t a barrier. Healthy bone and well-controlled general health matter more, and we check both first." },
      { q: "How long do implants last?", a: "With good cleaning and regular check-ups, implants commonly last many years. The crown on top may need replacing over time." },
      { q: "Does it hurt afterwards?", a: "Most people need only simple painkillers for a day or two." },
    ],
  },
  {
    slug: "braces-aligners",
    name: "Braces and clear aligners",
    short: "Straighter teeth with metal, ceramic or near-invisible aligners.",
    keyword: "Braces and clear aligners in Anna Nagar, Madurai",
    image: "treat-braces-aligners",
    whatItIs:
      "Braces and aligners gently move teeth into better positions over months. Braces are fixed to the teeth; clear aligners are removable trays you change every one to two weeks. We help you choose the option that suits your teeth, lifestyle and budget.",
    whoNeedsIt: [
      "Crowded, gapped or crooked teeth",
      "A bite where upper and lower teeth don’t meet well",
      "Teenagers and adults: it’s never too late",
    ],
    steps: [
      { title: "Consult", text: "Photos, a scan and X-rays, then a clear comparison of braces and aligners with prices." },
      { title: "Fit", text: "Braces are fitted in one visit, or your first set of aligners is handed over with instructions." },
      { title: "Adjust", text: "Short check-ins every 4–8 weeks to keep things on track." },
      { title: "Retain", text: "Retainers keep your new smile in place once treatment ends." },
    ],
    duration: "Usually 9–24 months",
    visits: "Check-ins every 4–8 weeks",
    priceFrom: 35000,
    priceNote: "Braces from ₹35,000; aligners quoted after your scan",
    faqs: [
      { q: "Are aligners as effective as braces?", a: "For many cases, yes. Some complex bites still move more predictably with braces, and we’ll say so if that’s you." },
      { q: "Do I have to wear aligners all day?", a: "About 22 hours a day. You take them out to eat and brush." },
      { q: "What is the right age for braces?", a: "An orthodontic check around age 7–9 is useful, but adults of any age can straighten their teeth." },
    ],
  },
  {
    slug: "whitening-veneers",
    name: "Whitening and veneers",
    short: "Brighter, even teeth with a natural, not artificial, finish.",
    keyword: "Teeth whitening and veneers in Anna Nagar, Madurai",
    image: "treat-whitening-veneers",
    whatItIs:
      "Professional whitening safely lightens natural teeth by several shades. Veneers are thin porcelain shells bonded to the front of teeth to change their shape, colour or small gaps. We aim for a result that looks like you, only brighter.",
    whoNeedsIt: [
      "Teeth stained by tea, coffee or age",
      "Chipped, uneven or slightly gapped front teeth",
      "Before a wedding or an important event",
    ],
    steps: [
      { title: "Shade check", text: "We record your current shade and talk about a realistic target." },
      { title: "Clean", text: "A clean first, so whitening works evenly." },
      { title: "Whiten or prepare", text: "In-clinic whitening in one visit, or a minimal preparation for veneers." },
      { title: "Finish", text: "Veneers are bonded and polished; whitening is followed by simple care tips." },
    ],
    duration: "Whitening 60–90 minutes; veneers 2 visits",
    visits: "1–2 visits",
    priceFrom: 6000,
    priceNote: "Whitening from ₹6,000; veneers from ₹12,000 per tooth",
    faqs: [
      { q: "Will whitening make my teeth sensitive?", a: "Some people feel mild sensitivity for a day or two. We use a desensitiser and adjust the strength if needed." },
      { q: "How long does whitening last?", a: "Typically one to two years, depending on tea, coffee and smoking." },
      { q: "Do veneers look fake?", a: "They shouldn’t. We choose shape and shade with you, and avoid an overly white, uniform look." },
    ],
  },
  {
    slug: "kids-dentistry",
    name: "Kids dentistry",
    short: "Calm, friendly first visits that build good habits for life.",
    keyword: "Kids dentist in Anna Nagar, Madurai",
    image: "treat-kids-dentistry",
    whatItIs:
      "Children’s visits are kept short, playful and honest. We check growing teeth, clean gently, apply fluoride or sealants to protect against cavities, and treat problems early, at a pace your child is comfortable with.",
    whoNeedsIt: [
      "A first visit by the first birthday, or when the first tooth appears",
      "Brown spots, holes or pain in baby teeth",
      "Thumb-sucking, crowding or questions about braces",
    ],
    steps: [
      { title: "Meet", text: "Your child sits in the chair, rides it up and down and meets the tools first." },
      { title: "Check", text: "A gentle look at teeth and growth, with simple tips for parents." },
      { title: "Protect", text: "Fluoride varnish or sealants to help prevent cavities." },
    ],
    duration: "20–40 minutes",
    visits: "Every 6 months",
    priceFrom: 400,
    priceNote: "Check-up from ₹400; fluoride and sealants priced per tooth",
    faqs: [
      { q: "Do baby teeth really matter?", a: "Yes. They hold space for adult teeth, and decay in baby teeth can cause pain and infection." },
      { q: "My child is scared. What do you do?", a: "We go slowly, explain everything in simple words and stop if your child needs a break. No surprises." },
      { q: "Can I stay with my child?", a: "Of course. Parents are welcome in the room for every visit." },
    ],
  },
];

export const getTreatment = (slug: string) => treatments.find((t) => t.slug === slug);
