import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Share2, MapPin, Star, GraduationCap, Building2, FileText } from "lucide-react";
import { getFlagUrl, getFlagUrlFromName } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { allCountries } from "@/data/countries";
import { universities, programs } from "@/data/universities";
import franceHero from "@/assets/france-hero.jpg";

const countryImages: Record<string, string> = {
  france: franceHero,
};

const CountryPage = () => {
  const { id } = useParams<{ id: string }>();
  const country = allCountries.find(c => c.id === id);

  if (!country) {
    return (
      <div className="min-h-screen pt-14 flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-display text-2xl text-foreground">Country not found</h1>
          <Link to="/" className="mt-4 text-accent">Go home</Link>
        </div>
      </div>
    );
  }

  const countryPrograms = programs.filter(p => p.countryId === id);
  const countryUniversities = universities.filter(u => u.country === country.name);
  const heroImg = countryImages[id || ""] || franceHero;

  const faqItems = [
    { q: `Do I need a visa to study in ${country.name}?`, a: "Visa requirements vary based on your citizenship and program duration. Most semester programs require a student visa. We'll guide you through the entire process." },
    { q: `What language do I need to speak?`, a: "Many programs are offered in English. However, we recommend learning basic phrases in the local language to enrich your experience." },
    { q: `How much does it cost to live there?`, a: `Cost of living varies by city. On average, students spend €800-1,500/month including accommodation, food, and transportation.` },
    { q: `Can I work while studying?`, a: "Student visa regulations vary. Many countries allow part-time work (10-20 hours/week) during your studies." },
  ];

  return (
    <div className="min-h-screen bg-background pt-14 pb-20">
      {/* Sticky header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 bg-card/95 backdrop-blur-md border-b border-border">
        <Link to="/" className="touch-target flex items-center gap-1 text-foreground">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <span className="font-display text-lg text-foreground">{country.name}</span>
        <button className="touch-target flex items-center justify-center" aria-label="Share">
          <Share2 className="h-5 w-5 text-foreground" />
        </button>
      </div>

      {/* Hero */}
      <div className="relative h-[250px] md:h-[350px]">
        <img src={heroImg} alt={country.name} className="w-full h-full object-cover" width={1280} height={720} />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
      </div>

      {/* Country info */}
      <div className="px-4 -mt-8 relative z-10 max-w-4xl mx-auto">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="bg-card rounded-xl p-5 shadow-card">
            <div className="flex items-center gap-3">
              <img src={getFlagUrl(country.id, 80)} alt={country.name} className="w-12 h-9 rounded object-cover" />
              <div>
                <h1 className="font-display text-2xl md:text-3xl text-foreground">{country.name}</h1>
                <p className="text-muted-foreground italic">"{country.tagline}"</p>
              </div>
            </div>
            <Button className="w-full mt-4 h-12 bg-accent text-accent-foreground hover:bg-accent/90">
              View Programs
            </Button>
          </div>
        </motion.div>

        {/* Quick stats - horizontal scroll */}
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x">
          {[
            { icon: GraduationCap, label: "Programs", value: country.programCount },
            { icon: Building2, label: "Universities", value: country.universityCount },
            { icon: FileText, label: "Visa", value: "Required" },
          ].map(stat => (
            <div key={stat.label} className="snap-start shrink-0 bg-card rounded-xl p-4 shadow-soft border border-border min-w-[120px] text-center">
              <stat.icon className="h-5 w-5 text-accent mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground font-body">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* About */}
        <CollapsibleSection title={`About ${country.name}`} defaultOpen>
          <p className="text-muted-foreground leading-relaxed">
            {country.name} is one of the most popular study abroad destinations, offering a unique blend of academic excellence,
            rich cultural heritage, and unforgettable experiences. Students from around the world choose {country.name} for its
            prestigious universities, vibrant student life, and the opportunity to immerse themselves in a new culture.
          </p>
        </CollapsibleSection>

        {/* Programs */}
        <CollapsibleSection title={`Programs Available (${countryPrograms.length})`} defaultOpen>
          <div className="space-y-3">
            {countryPrograms.length > 0 ? countryPrograms.map(p => (
              <Link
                key={p.id}
                to={`/program/${p.id}`}
                className="block bg-secondary/50 rounded-lg p-4 hover:bg-secondary transition-colors"
              >
                <h4 className="font-semibold text-foreground">{p.name}</h4>
                <p className="text-sm text-muted-foreground">{p.university}</p>
                <div className="mt-2 flex items-center gap-3 text-sm">
                  <span className="font-medium text-foreground">{p.cost}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{p.term}</span>
                </div>
              </Link>
            )) : (
              <p className="text-muted-foreground">Programs coming soon for this destination.</p>
            )}
          </div>
        </CollapsibleSection>

        {/* Universities */}
        <CollapsibleSection title={`Partner Universities (${countryUniversities.length})`}>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
            {countryUniversities.length > 0 ? countryUniversities.map(u => (
              <Link
                key={u.id}
                to={`/university/${u.id}`}
                className="shrink-0 w-[200px] bg-secondary/50 rounded-lg p-4 hover:bg-secondary transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center text-xl mb-2">
                  {u.countryFlag}
                </div>
                <h4 className="font-semibold text-foreground text-sm">{u.name}</h4>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 text-gold fill-gold" /> {u.rating} • {u.programCount} programs
                </p>
              </Link>
            )) : (
              <p className="text-muted-foreground">University partnerships coming soon.</p>
            )}
          </div>
        </CollapsibleSection>

        {/* FAQ */}
        <CollapsibleSection title="FAQ">
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </CollapsibleSection>
      </div>

      {/* Sticky bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-card/95 backdrop-blur-md border-t border-border">
        <Button className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
          Apply Now
        </Button>
      </div>
    </div>
  );
};

function CollapsibleSection({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mt-6 border-b border-border pb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 touch-target"
      >
        <h3 className="font-display text-lg text-foreground">{title}</h3>
        <ChevronLeft className={`h-5 w-5 text-muted-foreground transition-transform ${open ? "-rotate-90" : "rotate-180"}`} />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="pb-2"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-secondary/50 rounded-lg">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-4 flex items-start gap-2 touch-target"
      >
        <span className="flex-1 font-medium text-sm text-foreground">{question}</span>
        <ChevronLeft className={`h-4 w-4 text-muted-foreground shrink-0 mt-0.5 transition-transform ${open ? "-rotate-90" : "rotate-180"}`} />
      </button>
      {open && (
        <div className="px-4 pb-4">
          <p className="text-sm text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";

export default CountryPage;
