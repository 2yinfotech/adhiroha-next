// Content for the combined 200 / 300 / 500 landing page.
//
// Every fact here is lifted from the three live course pages, so the numbers,
// dates and copy stay in agreement with them. Kept as data rather than markup
// because most of it is rendered three times over (once per level) and the
// shape of each level has to be identical for the switch to work.

export const LEVELS = ["200", "300", "500"];

export const LEVEL = {
  200: {
    hours: 200,
    name: "Root of Yoga",
    title: "200 Hour Yoga Teacher Training",
    days: "24 days",
    daysN: 24,
    span: "1st – 24th",
    checkout: "Arrive 30th / 31st · checkout 24th",
    level: "Beginner to intermediate",
    prereq: "No prior training needed. You can arrive having only ever practised at home.",
    credential: "RYT 200",
    triple: "1275",
    double: "1650",
    reserve: "300",
    balanceTriple: "975",
    balanceDouble: "1350",
    image: "/img/adhiroha-yttc-014.webp",
    blurb:
      "The foundation. Almost everyone who teaches this practice for a living began with a course exactly like this one.",
    runLine: "Hours 0 to 200 · the foundation",
  },
  300: {
    hours: 300,
    name: "Heart of Yoga",
    title: "300 Hour Yoga Teacher Training",
    days: "30 days",
    daysN: 30,
    span: "1st – 29th",
    checkout: "Arrive 30th / 31st · checkout 29th",
    level: "Advanced · 200-hour required",
    prereq: "A completed 200 hour training, with us or anywhere else. Bring the certificate.",
    credential: "RYT 300",
    triple: "1500",
    double: "2000",
    reserve: "500",
    balanceTriple: "1000",
    balanceDouble: "1500",
    image: "/img/yttc-004.webp",
    blurb:
      "The advanced half. It begins where the foundation ended, and finishes the path to the full 500-hour credential.",
    runLine: "Hours 200 to 500 · the advanced half",
  },
  500: {
    hours: 500,
    name: "Crown of Yoga",
    title: "500 Hour Yoga Teacher Training",
    days: "60 days",
    daysN: 60,
    span: "Two full months",
    checkout: "Arrive 30th / 31st · checkout on the 29th of the following month",
    level: "All levels · beginner to master",
    prereq: "No prerequisite at all. Foundation and advanced are taught in one unbroken stretch.",
    credential: "RYT 500",
    triple: "2790",
    double: "3690",
    reserve: "750",
    balanceTriple: "2040",
    balanceDouble: "2940",
    image: "/img/yttc-009.webp",
    blurb:
      "The whole path in one journey. Two months, from the first posture to leading an advanced room.",
    runLine: "Hours 0 to 500 · the complete path",
  },
};

// Each course also has a dedicated page. Linking down to them is what makes
// this a hub rather than a fourth page competing with the three.
export const COURSE_URL = {
  200: "/200-hour-yoga-teacher-training-course-rishikesh/",
  300: "/300-hour-yoga-teacher-training-course-rishikesh/",
  500: "/500-hour-yoga-teacher-training-course-rishikesh/",
};

export const WHO = {
  200: [
    ["First timers", "Complete beginners", "Who want a strong foundation before anything else. The course assumes no prior teaching experience at all, and builds from the ground up at a pace that never leaves you behind."],
    ["Self-taught", "Home practitioners", "Ready to understand the why behind postures they already love — moving from following along with videos to knowing, in your own body, what each posture is doing."],
    ["Career start", "Future teachers", "Anyone hoping to teach one day and wanting an internationally recognised certificate to do it, with the practised confidence to stand at the front of a room."],
    ["A pause", "People at a crossroads", "Looking for a month of clarity and quiet more than a career change. A stretch of days that make sense again, and space to hear yourself think."],
  ],
  300: [
    ["Foundation done", "200-hour graduates", "Who finished the foundation, with us or elsewhere, and feel ready for more. We begin where the 200 hour left off and move straight into the advanced work."],
    ["Already teaching", "Working teachers", "Refining the craft: cleaner cueing, honest hands-on adjustments, thoughtful sequencing, and a deeper well of philosophy to teach from when a room asks hard questions."],
    ["Completing the path", "Toward RYT 500", "The 300 hour is the second half of the full credential. Complete it and RYT 500 is within reach, opening advanced workshops and retreats worldwide."],
    ["Coming back", "Returning practitioners", "Who trained a while ago and want to come back with fresh depth. A month to sharpen what has gone rusty and remember exactly why you began."],
  ],
  500: [
    ["All at once", "Committed beginners", "Who want the whole thing in one stretch rather than a foundation now and the rest someday. You start from the first posture and leave a fully qualified teacher."],
    ["A new profession", "Career changers", "Ready to make yoga a living and wanting the strongest credential to do it. Two months earns the complete RYT 500 without spreading it over years."],
    ["One journey", "Full-credential seekers", "Who would rather not split training across years and separate trips. The 500 hour folds the 200 and the 300 into one continuous immersion."],
    ["Two months", "Deep immersion seekers", "Looking for real change more than a certificate. Long enough in the hills above the Ganga Ji for the practice to reshape how you live, think and move."],
  ],
};

// The four pillars are not a numbered list, they are an arc: the body first,
// then the breath, then the reasoning, and finally the room. These labels say
// that outright, which "01 / 02 / 03 / 04" only ever gestured at.
export const PILLAR_STEP = [
  "Begins with the body",
  "Then the breath",
  "Then the why",
  "Ends at the front of the room",
];

export const PILLARS = {
  200: [
    ["The practice", "The body learns first", [
      ["Hatha yoga asanas", "the classical postures, learned slowly from the inside out."],
      ["Ashtanga yoga", "the flowing primary series, linked breath to movement."],
      ["Vinyasa", "the art of moving between postures with grace."],
    ]],
    ["The breath & mind", "Turning attention inward", [
      ["Shat karma", "six ancient cleansing practices that prepare the body."],
      ["Pranayama", "breathing techniques, the engine of the whole practice."],
      ["Meditation", "learning to sit with, and finally settle, the mind."],
    ]],
    ["The knowledge", "The why behind it all", [
      ["Philosophy & ethics", "the old texts and ideas, made alive and practical."],
      ["Anatomy & physiology", "what each posture actually does inside the body."],
      ["Basics of Ayurveda", "the sister science of living and eating well."],
    ]],
    ["The craft", "Becoming the teacher", [
      ["Teaching methodology", "how to sequence, cue, adjust and hold a class."],
      ["Teaching practice", "real practice teaching, in front of real people."],
      ["Mantra chanting", "opening and closing a room with sound."],
    ]],
  ],
  300: [
    ["The practice", "Refining the body", [
      ["Advanced asana & inversions", "headstands, arm balances and deep backbends, approached safely."],
      ["Ashtanga intermediate series", "the next series, opening the body further."],
      ["Vinyasa krama & sequencing", "building intelligent, creative flows of your own."],
    ]],
    ["The subtle body", "Working with energy", [
      ["Advanced pranayama & bandhas", "the energetic locks that deepen every breath."],
      ["Mudras & kriyas", "refined gestures and cleansing for a subtler practice."],
      ["Chakras & the koshas", "mapping the subtle body behind the postures."],
    ]],
    ["The knowledge", "Going to the source", [
      ["Patanjali's Yoga Sutras", "the source text, studied line by line."],
      ["Yoga therapy & injury care", "working safely with real bodies and old injuries."],
      ["Applied anatomy", "the deeper mechanics behind advanced postures."],
    ]],
    ["The craft", "Leading with authority", [
      ["Advanced methodology", "sequencing themed, level-appropriate classes."],
      ["Hands-on adjustments", "the art of the safe, confident assist."],
      ["Mentored practicum", "teaching advanced classes with honest feedback."],
    ]],
  ],
  500: [
    ["The practice", "First posture to advanced", [
      ["Asana, foundation to advanced", "from the classical postures to inversions and deep backbends."],
      ["Ashtanga, primary & intermediate", "both series, built up patiently over two months."],
      ["Vinyasa & sequencing", "moving with grace, then building intelligent flows of your own."],
    ]],
    ["Breath & subtle body", "Turning attention inward", [
      ["Shatkarma, mudras & kriyas", "the full range of cleansing and gesture."],
      ["Pranayama & bandhas", "from first breathwork to the energetic locks."],
      ["Meditation, chakras & koshas", "settling the mind, then mapping the subtle body."],
    ]],
    ["The knowledge", "The why behind it all", [
      ["Philosophy & the Yoga Sutras", "from the core ideas to Patanjali, line by line."],
      ["Anatomy & yoga therapy", "how the body works, and how to work with injuries."],
      ["Ayurveda & applied anatomy", "the sister science, and the deeper mechanics of the postures."],
    ]],
    ["The craft", "Becoming the teacher", [
      ["Teaching methodology", "from first cues to sequencing advanced classes."],
      ["Practice & adjustments", "practice teaching, plus hands-on assists."],
      ["Mantra & mentored practicum", "sound, and mentored teaching with real feedback."],
    ]],
  ],
};

export const ARC = {
  200: [
    ["The first few days", "Arriving", "You land, shake off the travel and meet the group you will share the month with. The first sessions are deliberately gentle. Nobody is thrown in the deep end."],
    ["The first week", "Foundations", "This is the week the body complains a little. Muscles you had forgotten make themselves known. Stay with it — by the end of the week the aches fade and the pieces start to fit."],
    ["The middle weeks", "The shift", "Almost without warning, something turns. You stop copying the teacher and start noticing alignment in the people beside you."],
    ["The final days", "Teaching & farewells", "You plan and lead classes to your peers, take honest feedback, and sit your final assessment. Then the certificates, and the goodbyes."],
  ],
  300: [
    ["The first few days", "Arriving", "You meet a group who, like you, already practise and teach. The first sessions revisit the fundamentals so everyone settles back into their body before the advanced work begins."],
    ["The first week", "Past the basics", "The body remembers quickly. Within days you move past what the foundation covered — deeper backbends, inversions, the subtle body, the parts a 200 hour only hinted at."],
    ["The middle weeks", "The shift", "You stop practising like a student and start seeing like a teacher: reading alignment in the room, understanding why a sequence is built the way it is."],
    ["The final days", "Teaching & farewells", "You lead advanced classes to your peers, take mentored feedback, and sit your final assessment. Then the RYT 300 certificate, with RYT 500 now within reach."],
  ],
  500: [
    ["The first few days", "Arriving", "You land, shake off the travel and meet the group you will share two whole months with. The first sessions are deliberately gentle, whatever level you arrive at."],
    ["The first weeks", "The foundation", "The first weeks build the base, for many from the ground up. The classical practice is drilled slowly until it is genuinely yours. This is the 200 hour, lived properly."],
    ["The middle weeks", "Into the advanced", "Somewhere past halfway the foundation becomes advanced. Inversions, the subtle body, therapy, real teaching craft — and the quiet shift from practising to seeing like a teacher."],
    ["The final days", "Teaching & farewells", "You lead full classes to your peers, take mentored feedback, and sit your final assessment. Then the RYT 500 certificate: the whole path walked end to end."],
  ],
};

export const DAY = [
  ["part", "Morning · 5:45 – 8:45"],
  ["05:45", "Shatkarma", "gentle cleansing practices as the light comes up over the valley."],
  ["06:00", "Pranayama", "breathwork while the air is still cool and the ashram is quiet."],
  ["07:15", "Hatha asana", "a strong practice to wake the body properly."],
  ["08:45", "Breakfast", "warm, simple, and eaten without hurry."],
  ["part", "Mid-day · 9:30 – 13:00"],
  ["09:30", "Philosophy & ethics", "discussion far more than lecture."],
  ["11:00", "Yin or alignment", "a restorative session to open and release, or adjustment work to refine the postures."],
  ["13:00", "Lunch, then rest", "a real break through the warm part of the day."],
  ["part", "Afternoon · 14:45 – 16:15"],
  ["14:45", "Yoga anatomy", "the science behind everything you practise."],
  ["16:15", "Ashtanga & vinyasa", "flow as the afternoon softens."],
  ["part", "Evening · 18:00 – 19:30"],
  ["18:00", "Chanting & meditation", "the day winds down with sound, then stillness."],
  ["19:30", "Dinner, lights out", "early, because dawn comes early too."],
];

export const SPACES = [
  {
    tab: "The shala",
    h: "A shala that opens onto forest on every side",
    p: "Bright and purpose-built, with props, a small library, and space enough that a class never feels crowded. Practising with green and sky all around you does something four studio walls simply cannot.",
    chips: ["All props provided", "Small library", "Never crowded"],
    shots: [
      ["/gallery/yoga-shala/yoga-shala-001.webp", "The open-sided yoga shala at Adhiroha, looking out onto the forest"],
      ["/img/remote/img_shala-2.webp", "The bright, purpose-built shala laid out with mats and props"],
      ["/gallery/yoga-shala/yoga-shala-009.webp", "The two shalas of Adhiroha resting on the green hillside"],
    ],
  },
  {
    tab: "The grounds",
    h: "Three quiet acres beside a flowing brook",
    p: "The grounds stay calm even when a full batch is in residence: a small Shiva temple for quiet sitting, shaded corners for reading, and the sound of running water that slows everyone down within a day or two.",
    chips: ["Shiva temple", "Flowing brook", "Hills and forest"],
    shots: [
      ["/gallery/ashram/ashram-002.webp", "The Adhiroha ashram buildings on the green hillside of Upper Tapovan"],
      ["/img/remote/img_ram-1.webp", "The quiet zen garden with river rocks and green lawns"],
      ["/gallery/ashram/ashram-015.webp", "The white bell arch standing in the ashram gardens against the hills"],
    ],
  },
  {
    tab: "Sound & meditation",
    h: "A hall built for the evening sittings",
    p: "Sound healing with singing bowls and gongs, mantra, and the guided meditation that closes each day. It is where a lot of people find the part of the course they did not expect to matter most.",
    chips: ["Singing bowls & gongs", "Evening meditation", "Mantra"],
    shots: [
      ["/gallery/sound-healing/sound-003.webp", "A sound healing session with singing bowls at the ashram"],
      ["/gallery/sound-healing/sound-007.webp", "Students in candlelit evening meditation"],
      ["/gallery/sound-healing/sound-001.webp", "The meditation hall set up for an evening sitting"],
    ],
  },
  {
    tab: "Quiet corners",
    h: "Somewhere to sit and do nothing at all",
    p: "Reading nooks, garden hammocks and shaded benches dotted around the grounds. A surprising amount of the real learning happens in these unhurried in-between moments.",
    chips: ["Reading corners", "Garden hammocks", "Prayer flags"],
    shots: [
      ["/gallery/ashram/ashram-010.webp", "Hammocks resting in the shaded gardens of the ashram"],
      ["/img/remote/img_pranayama-026.webp", "A hammock strung above the green valley, prayer flags overhead"],
      ["/img/remote/img_pranayama-025.webp", "Prayer flags and quiet sitting corners on the forested hillside"],
    ],
  },
];

export const TEACHERS = [
  ["Yogacharya Jagjeet Singh", "Philosophy & anatomy", "20+ years · M.A. Yoga Science", "/img/remote/img_jagjeet-singh.jpg"],
  ["Yogacharya Pratap Rawat", "Ashtanga & vinyasa", "14+ years · M.A. Yoga & Vedic Sciences", "/img/remote/img_adhiroha-yttc-023.webp"],
  ["Yogacharya Sunil Bisht", "Hatha, pranayama & meditation", "20+ years · born in Rishikesh", "/img/remote/img_sunil-bisht.avif"],
  ["Yogacharya Jitendra Bhandari", "Pranayama & shatkarma", "20+ years · trained at Sivananda Ashram", "/img/remote/img_jitendra.webp"],
  ["Yogacharya Ajay Pundir", "Ashtanga & vinyasa", "8+ years teaching · M.A. Yoga", "/img/remote/img_adhiroha-yttc-022.webp"],
  ["Yogacharya Ashish Bangwal", "Hatha yoga", "8+ years · Iyengar-rooted Hatha", "/img/remote/img_adhiroha-yttc-026.webp"],
  ["Yogacharya Anil Rayal", "Anatomy & physiology", "9+ years · acupressure therapy", "/img/remote/img_adhiroha-yttc-027.webp"],
  ["Yogacharya Sudhanshu Rayal", "Restorative & yin", "7+ years · body mechanics specialist", "/img/remote/img_adhiroha-yttc-025.webp"],
  ["Yogacharya Anil Singh", "Adjustment & alignment", "9+ years · hands-on specialist", "/img/remote/img_adhiroha-yttc-024.webp"],
  ["Yogacharya Prashant", "Hatha & ashtanga", "5+ years · patient, practical teaching", "/img/remote/img_prashant.jpg"],
];

export const EXCURSIONS = [
  ["At dusk", "The evening Ganga aarti", "Priests circle great brass lamps at Parmarth Niketan and the whole bank glows amber against the dark. A lot of people describe it as the first time in years they felt completely still.", "/img/remote/img_yoga-training-122.webp", "Priests circling great brass lamps at the evening Ganga Ji aarti"],
  ["On rest days", "Waterfall treks", "A short climb to the falls hidden in the hills above Rishikesh. Cold water, green shade, and the best kind of tired.", "/gallery/excursion/excursion-003.webp", "A group excursion to a waterfall in the hills around Rishikesh"],
  ["Some mornings", "Yoga on the ghat", "Some sessions leave the shala entirely: asana and meditation right on the ghat, with the Ganga moving past as your soundtrack.", "/img/remote/img_gallery-200-06.webp", "Students practising asana together on the sands of the Ganga Ji ghat"],
  ["In silence", "The Vasishta caves", "Sages have sat in these caves for centuries. Meditating inside, in the cool and the dark, is the kind of quiet that stays with you long after you leave.", "/img/remote/img_yoga-training-126.webp", "Two students meditating inside the cool dark of the Vasishta caves"],
  ["Living history", "The old temples", "Guided visits to the temples of Rishikesh, including the thirteen storeys of Trayambakeshwar — places where the tradition you study in class has been practised without pause.", "/img/remote/img_yoga-training-124.webp", "Trayambakeshwar temple rising over the Ganga Ji at Rishikesh"],
  ["Between practice days", "Walks & sacred sites", "Gentle walks into the hills and slow time by the river. None of it compulsory, and all of it part of the course.", "/gallery/excursion/excursion-026.webp", "Students walking a forest path in the hills above Rishikesh"],
];

export const VOICES = [
  ["Ronnie", "Israel", "When I walked into this place, I was amazed. It is so beautiful that you feel like you are inside a dream, with all the nature around you, the plants, and the flowers."],
  ["Ramnik", "London", "Unlike many other schools, which sit right inside the city, this one was a little further away, and that distance turned out to be exactly what I needed."],
  ["Maya", "Lithuania", "We had different dishes every single day, so the food never got boring. The desserts were amazing, and the fresh fruit in the morning was something I still think about."],
  ["Gonzalo", "Spain", "You can probably hear the water behind me. Just being here every day, you truly learn to enjoy the small things."],
  ["Emma", "Austria", "I think I loved the excursions most, the trips to the temple and the waterfall. They were simply beautiful."],
  ["Sofia", "Portugal", "The teachers stayed back until the last question was answered. That is what I tell people when they ask me which school to choose."],
];

export const MOSAIC = [
  ["/gallery/opening-caremony/opening-014.webp", "The opening ceremony that begins every batch", "w2 h2"],
  ["/gallery/yoga/yoga-012.webp", "Students in a guided morning asana practice", "w2"],
  ["/gallery/dinning/dinning-004.webp", "Sattvic vegetarian food served in the ashram dining hall", ""],
  ["/gallery/ashram/ashram-006.webp", "The ashram buildings on the green hillside of Upper Tapovan", ""],
  ["/gallery/yoga-shala/yoga-shala-004.webp", "The shala at first light, mats laid out and waiting", ""],
  ["/gallery/excursion/excursion-009.webp", "Students on a guided excursion into the hills", ""],
  ["/gallery/certification/certification-010.webp", "Graduates receiving their certificates at the closing ceremony", "w2"],
  ["/gallery/yoga/yoga-033.webp", "An anatomy class in session in the open-sided shala", ""],
  ["/gallery/accommodation/acco-001.webp", "A clean, simple twin room with a mountain view", ""],
  ["/gallery/opening-caremony/opening-019.webp", "Lamps and marigolds laid out for the opening ceremony", ""],
  // Three wide, so the last row closes flush against the right edge.
  ["/gallery/excursion/excursion-026.webp", "A quiet forest path in the hills above Rishikesh", "w3"],
];

export const INCLUDED = [
  "Airport pickup from Dehradun, so your arrival is simple",
  "A welcome kit and all your study materials",
  "Your room on ashram, twin or triple sharing, for the whole course",
  "Three vegetarian meals a day, plus detox water, RO drinking water and herbal tea",
  "An outdoor practice on the Ganga ghat, and a sound healing session",
  "Two guided excursions and a kirtan ceremony each batch",
  "Unlimited high-speed WiFi across the ashram",
  "Your certificate, with both recognitions on it",
];

export const NOT_INCLUDED = [
  "Laundry, available for a small charge",
  "Extra nights beyond the course dates",
  "Flights, visa and travel insurance",
  "Anything not listed on the left",
];

export const FAQS = [
  ["Which level should I book?", "If you have never trained before, book the 200 hour — it is the foundation everything else rests on. If you already hold a 200 hour certificate, book the 300. If you want the whole path in one journey and can give it two months, book the 500, which has no prerequisite at all."],
  ["Do I need to be flexible or experienced?", "No. What the course asks for is willingness, not flexibility or youth. Most people on any given batch are new to it, and the 200 hour assumes no prior teaching experience whatsoever."],
  ["What certificate do I actually receive?", "One certificate, issued by Adhiroha, carrying both recognitions: accreditation by the Yoga Certification Board under the Ministry of Ayush, and Yoga Alliance registration at your level. It never expires."],
  ["Is Adhiroha registered with Yoga Alliance?", "Yes. Adhiroha is a Registered Yoga School with Yoga Alliance at all three levels — RYS 200, RYS 300 and RYS 500 — so a course completed here makes you eligible to register as an RYT at the level you trained."],
  ["Is there an age limit?", "You need to be eighteen or older, and there is no upper limit. Students range from their late teens well into their sixties and beyond."],
  ["Can I do the 300 hour if I trained somewhere else?", "Yes. A completed 200 hour training from any school qualifies you. Bring the certificate with you."],
  ["What does the registration fee do?", "It reserves your seat, and it is always part of the total rather than an extra charge. The balance is paid on arrival, and there is nothing else to pay after that."],
  ["When do courses start?", "Every course begins on the 1st of the month, and you arrive on the 30th or 31st of the month before. There is almost always a batch coming up soon."],
  ["What is the difference between YTT and RYT?", "YTT, Yoga Teacher Training, is the course. RYT, Registered Yoga Teacher, is the professional title you can register for through Yoga Alliance once you have completed it."],
  ["What happens if I need to change my dates?", "Talk to us. Batches run every month, and moving to a later one is usually straightforward as long as there is a seat."],
];

export const VIDEOS = [
  "34JbOEe7Xn8",
  "3a0OhN0uC0U",
  "-tB_WnA0jAo",
  "V2mporw4k8Q",
  "kfngfAxnIlg",
  "TJsr8gATo9k",
];
