import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, ArrowRight, Star, GraduationCap, Globe, Users, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { allCountries } from "@/data/countries";
import { featuredUniversities, programs } from "@/data/universities";
import { getFlagUrl, getFlagUrlFromName } from "@/lib/utils";
import heroImage from "@/assets/hero-study-abroad.jpg";
import studentSarah from "@/assets/student-sarah.jpg";
import studentJames from "@/assets/student-james.jpg";
import studentPriya from "@/assets/student-priya.jpg";

const studentStories = [
  { name: "Sarah Chen", photo: studentSarah, country: "France", headline: "Paris changed the way I see the world", university: "Sorbonne University", rating: 5 },
  { name: "James Nakamura", photo: studentJames, country: "United Kingdom", headline: "Oxford exceeded every expectation I had", university: "University of Oxford", rating: 5 },
  { name: "Priya Sharma", photo: studentPriya, country: "Japan", headline: "Japan taught me balance between tradition and innovation", university: "University of Tokyo", rating: 5 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background pt-14">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="European university campus" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
        </div>
        <div className="relative px-4 pt-12 pb-16 md:pt-20 md:pb-24 lg:pt-32 lg:pb-36 max-w-4xl mx-auto">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight text-balance"
          >
            Your journey begins
            <br />
            <span className="italic">beyond borders</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-primary-foreground/80 text-lg md:text-xl max-w-md"
          >
            Discover programs at world-class universities across 30+ countries
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <Link
              to="/search"
              className="flex items-center gap-3 w-full max-w-md h-14 px-5 rounded-xl bg-card/95 backdrop-blur-md shadow-elevated text-muted-foreground hover:bg-card transition-colors"
            >
              <Search className="h-5 w-5 shrink-0" />
              <span className="text-base">Search countries, universities...</span>
            </Link>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex gap-6"
          >
            {[
              { icon: Globe, label: "Countries", value: "30+" },
              { icon: GraduationCap, label: "Programs", value: "200+" },
              { icon: Users, label: "Students", value: "10K+" },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <stat.icon className="h-5 w-5 text-primary-foreground/70 mx-auto mb-1" />
                <p className="text-xl font-bold text-primary-foreground font-body">{stat.value}</p>
                <p className="text-xs text-primary-foreground/60">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl md:text-3xl text-foreground">Popular Destinations</h2>
            <Link to="/countries" className="text-sm font-medium text-accent flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <DestinationSlideshow countries={allCountries} />
        </div>
      </section>

      {/* Featured Universities */}
      <section className="section-padding bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6">Featured Universities</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredUniversities.slice(0, 3).map((uni, i) => (
              <motion.div
                key={uni.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i }}
              >
                <Link
                  to={`/university/${uni.id}`}
                  className="block bg-card rounded-xl p-5 shadow-soft hover:shadow-card transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center shrink-0 overflow-hidden">
                       <img src={getFlagUrlFromName(uni.country, 80)} alt={uni.country} className="w-full h-full object-cover" />
                    </div>
                     <div className="flex-1 min-w-0">
                       <h3 className="font-display text-lg text-foreground">{uni.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {uni.city}, {uni.country}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-gold fill-gold" /> {uni.rating}
                    </span>
                    <span>{uni.ranking}</span>
                    <span>{uni.programCount} programs</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Programs */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6">Popular Programs</h2>
          <div className="space-y-3">
            {programs.slice(0, 4).map(program => (
              <Link
                key={program.id}
                to={`/program/${program.id}`}
                className="block bg-card rounded-xl p-4 shadow-soft hover:shadow-card transition-shadow border border-border"
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground">{program.name}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{program.university}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">{program.duration}</span>
                      <span className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">{program.term}</span>
                      <span className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">{program.language}</span>
                    </div>
                  </div>
                   <div className="text-right shrink-0">
                     <p className="text-xs text-muted-foreground">{program.category}</p>
                   </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline" className="border-border text-foreground" asChild>
              <Link to="/programs">View All Programs <ArrowRight className="h-4 w-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Student Stories */}
      <section className="section-padding bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl md:text-3xl text-foreground">Student Stories</h2>
            <Link to="/stories" className="text-sm font-medium text-accent flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {studentStories.map((story, i) => (
              <motion.div
                key={story.name}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i }}
              >
                <Link
                  to="/stories"
                  className="block bg-card rounded-xl p-5 shadow-soft hover:shadow-card transition-shadow border border-border"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img src={story.photo} alt={story.name} className="w-12 h-12 rounded-full object-cover border-2 border-accent/20" width={48} height={48} />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{story.name}</p>
                      <p className="text-xs text-muted-foreground">{story.university}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <Quote className="h-4 w-4 text-accent/30 absolute -top-0.5 -left-0.5" />
                    <p className="font-display text-base text-foreground italic pl-4 leading-snug">"{story.headline}"</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{story.country}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: story.rating }).map((_, j) => (
                        <Star key={j} className="h-3 w-3 text-gold fill-gold" />
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl">Ready to explore the world?</h2>
          <p className="mt-3 text-primary-foreground/70 max-w-md mx-auto">
            Start your study abroad journey today. Our advisors are here to help.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="h-12 px-8 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link to="/apply">Apply Now</Link>
            </Button>
            <Button variant="outline" className="h-12 px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/contact">Talk to an Advisor</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-padding bg-card border-t border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="h-6 w-6 text-accent" />
              <span className="font-display text-lg text-foreground">StudyAbroad</span>
            </div>
            <p className="text-sm text-muted-foreground">Connecting students with life-changing study abroad experiences worldwide.</p>
          </div>
          {[
            { title: "Explore", links: ["Programs", "Countries", "Universities", "Scholarships"] },
            { title: "Support", links: ["Contact Us", "FAQs", "Student Stories", "Blog"] },
            { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="font-semibold text-foreground mb-3 font-body text-sm">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          © 2026 StudyAbroad. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

function DestinationSlideshow({ countries }: { countries: typeof allCountries }) {
  const [offset, setOffset] = useState(0);
  const [paused, setPaused] = useState(false);
  const itemWidth = 116; // w-[100px] + gap
  const maxOffset = Math.max(0, countries.length * itemWidth - 400);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setOffset(prev => (prev >= maxOffset ? 0 : prev + itemWidth));
    }, 3000);
    return () => clearInterval(interval);
  }, [paused, maxOffset]);

  return (
    <div
      className="overflow-hidden -mx-4 px-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div
        className="flex gap-3 transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${offset}px)` }}
      >
        {countries.map((country, i) => (
          <motion.div
            key={country.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 * i }}
          >
            <Link
              to={`/country/${country.id}`}
              className="flex flex-col items-center w-[100px] md:w-[120px] shrink-0 group"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-secondary flex items-center justify-center overflow-hidden group-hover:shadow-card transition-shadow">
                <img src={getFlagUrl(country.id, 160)} alt={country.name} className="w-full h-full object-cover" />
              </div>
              <p className="mt-2 text-sm font-medium text-foreground text-center">{country.name}</p>
              <p className="text-xs text-muted-foreground">{country.programCount} programs</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Index;
