import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Share2, MapPin, Globe, FileText, ChevronDown } from "lucide-react";
import { getFlagUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { popularCountries } from "@/data/countries";

const CountryPage = () => {
  const { id } = useParams<{ id: string }>();
  const country = popularCountries.find(c => c.id === id);

  if (!country) {
    return (
      <div className="min-h-screen pt-14 flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-display text-2xl text-foreground">Country not found</h1>
          <Link to="/" className="mt-4 text-accent underline block">Go home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-28">

      {/* Sticky header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 bg-card/95 backdrop-blur-md border-b border-border">
        <Link to="/" className="touch-target flex items-center gap-1 text-foreground">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <span className="font-display text-lg text-foreground">{country.name}</span>
        <button
          onClick={() => navigator.share?.({ title: country.name, url: window.location.href })}
          className="touch-target flex items-center justify-center"
          aria-label="Share"
        >
          <Share2 className="h-5 w-5 text-foreground" />
        </button>
      </div>

      {/* Hero image */}
      <div className="relative h-[260px] md:h-[420px] mt-14">
        <img
          src={country.heroImage}
          alt={country.name}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Overlaid country name on hero */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-5">
          <div className="max-w-3xl mx-auto flex items-end gap-3">
            <img
              src={getFlagUrl(country.id, 80)}
              alt={country.name}
              className="w-12 h-9 rounded-md object-cover shadow-lg shrink-0"
            />
            <div>
              <h1 className="font-display text-3xl md:text-4xl text-white leading-tight">
                {country.name}
              </h1>
              <p className="text-white/70 text-sm italic mt-0.5 ">{country.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 mt-6 space-y-6">

        {/* Quick info pills */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap gap-2"
        >
          {[
            { icon: Globe,    label: country.region },
            { icon: MapPin,   label: "Student Visa Required" },
            { icon: FileText, label: "EC Overseas Verified" },
          ].map(pill => (
            <div
              key={pill.label}
              className="flex items-center gap-1.5 bg-accent/10 text-accent rounded-full px-3 py-1.5 text-xs font-semibold"
            >
              <pill.icon className="h-3.5 w-3.5 shrink-0" />
              {pill.label}
            </div>
          ))}
        </motion.div>

        {/* About */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-card rounded-2xl border border-border p-6 shadow-sm"
        >
          <h2 className="font-display text-xl text-foreground mb-3">About {country.name}</h2>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base text-justify">
            {country.description}
          </p>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="font-display text-xl text-foreground mb-3">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {country.faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>
        </motion.div>

        {/* CTA card */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-accent rounded-2xl p-6 text-center"
        >
          <h3 className="font-display text-xl text-accent-foreground mb-2">
            Ready to study in {country.name}?
          </h3>
          <p className="text-accent-foreground/80 text-sm mb-4 leading-relaxed">
            Our counsellors have helped hundreds of Kerala students reach {country.name}.
            Book a free session and get a personalised plan.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 h-11 px-8 bg-white text-accent font-semibold rounded-xl hover:bg-white/90 transition-colors text-sm"
          >
            Book a Free Consultation
          </Link>
        </motion.div>

      </div>

      {/* Sticky bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-card/95 backdrop-blur-md border-t border-border">
        <Link to="/contact">
          <Button className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-xl">
            Apply Now — {country.name}
          </Button>
        </Link>
      </div>

    </div>
  );
};

/* ── FAQ Item ── */
function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`rounded-xl border transition-colors ${
        open ? "border-accent/40 bg-accent/5" : "border-border bg-card"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-start gap-3"
      >
        <span className="flex-1 font-medium text-sm text-foreground leading-snug">
          {question}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground shrink-0 mt-0.5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="px-5 pb-5"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">{answer}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default CountryPage;