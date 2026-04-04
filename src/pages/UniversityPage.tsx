import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Heart, Star, MapPin, Calendar, Users, Award, GraduationCap } from "lucide-react";
import { getFlagUrlFromName } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { universities, programs } from "@/data/universities";
import sorbonneImg from "@/assets/sorbonne.jpg";

const uniImages: Record<string, string> = {
  sorbonne: sorbonneImg,
};

const UniversityPage = () => {
  const { id } = useParams<{ id: string }>();
  const uni = universities.find(u => u.id === id);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  if (!uni) {
    return (
      <div className="min-h-screen pt-14 flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-display text-2xl text-foreground">University not found</h1>
          <Link to="/" className="mt-4 text-accent">Go home</Link>
        </div>
      </div>
    );
  }

  const uniPrograms = programs.filter(p => p.universityId === id);
  const heroImg = uniImages[id || ""] || sorbonneImg;
  const tabs = ["About", "Programs", "Campus"];

  const reviews = [
    { name: "Sarah M.", rating: 5, text: "An incredible experience that changed my perspective on education and life. The faculty was welcoming and the city was magical.", term: "Spring 2025" },
    { name: "James L.", rating: 4, text: "Great programs and supportive staff. The cultural immersion was the highlight of my study abroad journey.", term: "Fall 2024" },
    { name: "Aiko T.", rating: 5, text: "I made lifelong friends and gained skills that helped me land my dream job. Would absolutely recommend!", term: "Academic Year 2024" },
  ];

  return (
    <div className="min-h-screen bg-background pt-14 pb-20">
      {/* Sticky header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 bg-card/95 backdrop-blur-md border-b border-border">
        <Link to="/" className="touch-target flex items-center text-foreground">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <span className="font-display text-base text-foreground truncate max-w-[200px]">{uni.name}</span>
        <button
          onClick={() => setSaved(!saved)}
          className="touch-target flex items-center justify-center"
          aria-label={saved ? "Unsave" : "Save"}
        >
          <Heart className={`h-5 w-5 ${saved ? "text-accent fill-accent" : "text-foreground"}`} />
        </button>
      </div>

      {/* Logo & info */}
      <div className="px-4 pt-4 text-center">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-secondary flex items-center justify-center shadow-soft overflow-hidden">
           <img src={getFlagUrlFromName(uni.country, 160)} alt={uni.country} className="w-full h-full object-cover" />
         </div>
        <h1 className="font-display text-2xl text-foreground mt-3">{uni.name}</h1>
        <p className="text-muted-foreground flex items-center justify-center gap-1 mt-1">
          <MapPin className="h-4 w-4" /> {uni.city}, {uni.country}
        </p>
      </div>

      {/* Gallery */}
      <div className="mt-4 px-4">
        <div className="rounded-xl overflow-hidden h-[200px] md:h-[300px]">
          <img src={heroImg} alt={uni.name} className="w-full h-full object-cover" loading="lazy" width={1280} height={720} />
        </div>
      </div>

      {/* Quick facts */}
      <div className="mt-4 px-4 flex gap-3 overflow-x-auto pb-2">
        {[
          { icon: Calendar, label: "Founded", value: uni.founded },
          { icon: Award, label: "Ranking", value: uni.ranking || "N/A" },
          { icon: Users, label: "Students", value: uni.students },
        ].map(fact => (
          <div key={fact.label} className="shrink-0 bg-card rounded-xl p-4 shadow-soft border border-border min-w-[110px] text-center">
            <fact.icon className="h-5 w-5 text-accent mx-auto mb-1" />
            <p className="text-base font-bold text-foreground font-body">{fact.value}</p>
            <p className="text-xs text-muted-foreground">{fact.label}</p>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="mt-4 px-4 space-y-2">
        <Button className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90">
          <GraduationCap className="h-4 w-4 mr-2" /> View Programs ({uniPrograms.length})
        </Button>
        <Button variant="outline" className="w-full h-12 border-border text-foreground">
          Schedule a Visit
        </Button>
      </div>

      {/* Tabs */}
      <div className="mt-6 border-b border-border">
        <div className="flex px-4 overflow-x-auto gap-0">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === i
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="px-4 mt-4 max-w-4xl mx-auto">
        <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          {activeTab === 0 && (
            <div>
              <p className="text-muted-foreground leading-relaxed">{uni.description}</p>
              <div className="mt-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-gold fill-gold" />
                <span className="font-bold text-foreground font-body">{uni.rating}</span>
                <span className="text-muted-foreground">({uni.reviewCount} reviews)</span>
              </div>
            </div>
          )}
          {activeTab === 1 && (
            <div className="space-y-3">
              {uniPrograms.length > 0 ? uniPrograms.map(p => (
                <Link
                  key={p.id}
                  to={`/program/${p.id}`}
                  className="block bg-card rounded-lg p-4 shadow-soft border border-border hover:shadow-card transition-shadow"
                >
                  <h4 className="font-semibold text-foreground">{p.name}</h4>
                  <div className="mt-2 flex flex-wrap gap-2 text-sm">
                    <span className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground">{p.duration}</span>
                    <span className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground">{p.term}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{p.language}</p>
                </Link>
              )) : (
                <p className="text-muted-foreground">No programs currently listed.</p>
              )}
            </div>
          )}
          {activeTab === 2 && (
            <div>
              <div className="rounded-xl overflow-hidden h-[200px] bg-secondary">
                <img src={heroImg} alt="Campus" className="w-full h-full object-cover" loading="lazy" width={1280} height={720} />
              </div>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Located in the heart of {uni.city}, the campus offers a unique blend of historic architecture and modern facilities.
                Students enjoy access to world-class libraries, research labs, and cultural venues.
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Reviews */}
      <div className="px-4 mt-8 max-w-4xl mx-auto">
        <h3 className="font-display text-lg text-foreground flex items-center gap-2">
          Student Reviews
          <span className="text-sm font-body font-normal text-muted-foreground">({uni.rating}★)</span>
        </h3>
        <div className="mt-3 space-y-3">
          {reviews.map((r, i) => (
            <div key={i} className="bg-card rounded-lg p-4 shadow-soft border border-border">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">{r.name}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 text-gold fill-gold" />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.text}</p>
              <p className="mt-2 text-xs text-muted-foreground">{r.term}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-card/95 backdrop-blur-md border-t border-border">
        <Button className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
          Apply to Program
        </Button>
      </div>
    </div>
  );
};

export default UniversityPage;
