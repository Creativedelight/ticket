import { query } from "./db";

async function seedEvents() {
  const events = [
    {
      title: "KALEE NIGHT",
      date: "10, OCT 2025",
      location: "THIKA CAPRICON LOUNGE GATITU JUNCTION",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Experience the biggest KALEE NIGHT of the year with performances from Samkey Star, Gloria Kotestes, Yoyo Zing, Zona Last Born and Tobby Mr.Romantic. Don't miss this epic,lights, and unforgettable moments.",
    },
  ];
  for (const event of events) {
    await query(
      `INSERT INTO events (title, date, location, image, description)
       VALUES ($1, $2, $3, $4, $5)`,
      [event.title, event.date, event.location, event.image, event.description]
    );
  }

  console.log("✅ Events seeded!");
  process.exit(0);
}

seedEvents().catch(err => {
  console.error("❌ Error seeding events:", err);
  process.exit(1);
});
