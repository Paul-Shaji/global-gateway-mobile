import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Star,
  GraduationCap,
  Globe,
  Users,
  Quote,
  Mail,
  MessageCircle,
  Phone,
  MapPin,
  FileCheck,
  Wallet,
  Award,
  MessageSquare,
  Lightbulb,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { allCountries } from "@/data/countries";
import { programs } from "@/data/universities";
import { getFlagUrl } from "@/lib/utils";
import heroImage from "@/assets/WEBSITE_COVER_PAGE_ENGLISH.jpg.jpeg";
import examImage from "@/assets/WEBSITE WEBSITE 1496x538 01.jpg.jpeg";
import examImage2 from "@/assets/WEBSITE WEBSITE 1496x538 02.jpg.jpeg";
import examImage3 from "@/assets/WEBSITE WEBSITE 1496x538.jpg.jpeg";
import heroImageMobile from "@/assets/7.jpg.jpeg";
import studentabirami from "@/assets/abirami.png";
import studentSheba from "@/assets/sheba.png";
import inst1 from "@/assets/Andrew Thomas Jacob .jpg.jpeg";
import inst2 from "@/assets/EC-Alan-Saji-poster-30-1-25.jpg.jpeg";
import inst3 from "@/assets/EC-Albin-Johnson.jpg.jpeg";
import inst4 from "@/assets/EC-Indradath PS-poster-30-1-25.jpg.jpeg";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const studentStories = [
  {
    name: "Gopika Radhakrishnan",
    photo: "",
    country: "",
    headline:
      "I'm very grateful to E C Overseas for making my Australian study abroad dreams a reality. From the moment I walked in, they were super supportive. They helped me pick the perfect course that fit my interests and budget, made sure my PTE training was on point and handled my student visa application excellently. Their guidance every step of the way was invaluable – honestly, they took a lots of effort for each of the students journey. The team's guidance and support made the entire process stress-free. If you're looking for a reliable agency to help you study in Australia, I highly recommend E C Overseas.",
    university: "",
    rating: 5,
  },
  {
    name: "Abhirami PA",
    photo: studentabirami,
    country: "",
    headline:
      "I joined EC OVERSEAS to learn spoken English, which is a very good institute for improving communication skills. The teachers are well-qualified and friendly, and they help students speak English confidently and fluently. In the classes, we practice speaking, listening, reading, and writing. We also learn new vocabulary and correct pronunciation. The environment in EC Overseas is very supportive, and I enjoy learning there every day. This course is helping me overcome my fear of speaking in front of others and improving my confidence. I believe this training will help me in my future studies and career as well. Thankuu for everything.....",
    university: "",
    rating: 5,
  },
  {
    name: "Sheba Koshy",
    photo: studentSheba,
    country: "",
    headline:
      "My dream of studying abroad was made simpler and at ease with the help of EC Overseas. They showcased a great amount of patience during the entire journey and backed me up with the right amount of encouragement whenever I thought I couldn't make it. Recently, I got my student visa for Australia. All thanks to God, my parents and Mr. Ebez and his team who worked to make this possible. If you're planning to study abroad, please do consult EC Overseas. I highly recommend them to anyone looking for a trustworthy study abroad agency.",
    university: "",
    rating: 5,
  },
];

const roadmapSteps = [
  {
    icon: MessageSquare,
    title: "Discuss",
    description:
      "1-on-1 counselling with our experts to understand your goals, budget, and academic background.",
  },
  {
    icon: Lightbulb,
    title: "Ideate",
    description:
      "We shortlist the best-fit universities and programs tailored precisely to your profile.",
  },
  {
    icon: Wallet,
    title: "Finance",
    description:
      "Guidance on scholarships, education loans, and financial planning so cost is never a barrier.",
  },
  {
    icon: FileCheck,
    title: "Visa",
    description:
      "End-to-end visa documentation support with a consistently high approval rate.",
  },
  {
    icon: Home,
    title: "Accommodation",
    description:
      "We help you find safe, affordable housing so you land with a home already waiting.",
  },
  {
    icon: Award,
    title: "PR Assistance",
    description:
      "Post-study permanent residency guidance so you can build your future abroad.",
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function DestinationSlideshow({ countries }: { countries: typeof allCountries }) {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="overflow-hidden -mx-4 px-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(false)}
      onTouchEnd={() => setPaused(false)}
    >
      <div
        className="flex gap-3 w-max"
        style={{
          animation: paused ? "none" : "marquee 35s linear infinite",
        }}
      >
        {[...countries, ...countries].map((country, i) => (
          <Link
            key={`${country.id}-${i}`}
            to={`/country/${country.id}`}
            className="flex flex-col items-center w-[100px] md:w-[120px] shrink-0 group"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-secondary flex items-center justify-center overflow-hidden group-hover:shadow-card transition-shadow">
              <img
                src={getFlagUrl(country.id, 160)}
                alt={country.name}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="mt-2 text-sm font-medium text-foreground text-center">
              {country.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ExamBanner() {
  const images = [examImage, examImage2, examImage3];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % images.length), 3500);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <section className="overflow-hidden">
      <div className="relative w-full">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Exam banner ${i + 1}`}
            className={`w-full h-auto block transition-opacity duration-700 ${
              i === current ? "opacity-100" : "opacity-0 absolute inset-0"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

interface ContactPopupProps {
  visible: boolean;
  closing: boolean;
  close: () => void;
}

function ContactPopup({ visible, closing, close }: ContactPopupProps) {
  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: closing ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
        onClick={close}
      />

      {/* Popup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{
          opacity: closing ? 0 : 1,
          scale: closing ? 0.85 : 1,
          y: closing ? 40 : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 260 }}
        className="fixed inset-0 z-[201] flex items-center justify-center px-4 pointer-events-none"
      >
        <div className="relative w-full max-w-md pointer-events-auto overflow-hidden rounded-3xl shadow-2xl">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600" />

          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10" />
          <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-white/10" />
          <div className="absolute top-1/2 right-8 w-20 h-20 rounded-full bg-white/5" />

          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="relative z-10 p-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 mb-5">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white text-xs font-semibold tracking-widest uppercase">
                Free Consultation
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-3xl md:text-4xl text-white leading-tight mb-3">
              Ready to Study
              <br />
              Abroad?
            </h2>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Talk to an EC Overseas counsellor today — no fees, no pressure. Just
              honest advice about your future.
            </p>

            {/* Stats row */}
            <div className="flex gap-5 mb-7">
              {[
                { value: "500+", label: "Students Placed" },
                { value: "98%", label: "Visa Success" },
                { value: "6", label: "Countries" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-white font-bold text-lg leading-none">{stat.value}</p>
                  <p className="text-white/60 text-[11px] mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3">
              <Link
                to="/contact"
                onClick={close}
                className="flex items-center justify-center gap-2 h-12 rounded-xl bg-white text-orange-600 font-bold text-sm hover:bg-orange-50 transition-colors"
              >
                Book a Free Session
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="https://wa.me/919778558140"
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="flex items-center justify-center gap-2 h-12 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-sm transition-colors border border-white/20"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 shrink-0"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us Now
              </a>
            </div>

            {/* Bottom note */}
            <p className="text-center text-white/50 text-[11px] mt-4">
              🇮🇪 🇬🇧 🇨🇦 🇦🇺 🇳🇿 🇩🇪 &nbsp;·&nbsp; Thodupuzha, Kerala
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------

const Index = () => {
  // Scroll-driven roadmap plane
  const [activeStep, setActiveStep] = useState(0);
  const [planeY, setPlaneY] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || stepRefs.current.length === 0) return;

      const viewportMid = window.innerHeight / 2;
      let closestStep = 0;
      let closestDist = Infinity;

      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const stepMid = rect.top + rect.height / 2;
        const dist = Math.abs(stepMid - viewportMid);
        if (dist < closestDist) {
          closestDist = dist;
          closestStep = i;
        }
      });

      setActiveStep(closestStep);

      const activeEl = stepRefs.current[closestStep];
      if (activeEl && timelineRef.current) {
        const activeRect = activeEl.getBoundingClientRect();
        const timelineRect = timelineRef.current.getBoundingClientRect();
        const stepMid = activeRect.top + activeRect.height / 2 - timelineRect.top;
        setPlaneY(stepMid - 20);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Contact popup
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupClosing, setPopupClosing] = useState(false);

  const closePopup = () => {
    setPopupClosing(true);
    setTimeout(() => {
      setPopupVisible(false);
      setPopupClosing(false);
    }, 300);
  };

  useEffect(() => {
    const timer = setTimeout(() => setPopupVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-14">
      {/* ── Hero Section ── */}
      
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="European university campus" fetchPriority="high" className="hidden md:block w-full h-full object-cover" width={1920} height={1080} />
          <img src={heroImageMobile} alt="European university campus" fetchPriority="high" className="md:hidden w-full h-full object-cover" width={768} height={1080} />
          <div className="absolute inset-0  from-foreground/60 via-foreground/40 to-foreground/70" />
        </div>
        <div className="relative flex flex-col justify-between min-h-[420px] md:min-h-[560px] px-4 pt-12 pb-6 max-w-4xl mx-auto">

          {/* Quick stats — top on desktop, above contact on mobile */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="hidden md:flex gap-6"
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

          {/* Contact Us — bottom left */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-auto"
          >
            {/* Mobile: stats just above contact */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex md:hidden gap-6 mb-4"
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
            {/* Desktop */}
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-3 h-14 px-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-colors"
            >
              <Mail className="h-5 w-5 text-white/70 shrink-0" />
              <span className="text-base text-white/70">Contact Us</span>
            </Link>

            {/* Mobile */}
            <Link
              to="/contact"
              className="inline-flex md:hidden items-center gap-2 h-12 px-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-colors"
            >
              <Mail className="h-4 w-4 text-white/70 shrink-0" />
              <span className="text-sm text-white/70">Contact Us</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Popular Destinations ── */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bebas text-sm md:text-xl tracking-widest text-gray-500">
              Popular Destinations
            </h3>
          </div>
          <DestinationSlideshow countries={allCountries} />
        </div>
      </section>

      {/* ── Exam Banner ── */}
      <ExamBanner />

      {/* ── Services Roadmap ── */}
      <section className="section-padding relative overflow-hidden bg-white">
        {/* Ambient background layer */}
        <div
          className="absolute inset-0 pointer-events-none select-none"
          aria-hidden="true"
        >
          {/* Soft gradient orbs */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(251,146,60,0.25) 0%, transparent 70%)",
              top: "-10%",
              left: "-10%",
            }}
            animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(249,115,22,0.2) 0%, transparent 70%)",
              bottom: "5%",
              right: "-8%",
            }}
            animate={{ x: [0, -25, 0], y: [0, -30, 0] }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          />
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(251,146,60,0.18) 0%, transparent 70%)",
              top: "40%",
              right: "15%",
            }}
            animate={{ x: [0, 20, 0], y: [0, 25, 0] }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 6,
            }}
          />

          {/* Dot grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, #f97316 1.5px, transparent 1.5px)",
              backgroundSize: "32px 32px",
              opacity: 0.15,
            }}
          />

          {/* Floating squares */}
          {[
            { size: 56, top: "8%",  left: "6%",  duration: 20, delay: 0, opacity: 0.18 },
            { size: 36, top: "20%", left: "88%", duration: 24, delay: 2, opacity: 0.16 },
            { size: 44, top: "55%", left: "4%",  duration: 18, delay: 5, opacity: 0.14 },
            { size: 28, top: "70%", left: "92%", duration: 22, delay: 1, opacity: 0.18 },
            { size: 50, top: "85%", left: "12%", duration: 28, delay: 4, opacity: 0.12 },
            { size: 32, top: "35%", left: "94%", duration: 16, delay: 7, opacity: 0.16 },
          ].map((s, i) => (
            <motion.div
              key={i}
              className="absolute border-2 border-orange-400 rounded-md"
              style={{
                width: s.size,
                height: s.size,
                top: s.top,
                left: s.left,
                opacity: s.opacity,
                rotate: 15,
              }}
              animate={{
                y: [0, -22, 0],
                rotate: [15, 40, 15],
                opacity: [s.opacity, s.opacity * 1.8, s.opacity],
              }}
              transition={{
                duration: s.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: s.delay,
              }}
            />
          ))}

          {/* Floating circles */}
          {[
            { size: 14, top: "15%", left: "75%", duration: 14, delay: 0 },
            { size: 10, top: "45%", left: "8%",  duration: 18, delay: 3 },
            { size: 12, top: "78%", left: "80%", duration: 20, delay: 1 },
            { size: 8,  top: "60%", left: "50%", duration: 16, delay: 5 },
            { size: 10, top: "25%", left: "42%", duration: 22, delay: 2 },
            { size: 16, top: "90%", left: "60%", duration: 19, delay: 4 },
            { size: 9,  top: "5%",  left: "55%", duration: 17, delay: 6 },
          ].map((c, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-orange-400"
              style={{
                width: c.size,
                height: c.size,
                top: c.top,
                left: c.left,
                opacity: 0.3,
              }}
              animate={{
                y: [0, -16, 0],
                opacity: [0.3, 0.55, 0.3],
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: c.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: c.delay,
              }}
            />
          ))}

          {/* Diagonal lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.06 }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="diag-lines"
                x="0"
                y="0"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <line
                  x1="0"
                  y1="60"
                  x2="60"
                  y2="0"
                  stroke="#f97316"
                  strokeWidth="1.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diag-lines)" />
          </svg>

          {/* Corner accent blobs */}
          <div
            className="absolute top-0 right-0 w-72 h-72"
            style={{
              background:
                "linear-gradient(225deg, rgba(251,146,60,0.15) 0%, transparent 60%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-72 h-72"
            style={{
              background:
                "linear-gradient(45deg, rgba(249,115,22,0.15) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Foreground content */}
        <div className="max-w-3xl mx-auto relative z-10">
          {/* Section header */}
          <div className="text-center mb-14">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-500 text-xs font-semibold tracking-widest uppercase mb-4">
                Our Process
              </span>
              <h3 className="font-bebas text-xl md:text-2xl text-gray-600 mb-4">
                Your Journey to Studying Abroad
              </h3>
            </motion.div>
          </div>

          {/* Timeline with scroll-driven plane */}
          <div className="relative" ref={timelineRef}>
            {/* Vertical connector line — desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-px bg-gradient-to-b from-orange-400 via-orange-200 to-transparent" />
            {/* Vertical connector line — mobile */}
            <div className="md:hidden absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-orange-400 via-orange-200 to-transparent" />

            {/* Scroll-driven plane */}
            <motion.div
              className="absolute z-20 hidden md:flex items-center justify-center"
              style={{
                top: planeY,
                left: "calc(50% - 20px)",
                width: 40,
                height: 40,
              }}
            >
              <div className="w-10 h-10 rounded-full bg-orange-500 shadow-lg shadow-orange-200 flex items-center justify-center ring-4 ring-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-5 h-5"
                  style={{ transform: "rotate(90deg)" }}
                >
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </div>
            </motion.div>

            <div className="space-y-8">
              {roadmapSteps.map((step, i) => {
                const isRight = i % 2 === 0;
                return (
                  <motion.div
                    key={step.title}
                    ref={(el) => { stepRefs.current[i] = el; }}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                  >
                    {/* Mobile layout */}
                    <div className="flex items-start gap-4 md:hidden pl-1">
                      <div className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shrink-0 ring-2 ring-orange-100 ring-offset-2 ring-offset-white">
                        <step.icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="pt-1">
                        <p className="text-xs font-bold tracking-widest text-orange-500 uppercase mb-1">
                          Step {i + 1}
                        </p>
                        <h3 className="font-display text-xl text-gray-900">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Desktop layout */}
                    <div className="hidden md:grid md:grid-cols-[1fr_80px_1fr] md:items-center">
                      <div className={isRight ? "pr-8 text-right" : ""}>
                        {isRight && (
                          <>
                            <p className="text-xs font-bold tracking-widest text-orange-500 uppercase mb-1">
                              Step {i + 1}
                            </p>
                            <h3 className="font-display text-xl md:text-2xl text-gray-900">
                              {step.title}
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed mt-1">
                              {step.description}
                            </p>
                          </>
                        )}
                      </div>
                      <div className="flex justify-center">
                        <div
                          className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ring-2 ring-offset-2 ring-offset-white transition-all duration-300 ${
                            activeStep === i
                              ? "bg-orange-500 ring-orange-300 scale-110"
                              : "bg-gradient-to-br from-orange-400 to-orange-600 ring-orange-100"
                          }`}
                        >
                          <step.icon className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div className={!isRight ? "pl-8" : ""}>
                        {!isRight && (
                          <>
                            <p className="text-xs font-bold tracking-widest text-orange-500 uppercase mb-1">
                              Step {i + 1}
                            </p>
                            <h3 className="font-display text-xl md:text-2xl text-gray-900">
                              {step.title}
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed mt-1">
                              {step.description}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-500 text-xs font-semibold tracking-widest uppercase mb-4">
                Why EC Overseas
              </span>
              <h2 className="font-bebas text-2xl md:text-3xl text-gray-900 mb-5">
                We've Been Where You're Going
                <br className="hidden md:block" />
              </h2>
              <p className="text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
                EC Overseas was built in Thodupuzha with one purpose — to give every
                Kerala student the same shot at a world-class education that was once
                only available to the privileged few.
              </p>
            </motion.div>
          </div>

          {/* Top feature row — 2 large cards */}
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl bg-orange-500 min-h-[260px] flex flex-col justify-end p-8"
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                                    radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="absolute top-6 right-6 text-7xl opacity-20 select-none">🎓</div>
              <div className="absolute top-8 right-8 text-6xl select-none">🎓</div>
              <div className="relative z-10">
                <span className="inline-block text-orange-100 text-xs font-bold tracking-widest uppercase mb-3">
                  Our People
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-white mb-2">
                  Expert Counsellors,
                  <br />
                  Not Sales Agents
                </h3>
                <p className="text-orange-100 text-sm leading-relaxed max-w-xs">
                  Our team has personally studied or worked abroad. You get honest
                  advice — even if it means recommending a different path.
                </p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative overflow-hidden rounded-3xl bg-gray-900 min-h-[260px] flex flex-col justify-between p-8"
            >
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `linear-gradient(45deg, white 25%, transparent 25%),
                                    linear-gradient(-45deg, white 25%, transparent 25%)`,
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="absolute bottom-0 right-0 text-[120px] leading-none opacity-5 select-none font-bold text-white">
                10K
              </div>
              <div className="relative z-10">
                <span className="inline-block text-gray-400 text-xs font-bold tracking-widest uppercase mb-3">
                  Track Record
                </span>
                <div className="font-display text-6xl md:text-7xl text-white mb-1">10K+</div>
                <div className="text-orange-400 font-semibold text-lg mb-3">Success Stories</div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                  A decade of helping Kerala students reach universities across the world.
                  Your dream is familiar territory for us.
                </p>
              </div>
              <div className="relative z-10 flex gap-2 mt-4">
                {["🇮🇪", "🇬🇧", "🇨🇦", "🇦🇺", "🇳🇿", "🇩🇪"].map((flag) => (
                  <span key={flag} className="text-2xl">{flag}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom row — 3 smaller cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-3xl bg-white border border-gray-100 p-7 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                <FileCheck className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-display text-xl text-gray-900 mb-2">End-to-End Support</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Counselling, applications, visas, accommodation, and PR — handled
                  under one roof so nothing slips through the cracks.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="rounded-3xl bg-orange-50 border border-orange-100 p-7 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <h3 className="font-display text-xl text-gray-900 mb-2">No Hidden Costs</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Transparent pricing from day one. We help you find scholarships
                  and loans so finances never stand between you and your future.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="rounded-3xl bg-white border border-gray-100 p-7 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-display text-xl text-gray-900 mb-2">Certified & Recognised</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Officially recognised by universities across Ireland, UK, Canada
                  and Australia. Your application carries real weight.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-400 text-sm mb-5">
              Our counsellors are available six days a week — no appointment needed.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 h-12 px-8 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors"
            >
              Book a Free Consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Student Stories ── */}
      <section className="section-padding bg-gradient-to-b from-secondary/30 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold tracking-widest text-accent uppercase">
                Testimonials
              </span>
              <h2 className="font-bebas text-2xl md:text-3xl tracking-widest text-gray-800">
                What Our Students Say
              </h2>
            </div>
            <Link
              to="/stories"
              className="text-sm font-semibold text-accent flex items-center gap-1 hover:gap-2 transition-all"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:overflow-visible md:snap-none">
            {studentStories.map((story, i) => {
              const gradients = [
                "from-orange-400 to-pink-500",
                "from-blue-400 to-violet-500",
                "from-emerald-400 to-teal-500",
              ];
              const grad = gradients[i % gradients.length];
              const initials = story.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <motion.div
                  key={story.name}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="w-[80vw] md:w-auto shrink-0 md:shrink snap-start"
                >
                  <Link
                    to="/stories"
                    className="flex flex-col h-full bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className={`h-1.5 w-full bg-gradient-to-r ${grad}`} />
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        {story.photo ? (
                          <img
                            src={story.photo}
                            alt={story.name}
                            className="w-11 h-11 rounded-full object-cover ring-2 ring-accent/20 shrink-0"
                          />
                        ) : (
                          <div
                            className={`w-11 h-11 rounded-full bg-gradient-to-br ${grad} flex items-center justify-center shrink-0 ring-2 ring-white/10`}
                          >
                            <span className="text-sm font-bold text-white">{initials}</span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground text-sm truncate">
                            {story.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {story.university}
                          </p>
                        </div>
                        <div className="flex gap-0.5 shrink-0">
                          {Array.from({ length: story.rating }).map((_, j) => (
                            <Star key={j} className="h-3 w-3 text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <div className="relative flex-1">
                        <Quote className="h-6 w-6 text-accent/15 absolute -top-1 -left-1" />
                        <p className="text-sm text-muted-foreground leading-relaxed pl-4 line-clamp-4">
                          {story.headline}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Instagram Section ── */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-500 text-xs font-semibold tracking-widest uppercase mb-2">
                Student Life
              </span>
              <h2 className="font-bebas text-3xl md:text-4xl tracking-widest text-gray-800">
                FROM OUR INSTAGRAM
              </h2>
            </div>
            <a
              href="https://instagram.com/ec_overseas/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:border-orange-400 hover:text-orange-500 transition-colors text-sm font-semibold text-gray-600"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
              @ec_overseas
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { image: inst1, caption: "", likes: "1.2k", tag: "Australia", tagColor: "bg-green-500" },
              { image: inst2, caption: "", likes: "984",  tag: "UK",        tagColor: "bg-blue-600" },
              { image: inst3, caption: "", likes: "2.1k", tag: "UK",        tagColor: "bg-yellow-500" },
              { image: inst4, caption: "", likes: "876",  tag: "Canada",    tagColor: "bg-red-600" },
            ].map((post, i) => (
              <motion.a
                key={i}
                href="https://instagram.com/ec_overseas/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative block rounded-2xl overflow-hidden cursor-pointer"
                style={{ aspectRatio: "1/1" }}
              >
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </div>
                <div className="absolute top-3 left-3">
                  <span className={`${post.tagColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                    {post.tag}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-xs leading-snug font-medium line-clamp-2">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <svg viewBox="0 0 24 24" className="h-3 w-3 text-red-400 fill-red-400">
                      <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
                    </svg>
                    <span className="text-white/70 text-[10px] font-medium">{post.likes}</span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-2xl ring-2 ring-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-8 flex justify-center"
          >
            <a
              href="https://instagram.com/ec_overseas/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300"
              style={{
                background:
                  "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                color: "white",
              }}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
              View More on Instagram
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section className="section-padding bg-secondary/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="font-display text-2xl md:text-3xl text-foreground">Have Questions?</h2>
          </div>
          <div className="bg-card rounded-xl p-6 md:p-8 shadow-soft border border-border">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {[
                { icon: Mail,  title: "Email Us",      desc: "Get a response within 24 hours" },
                { icon: Users, title: "1-on-1 Advising", desc: "Schedule a personal session" },
                { icon: Globe, title: "30+ Countries",  desc: "Expert knowledge worldwide" },
              ].map((item) => (
                <div key={item.title} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button
                className="h-12 px-8 bg-accent text-accent-foreground hover:bg-accent/90"
                asChild
              >
                <Link to="/contact">
                  Talk to an Advisor <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding text-primary-foreground bg-stone-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl">Ready to explore the world?</h2>
          <p className="mt-3 text-primary-foreground/70 max-w-md mx-auto">
            Start your study abroad journey today. Our advisors are here to help.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="h-12 px-8 bg-accent text-accent-foreground hover:bg-accent/90"
              asChild
            >
              <Link to="/contact">Get Started</Link>
            </Button>
            <Button
              variant="outline"
              className="h-12 px-8 border-primary-foreground/30 hover:bg-primary-foreground/10 bg-background border text-secondary-foreground"
              asChild
            >
              <Link to="/search">Browse Programs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="section-padding bg-card border-t border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand + Contact */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-accent" />
              <span className="font-display text-lg text-foreground">ECoverseas</span>
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://maps.app.goo.gl/3K2yygR7kKj79ta77"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  <span>EC Overseas</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:offer.tdpa@gmail.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0 text-accent" />
                  <span>offer.tdpa@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919778358140"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0 text-accent" />
                  <span>+91 9778358140</span>
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex items-center gap-3 pt-1">
              {[
                {
                  href: "https://instagram.com/ec_overseas/",
                  label: "Instagram",
                  svg: (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                    </svg>
                  ),
                },
                {
                  href: "https://linkedin.com/in/ebez-b-punnoose-434910395/",
                  label: "LinkedIn",
                  svg: (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
                {
                  href: "https://facebook.com/ecoverseastdpa/",
                  label: "Facebook",
                  svg: (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Explore", links: ["Programs", "Countries", "Universities", "Scholarships"] },
            { title: "Support", links: ["Contact Us", "FAQs", "Student Stories", "Blog"] },
            { title: "Legal",   links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-foreground mb-3 font-body text-sm">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          © EC Overseas. All rights reserved.
        </div>
      </footer>

      {/* ── WhatsApp Floating Button ── */}
      <a
        href="https://wa.me/9778558140"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* ── Instagram Floating Button ── */}
      <a
        href="https://instagram.com/ec_overseas/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Follow on Instagram"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      </a>

      {/* ── Contact Popup ── */}
      <ContactPopup
        visible={popupVisible}
        closing={popupClosing}
        close={closePopup}
      />
    </div>
  );
};

export default Index;