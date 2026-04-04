import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Star, Quote, MapPin, Calendar, Filter, X } from "lucide-react";
import { getFlagUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import studentSarah from "@/assets/student-sarah.jpg";
import studentJames from "@/assets/student-james.jpg";
import studentPriya from "@/assets/student-priya.jpg";
import studentMarcus from "@/assets/student-marcus.jpg";
import studentElena from "@/assets/student-elena.jpg";
import studentTom from "@/assets/student-tom.jpg";

interface Story {
  id: string;
  name: string;
  photo: string;
  country: string;
  countryFlag: string;
  countryId: string;
  university: string;
  program: string;
  term: string;
  rating: number;
  headline: string;
  excerpt: string;
  fullStory: string;
  highlights: string[];
}

const stories: Story[] = [
  {
    id: "sarah",
    name: "Sarah Chen",
    photo: studentSarah,
    country: "France",
    countryFlag: "🇫🇷",
    countryId: "france",
    university: "Sorbonne University",
    program: "Semester in Paris",
    term: "Spring 2025",
    rating: 5,
    headline: "Paris changed the way I see the world",
    excerpt: "From late-night study sessions along the Seine to weekend trips across Europe, my semester at the Sorbonne was the most transformative experience of my life.",
    fullStory: "I arrived in Paris nervous and excited in equal measure. Within days, the city wrapped me in its magic — the winding streets of the Latin Quarter became my daily walk to class, and the cafés became my second home. At the Sorbonne, I found professors who challenged me to think differently about art history and philosophy. But the real education happened outside the classroom: cooking with my host family, debating politics with French students, and learning to navigate a new culture with grace. I left Paris fluent in French and with a confidence I never knew I had.",
    highlights: ["Learned fluent French", "Traveled to 8 countries", "Made lifelong friendships", "Interned at the Louvre"],
  },
  {
    id: "james",
    name: "James Nakamura",
    photo: studentJames,
    country: "United Kingdom",
    countryFlag: "🇬🇧",
    countryId: "uk",
    university: "University of Oxford",
    program: "Semester at Oxford",
    term: "Fall 2024",
    rating: 5,
    headline: "Oxford exceeded every expectation I had",
    excerpt: "The tutorial system at Oxford pushed me intellectually in ways I never imagined. One-on-one sessions with world-class professors made me rethink everything I knew about learning.",
    fullStory: "Walking through the same corridors as some of history's greatest thinkers gave me chills every single day. The tutorial system — where you meet one-on-one with a professor to discuss your essay — was intimidating at first but became the most rewarding academic experience of my life. Beyond academics, I joined the rowing club, performed in a student play, and spent weekends exploring the Cotswolds. Oxford taught me that real learning happens when you're pushed beyond your comfort zone.",
    highlights: ["Tutorial system experience", "Joined rowing club", "Published research paper", "Explored the Cotswolds"],
  },
  {
    id: "priya",
    name: "Priya Sharma",
    photo: studentPriya,
    country: "Japan",
    countryFlag: "🇯🇵",
    countryId: "japan",
    university: "University of Tokyo",
    program: "Tokyo Tech Exchange",
    term: "Spring 2025",
    rating: 5,
    headline: "Japan taught me balance between tradition and innovation",
    excerpt: "Studying engineering at the University of Tokyo while immersing myself in Japanese culture was an experience that combined cutting-edge technology with centuries-old wisdom.",
    fullStory: "From the moment I landed in Tokyo, I was captivated by the seamless blend of ancient temples and futuristic technology. My classes at Todai were rigorous and collaborative — I worked alongside Japanese students on robotics projects that felt straight out of science fiction. But what truly changed me were the quieter moments: learning calligraphy from my host grandmother, visiting Kyoto's zen gardens, and understanding the beauty of 'ikigai.' Japan didn't just teach me engineering; it taught me a philosophy for life.",
    highlights: ["Robotics research project", "Learned basic Japanese", "Visited 15 prefectures", "Cultural exchange program"],
  },
  {
    id: "marcus",
    name: "Marcus Johnson",
    photo: studentMarcus,
    country: "United Kingdom",
    countryFlag: "🇬🇧",
    countryId: "uk",
    university: "University of Oxford",
    program: "Oxford Summer Programme",
    term: "Summer 2025",
    rating: 4,
    headline: "Six weeks that shaped my career path",
    excerpt: "The Oxford Summer Programme gave me access to world-renowned professors and a global network of ambitious students. It clarified what I want to do with my life.",
    fullStory: "I wasn't sure if six weeks could make a real difference, but Oxford proved me wrong. The intensive seminars on international relations opened my eyes to global perspectives I'd never considered. Living in a 500-year-old college, sharing meals with students from 30+ countries, and debating ideas until midnight in the common room — it was intellectually electric. The program connected me with a mentor who helped me land a research position back home. Those six weeks didn't just enhance my resume; they gave me clarity about my future.",
    highlights: ["Found my career direction", "Global student network", "Research mentorship", "Debate society finalist"],
  },
  {
    id: "elena",
    name: "Elena Vasquez",
    photo: studentElena,
    country: "Spain",
    countryFlag: "🇪🇸",
    countryId: "spain",
    university: "University of Barcelona",
    program: "Spanish Language & Culture",
    term: "Fall 2024",
    rating: 5,
    headline: "Barcelona gave me a second home",
    excerpt: "Living in Barcelona didn't just improve my Spanish — it gave me a new family, a deeper understanding of European culture, and memories I'll cherish forever.",
    fullStory: "Barcelona is a city that grabs you and never lets go. From my apartment in the Gothic Quarter, I could walk to class at the University of Barcelona in 10 minutes, passing Gaudí's masterpieces along the way. My language skills went from intermediate to near-fluent in a single semester, thanks to the immersive approach and my wonderfully patient host family. Weekends were spent at the beach, exploring tapas bars, or taking the train to nearby villages. I cried when I had to leave — Barcelona wasn't just a study abroad destination, it became home.",
    highlights: ["Near-fluent in Spanish", "Host family bonds", "Explored Catalonia", "Flamenco dance classes"],
  },
  {
    id: "tom",
    name: "Tom Bradley",
    photo: studentTom,
    country: "Italy",
    countryFlag: "🇮🇹",
    countryId: "italy",
    university: "University of Bologna",
    program: "Art & Architecture in Italy",
    term: "Spring 2025",
    rating: 5,
    headline: "Italy's beauty seeped into everything I created",
    excerpt: "As an architecture student, studying in the world's oldest university surrounded by Renaissance masterpieces was a dream I didn't know I had until I lived it.",
    fullStory: "Bologna surprised me. Everyone talks about Rome and Florence, but Bologna is Italy's hidden gem — vibrant, affordable, and steeped in academic tradition. Studying architecture at the world's oldest university felt surreal. My professors didn't just teach from textbooks; they took us to see Brunelleschi's dome, Palladio's villas, and ancient Roman ruins firsthand. I filled sketchbooks with observations that no photograph could capture. The food, the people, the architecture — Italy didn't just teach me about design, it taught me about living beautifully.",
    highlights: ["Sketched 200+ buildings", "Studied Renaissance art firsthand", "Learned Italian cooking", "Architecture studio in Florence"],
  },
];

const allCountryFilters = [
  { id: "all", name: "All Countries", flag: "🌍" },
  { id: "france", name: "France", flag: "🇫🇷" },
  { id: "uk", name: "United Kingdom", flag: "🇬🇧" },
  { id: "japan", name: "Japan", flag: "🇯🇵" },
  { id: "spain", name: "Spain", flag: "🇪🇸" },
  { id: "italy", name: "Italy", flag: "🇮🇹" },
];

const StudentStoriesPage = () => {
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [expandedStory, setExpandedStory] = useState<string | null>(null);

  const filteredStories = useMemo(() => {
    if (selectedCountry === "all") return stories;
    return stories.filter(s => s.countryId === selectedCountry);
  }, [selectedCountry]);

  return (
    <div className="min-h-screen bg-background pt-14 pb-8">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 bg-card/95 backdrop-blur-md border-b border-border">
        <Link to="/" className="touch-target flex items-center text-foreground">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <span className="font-display text-lg text-foreground">Student Stories</span>
        <div className="w-11" />
      </div>

      {/* Hero section */}
      <section className="px-4 pt-6 pb-4 max-w-4xl mx-auto">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="font-display text-3xl md:text-4xl text-foreground text-balance">
            Real stories from <span className="italic">real students</span>
          </h1>
          <p className="mt-2 text-muted-foreground max-w-md">
            Hear from students who've lived the study abroad experience. Their journeys might inspire yours.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-5 flex gap-6"
        >
          {[
            { value: "500+", label: "Stories shared" },
            { value: "4.8★", label: "Avg. rating" },
            { value: "30+", label: "Countries" },
          ].map(stat => (
            <div key={stat.label}>
              <p className="text-xl font-bold text-foreground font-body">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Country filter */}
      <div className="sticky top-14 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          {allCountryFilters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedCountry(filter.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-colors touch-target ${
                selectedCountry === filter.id
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              <span>{filter.flag}</span>
              <span>{filter.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stories grid */}
      <div className="px-4 mt-4 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCountry}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0"
          >
            {filteredStories.map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <StoryCard
                  story={story}
                  expanded={expandedStory === story.id}
                  onToggle={() => setExpandedStory(expandedStory === story.id ? null : story.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredStories.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No stories yet for this country.</p>
            <p className="text-sm text-muted-foreground mt-1">Check back soon!</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <section className="px-4 mt-10 max-w-4xl mx-auto">
        <div className="bg-primary text-primary-foreground rounded-2xl p-6 text-center">
          <h2 className="font-display text-2xl">Write your own story</h2>
          <p className="mt-2 text-primary-foreground/70 text-sm max-w-sm mx-auto">
            Join thousands of students who've discovered the world through study abroad.
          </p>
          <Button className="mt-4 h-12 px-8 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link to="/apply">Start Your Journey</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

function StoryCard({ story, expanded, onToggle }: { story: Story; expanded: boolean; onToggle: () => void }) {
  return (
    <div className="bg-card rounded-xl shadow-soft border border-border overflow-hidden">
      {/* Header with photo */}
      <div className="p-4 flex items-start gap-3">
        <img
          src={story.photo}
          alt={story.name}
          className="w-14 h-14 rounded-full object-cover shrink-0 border-2 border-accent/20"
          loading="lazy"
          width={512}
          height={512}
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground">{story.name}</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {story.university}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm">{story.countryFlag}</span>
            <span className="text-xs text-muted-foreground">{story.country}</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground flex items-center gap-0.5">
              <Calendar className="h-3 w-3" /> {story.term}
            </span>
          </div>
        </div>
        <div className="flex gap-0.5 shrink-0">
          {Array.from({ length: story.rating }).map((_, j) => (
            <Star key={j} className="h-3.5 w-3.5 text-gold fill-gold" />
          ))}
        </div>
      </div>

      {/* Quote */}
      <div className="px-4 pb-4">
        <div className="relative">
          <Quote className="h-5 w-5 text-accent/30 absolute -top-1 -left-1" />
          <h4 className="font-display text-lg text-foreground pl-5 italic leading-snug">
            "{story.headline}"
          </h4>
        </div>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          {story.excerpt}
        </p>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {story.fullStory}
              </p>

              {/* Highlights */}
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Highlights</p>
                <div className="flex flex-wrap gap-2">
                  {story.highlights.map(h => (
                    <span
                      key={h}
                      className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent font-medium"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Link to country */}
              <Link
                to={`/country/${story.countryId}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              >
                Explore {story.country} programs →
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={onToggle}
          className="mt-3 text-sm font-medium text-accent hover:text-accent/80 transition-colors touch-target"
        >
          {expanded ? "Show less" : "Read full story"}
        </button>
      </div>
    </div>
  );
}

export default StudentStoriesPage;
