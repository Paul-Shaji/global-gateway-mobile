import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Star, Quote, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { getFlagUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import studentJoel from "@/assets/joel.png";
import studentElena from "@/assets/student-elena.jpg";
import studentTom from "@/assets/student-tom.jpg";
import studentAbirami from "@/assets/abirami.png";
import studentSheba from "@/assets/sheba.png";

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
    id: "gopika",
    name: "Gopika Radhakrishnan",
    photo: "",
    country: "Australia",
    countryFlag: "🇦🇺",
    countryId: "australia",
    university: "",
    program: "",
    term: "",
    rating: 5,
    headline: "",
    excerpt:
     "I'm very grateful to E C Overseas for making my Australian study abroad dreams a reality. From the moment I walked in, they were super supportive. They helped me pick the perfect course that fit my interests and budget, made sure my PTE training was on point and handled my student visa application excellently. Their guidance every step of the way was invaluable – honestly, they took a lots of effort for each of the students journey. The team's guidance and support made the entire process stress-free.If you're looking for a reliable agency to help you study in Australia, l highly reccomend E C Overseas.",
    fullStory: "",
    highlights: [],
  },
  {
    id: "ABHIRAMY PA",
    name: "ABHIRAMY PA",
    photo: studentAbirami,
    country: "",
    countryFlag: "",
    countryId: "",
    university: "",
    program: "",
    term: "",
    rating: 5,
    headline: "",
    excerpt: "I joined EC OVERSEAS to learn spoken English, which is a very good institute for improving communication skills. The teachers are well-qualified and friendly, and they help students speak English confidently and fluently. In the classes, we practice speaking, listening, reading, and writing. We also learn new vocabulary and correct pronunciation. The environment in EC Overseas is very supportive, and I enjoy learning there every day. This course is helping me overcome my fear of speaking in front of others and improving my confidence. I believe this training will help me in my future studies and career as well.Thankuu for everything.....",
    fullStory: "",
    highlights: [],
  },
  {
    id: "sheba",
    name: "Sheba Koshy",
    photo: studentSheba,
    country: "Australia",
    countryFlag: "🇦🇺",
    countryId: "Australia",
    university: "",
    program: "",
    term: "",
    rating: 5,
    headline: "",
    excerpt: "My dream of studying abroad was made simpler and at ease with the help of EC Overseas. They showcased a great amount of patience during the entire journey and backed me up with the right amount of encouragement whenever I thought I couldn't make it.Recently, I got my student visa for Australia. All thanks to God, my parents and Mr. Ebez and his team who worked to make this possible. If you’re planning to study abroad, please do consult EC Overseas. I highly recommend them to anyone looking for a trustworthy study abroad agency.",
    fullStory: "",
    highlights: [],
  },
  {
    id: "marcus",
    name: "Joel Simon",
    photo: studentJoel,
    country: "United Kingdom",
    countryFlag: "",
    countryId: "",
    university: "",
    program: "",
    term: "Summer 2025",
    rating: 4,
    headline: "",
    excerpt: "Mr. Ebez & team at EC Overseas guarantee a remarkable service and assistance in the field of overseas study as well as language training. Mr. Rejo, my tutor for IELTS training was instrumental in providing the necessary guidance & support which helped me accomplish my goals.",
    fullStory: "",
    highlights: [],
  },
  {
    id: "Vaishnavi",
    name: "Vaishnavi",
    photo: "",
    country: "",
    countryFlag: "",
    countryId: "",
    university: "",
    program: "",
    term: "Fall 2024",
    rating: 5,
    headline: "",
    excerpt: "I had a really great experience with EC-Overseas. They were extremely kind, supportive, and helpful throughout my entire application process. Because of their efficient help, I was able to receive my Australian visa today, and I'm truly very happy and relieved.",
    fullStory: "",
    highlights: [],
  },
];

const allCountryFilters = [
  { id: "all", name: "All" },
  { id: "australia", name: "Australia" },
  { id: "uk", name: "UK" },
  { id: "japan", name: "Japan" },
  { id: "spain", name: "Spain" },
  { id: "italy", name: "Italy" },
];

const accentColors = [
  "from-orange-400 to-pink-500",
  "from-blue-400 to-violet-500",
  "from-emerald-400 to-teal-500",
  "from-amber-400 to-orange-500",
  "from-pink-400 to-rose-500",
  "from-violet-400 to-blue-500",
];

const StudentStoriesPage = () => {
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [expandedStory, setExpandedStory] = useState<string | null>(null);

  const filteredStories = useMemo(() => {
    if (selectedCountry === "all") return stories;
    return stories.filter(s => s.countryId === selectedCountry);
  }, [selectedCountry]);

  return (
    <div className="min-h-screen bg-background pt-14 pb-12">

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 bg-black text-white border-b border-white/10">
        <Link to="/" className="touch-target flex items-center text-white">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <span className="font-display text-lg">Student Stories</span>
        <div className="w-11" />
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-primary via-primary/95 to-accent/20 px-4 py-10 text-center">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <span className="inline-block px-3 py-1 rounded-full border border-accent/40 text-accent text-xs font-semibold tracking-widest uppercase mb-3">
            Real Experiences
          </span>
          <h1 className="font-display text-3xl md:text-4xl text-primary-foreground mb-2">
            Stories from Our Students
          </h1>
          <p className="text-primary-foreground/60 text-sm max-w-sm mx-auto">
            Hear from students whose lives changed through studying abroad with EC Overseas.
          </p>
          <div className="mt-6 flex justify-center gap-8">
            {[{ value: "500+", label: "Stories" }, { value: "4.8★", label: "Avg Rating" }, { value: "30+", label: "Countries" }].map(s => (
              <div key={s.label}>
                <p className="text-xl font-bold text-primary-foreground">{s.value}</p>
                <p className="text-xs text-primary-foreground/50">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Filter */}
      <div className="sticky top-14 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
          <Filter className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          {allCountryFilters.map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedCountry(f.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCountry === f.id
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      {/* Stories */}
      <div className="px-4 mt-6 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCountry}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid gap-4 md:grid-cols-2"
          >
            {filteredStories.map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <StoryCard
                  story={story}
                  color={accentColors[i % accentColors.length]}
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
          </div>
        )}
      </div>

      {/* CTA */}
      <section className="px-4 mt-10 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-center">
          <h2 className="font-display text-2xl text-primary-foreground">Write your own story</h2>
          <p className="mt-2 text-primary-foreground/60 text-sm max-w-sm mx-auto">
            Join thousands of students who've discovered the world through study abroad.
          </p>
          <Button className="mt-4 h-11 px-8 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link to="/contact">Start Your Journey</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

function StoryCard({ story, color, expanded, onToggle }: { story: Story; color: string; expanded: boolean; onToggle: () => void }) {
  const initials = story.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Gradient top bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${color}`} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          {story.photo ? (
            <img src={story.photo} alt={story.name} className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-accent/20" loading="lazy" />
          ) : (
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shrink-0 ring-2 ring-white/10`}>
              <span className="text-sm font-bold text-white">{initials}</span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-sm">{story.name}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-base">{story.countryFlag}</span>
              <span className="text-xs text-muted-foreground">{story.country}</span>
              <span className="text-muted-foreground/40 text-xs">•</span>
              <span className="text-xs text-muted-foreground">{story.term}</span>
            </div>
          </div>
          <div className="flex gap-0.5 shrink-0">
            {Array.from({ length: story.rating }).map((_, j) => (
              <Star key={j} className="h-3 w-3 text-amber-400 fill-amber-400" />
            ))}
          </div>
        </div>

        {/* Headline */}
        <div className="relative mb-3">
          <Quote className="h-5 w-5 text-accent/20 absolute -top-1 -left-1" />
          <p className="font-display text-base text-foreground italic pl-5 leading-snug">{story.headline}</p>
        </div>

        {/* Excerpt */}
        <p className={`text-sm text-muted-foreground leading-relaxed ${expanded ? "" : "line-clamp-3"}`}>
          {story.excerpt}
        </p>

        {/* Expanded */}
        <AnimatePresence>
          {expanded && story.highlights.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mt-4 flex flex-wrap gap-2">
                {story.highlights.map(h => (
                  <span key={h} className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent font-medium">
                    ✦ {h}
                  </span>
                ))}
              </div>
              <Link
                to={`/country/${story.countryId}`}
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent/80 transition-colors"
              >
                Explore {story.country} programs →
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={onToggle}
          className="mt-3 flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent/80 transition-colors"
        >
          {expanded ? <><ChevronUp className="h-3 w-3" /> Show less</> : <><ChevronDown className="h-3 w-3" /> Read more</>}
        </button>
      </div>
    </div>
  );
}

export default StudentStoriesPage;
