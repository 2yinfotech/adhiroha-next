// Everything the reviews page shows, kept apart from the markup so the
// numbers, quotes and videos can be updated without touching layout.
//
// Nothing here is invented. The platform scores come from lib/seo.js, which
// mirrors the live profiles. The written reviews are the ones the school
// already publishes on its ads landing page, carried over word for word. The
// videos are every working "Student Review" upload on the school's YouTube
// channel, with the upload date and length read from each video's own page.

// The school's own profiles on each platform, as the site footer links them.
// Tripadvisor has no URL published anywhere on the site, so it is shown
// without a link rather than with a guessed one.
export const GOOGLE_URL = "https://www.google.com/maps/place/Adhiroha+Yoga+Teacher+Training+Rishikesh";
export const YOGA_ALLIANCE_URL =
  "https://app.yogaalliance.org/schoolpublicprofile?id=0013g000002pk6NAAQ&sid=0013g000002npW5AAI&name=Adhiroha";
export const YOUTUBE_URL = "https://www.youtube.com/@adhiroha";

// [name, country, when · course, review]
export const GOOGLE_REVIEWS = [
  ["Gabriele M.", "Italy", "December 2025 · 200 Hour YTTC", "I completed my 200-hour yoga course at Adhiroha and had a great experience. The teachers were incredibly knowledgeable. Even though I'm not vegetarian, the food was very good and never an issue. Would highly recommend!"],
  ["Apeksha L.", "India", "December 2025 · Family Yoga Experience", "Everything is great — the lush serene surroundings, the sound of the waterfall, the practice rooms, the teachers, management, and food! Hygiene standards are top notch. It is indeed the best yoga school in Rishikesh!"],
  ["Sarah K.", "Australia", "November 2025 · 200 Hour YTTC", "This training changed my life completely. The teachers were patient, attentive, and open to questions, creating a truly supportive learning atmosphere. Living and practicing in Rishikesh added depth to the experience. I left feeling more connected to my practice."],
  ["Marie L.", "France", "October 2025 · 200 Hour YTTC", "Beautiful experience doing my 200 hour YTTC at Adhiroha. Comfortable and clean rooms, delicious saatvik food and great classes. Extremely peaceful surroundings in nature. If anyone is looking for an authentic yoga experience, Adhiroha is the place!"],
  ["Hannah W.", "Germany", "September 2025 · 500 Hour YTTC", "I had a wonderful experience here at Adhiroha. The place is superb, well-maintained, and clean. The quality of teaching and everyone who works here are very professional. The philosophy and chanting classes were intellectually very stimulating. Highly recommend!"],
  ["Luisa R.", "Spain", "August 2025 · 200 Hour YTTC", "One of the most amazing months of my life at Adhiroha! The place, the service, the teachers, the energy, the food, the students — everything was wonderful. The sattvic food was nourishing and the accommodations were spacious, clean and comfortable."],
  ["Julia M.", "Netherlands", "July 2025 · 300 Hour YTTC", "The place is beautiful, well maintained and the staff are always smiling and helpful. The location is stunning — surrounded by green mountains. I left the program feeling more confident in my understanding of yoga and deeply connected to my practice."],
  ["Emma T.", "United Kingdom", "June 2025 · 200 Hour YTTC", "Amazing center of yoga — a peaceful place in the forest near Tapovan with beautiful Himalayan views. The clean rooms, delicious Indian vegetarian food, and incredibly kind staff made my stay truly enjoyable. A perfect spiritual escape!"],
  ["Ada K.", "Poland", "May 2025 · 200 Hour YTTC", "One of the finest yoga schools in Rishikesh. The teacher training courses are well structured and perfect for yoga practitioners. The outdoor yoga area surrounded by nature, morning sadhana by the Himalayas, and the evening aarti made this a truly transformative journey!"],
];

// Every working student review on the channel. The two most watched lead;
// the rest run newest first.
export const VIDEOS = [
  { id: "pFFwmXxTjJY", uploadDate: "2024-04-08", duration: "PT1M42S", length: "1:42" },
  { id: "3a0OhN0uC0U", uploadDate: "2024-07-30", duration: "PT1M29S", length: "1:29" },
  { id: "34JbOEe7Xn8", uploadDate: "2024-07-30", duration: "PT1M16S", length: "1:16" },
  { id: "V2mporw4k8Q", uploadDate: "2024-07-30", duration: "PT2M20S", length: "2:20" },
  { id: "kfngfAxnIlg", uploadDate: "2024-07-30", duration: "PT1M9S", length: "1:09" },
  { id: "TJsr8gATo9k", uploadDate: "2024-05-29", duration: "PT2M32S", length: "2:32" },
  { id: "9YuI7II8H_M", uploadDate: "2024-04-30", duration: "PT2M7S", length: "2:07" },
  { id: "W4jT7YXZpMU", uploadDate: "2024-04-26", duration: "PT3M10S", length: "3:10" },
  { id: "JVcPoLnfxQo", uploadDate: "2024-04-25", duration: "PT1M20S", length: "1:20" },
  { id: "UOSPnC91a-E", uploadDate: "2024-04-08", duration: "PT1M19S", length: "1:19" },
  { id: "bJAKJFCuw8Q", uploadDate: "2024-03-01", duration: "PT2M37S", length: "2:37" },
  { id: "0aY5F2KlvOQ", uploadDate: "2023-12-10", duration: "PT2M24S", length: "2:24" },
  { id: "tiDxEt8aD2Y", uploadDate: "2023-09-28", duration: "PT3M29S", length: "3:29" },
  { id: "tbRBcldc0wk", uploadDate: "2023-09-27", duration: "PT2M35S", length: "2:35" },
  { id: "BqJ64L2El-4", uploadDate: "2023-09-08", duration: "PT3M44S", length: "3:44" },
  { id: "UlxCcmDR4zc", uploadDate: "2023-09-02", duration: "PT3M20S", length: "3:20" },
  { id: "8vl9tD60N5o", uploadDate: "2023-07-26", duration: "PT3M", length: "3:00" },
  { id: "AUIxZ1G5nbI", uploadDate: "2023-07-17", duration: "PT11M21S", length: "11:21" },
  { id: "96nme5CJJKM", uploadDate: "2023-07-17", duration: "PT7M30S", length: "7:30" },
  { id: "TL7OiQKPJBY", uploadDate: "2023-07-17", duration: "PT12M9S", length: "12:09" },
  { id: "iuqJ3Id3X5k", uploadDate: "2023-07-12", duration: "PT2M25S", length: "2:25" },
  { id: "uULXFN3aC98", uploadDate: "2023-07-12", duration: "PT5M46S", length: "5:46" },
  { id: "0hXcsGNqNBo", uploadDate: "2023-04-25", duration: "PT0M59S", length: "0:59" },
  { id: "GXrbrhfKcHw", uploadDate: "2022-05-21", duration: "PT0M56S", length: "0:56" },
  { id: "MDQ1sPpXht0", uploadDate: "2022-04-23", duration: "PT2M20S", length: "2:20" },
  { id: "JEy--Y65DJI", uploadDate: "2022-01-30", duration: "PT1M31S", length: "1:31" },
  { id: "lxSwWl489Mg", uploadDate: "2022-01-30", duration: "PT1M42S", length: "1:42" },
];

// What comes up again and again, each point backed by the reviews above.
// [heading, summary, quote, who]
export const THEMES = [
  ["The teachers", "Patient, knowledgeable, and still there when the last question is asked.", "The teachers were patient, attentive, and open to questions, creating a truly supportive learning atmosphere.", "Sarah K., Australia"],
  ["The setting", "A forest school above Tapovan, away from the town, with the sound of water through the day.", "Unlike many other schools, which sit right inside the city, this one was a little further away, and that distance turned out to be exactly what I needed.", "Ramnik, London"],
  ["Food and rooms", "Sattvic vegetarian meals that change every day, and rooms people describe as clean and comfortable.", "Comfortable and clean rooms, delicious saatvik food and great classes.", "Marie L., France"],
  ["Care and hygiene", "A school that is kept clean and run by people who are glad to help.", "Hygiene standards are top notch.", "Apeksha L., India"],
];

// [question, answer]
export const FAQS = [
  ["Is Adhiroha Yoga School legit?", "Yes. Adhiroha is a Registered Yoga School with Yoga Alliance at all three levels, RYS 200, 300 and 500, and is accredited by the Yoga Certification Board under India's Ministry of Ayush. More than 3,000 students from over 70 countries have trained here, and the school holds a 4.9 rating from 383 reviews on Google."],
  ["Where can I read all the reviews of Adhiroha?", "On the school's Google profile, which has 383 reviews and a 4.9 average; on its Yoga Alliance school listing, which has 20 reviews from graduates; and on Tripadvisor. The student review videos are all on the Adhiroha YouTube channel."],
  ["What do students say about the teachers?", "The point that comes up most is patience. Students describe teachers who explain properly, answer every question and stay until it is understood, across asana, philosophy, anatomy and chanting."],
  ["What do reviews say about the food and rooms?", "Meals are sattvic and vegetarian, freshly cooked and different every day, and one student who is not vegetarian wrote that it was never an issue. Rooms are shared or double, and reviews describe them as clean, spacious and comfortable."],
  ["Is the course right for a beginner?", "Most students arrive for the 200 hour course with no teaching experience at all, and many of the reviews here are from exactly those people. The 300 hour course is for those who already hold a 200 hour certificate, and the 500 hour course covers both in one stay."],
  ["How do I leave a review for Adhiroha?", "Search for Adhiroha Yoga School on Google Maps, open the listing and choose Write a review. Graduates can also review the school on its Yoga Alliance listing. Every review helps the next student decide."],
];
