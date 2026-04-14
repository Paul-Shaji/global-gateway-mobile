import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap, FileText, Shield, BookOpen, Pencil, Globe,
  ArrowRight, MapPin, Award, Users, CheckCircle, Mail, Phone,
} from "lucide-react";

import examImage  from "@/assets/WEBSITE WEBSITE 1496x538 01.jpg.jpeg";
import examImage2 from "@/assets/WEBSITE WEBSITE 1496x538 02.jpg.jpeg";
import examImage3 from "@/assets/WEBSITE WEBSITE 1496x538.jpg.jpeg";
import founder    from "@/assets/founder.jpeg";

/* ── animated counter ── */
const Counter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref  = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        let v = 0;
        const step = Math.max(1, Math.ceil(target / 80));
        const id = setInterval(() => {
          v = Math.min(v + step, target);
          setN(v);
          if (v >= target) clearInterval(id);
        }, 20);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{n}{suffix}</span>;
};

/* ── fade wrapper ── */
const Fade = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
);

/* ── Enhanced animated background orbs ── */
const AnimatedBg = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {/* Animated gradient blobs */}
    <motion.div
      className="absolute w-[800px] h-[800px] rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(201,79,0,0.08) 0%, rgba(201,79,0,0.02) 50%, transparent 80%)",
        top: "-20%",
        left: "-15%",
      }}
      animate={{ 
        x: [0, 60, 0], 
        y: [0, 50, 0], 
        scale: [1, 1.1, 1],
        rotate: [0, 90, 0]
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-[700px] h-[700px] rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(245,166,35,0.07) 0%, rgba(245,166,35,0.02) 50%, transparent 80%)",
        bottom: "-15%",
        right: "-10%",
      }}
      animate={{ 
        x: [0, -50, 0], 
        y: [0, -40, 0], 
        scale: [1, 1.08, 1],
        rotate: [0, -120, 0]
      }}
      transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 3 }}
    />
    <motion.div
      className="absolute w-[500px] h-[500px] rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(201,79,0,0.06) 0%, transparent 70%)",
        top: "50%",
        left: "30%",
      }}
      animate={{ 
        x: [0, 40, 0], 
        y: [0, -30, 0],
        scale: [1, 1.12, 1]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 6 }}
    />
    <motion.div
      className="absolute w-[400px] h-[400px] rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(245,166,35,0.05) 0%, transparent 70%)",
        bottom: "20%",
        right: "25%",
      }}
      animate={{ 
        x: [0, -35, 0], 
        y: [0, 45, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{ duration: 23, repeat: Infinity, ease: "easeInOut", delay: 9 }}
    />
    
    {/* Animated particle grid */}
    <motion.div 
      className="absolute inset-0"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(201,79,0,0.12) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    
    {/* Floating geometric shapes */}
    {[
      { size: 60, top: "8%", left: "12%", dur: 22, delay: 0, rotate: 45 },
      { size: 35, top: "20%", right: "8%", dur: 26, delay: 4, rotate: 30 },
      { size: 45, top: "70%", left: "5%", dur: 19, delay: 7, rotate: 60 },
      { size: 28, top: "85%", right: "15%", dur: 24, delay: 2, rotate: 25 },
      { size: 40, top: "40%", left: "85%", dur: 21, delay: 5, rotate: 50 },
      { size: 32, top: "15%", left: "45%", dur: 27, delay: 8, rotate: 35 },
    ].map((s, i) => (
      <motion.div
        key={i}
        className="absolute border-2 rounded-lg"
        style={{
          width: s.size,
          height: s.size,
          borderColor: "rgba(201,79,0,0.2)",
          top: s.top,
          left: s.left,
          right: s.right,
        }}
        animate={{ 
          y: [0, -25, 0], 
          rotate: [s.rotate, s.rotate + 45, s.rotate],
          opacity: [0.15, 0.35, 0.15],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
      />
    ))}
    
    {/* Floating particles */}
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={`particle-${i}`}
        className="absolute rounded-full"
        style={{
          width: Math.random() * 6 + 3,
          height: Math.random() * 6 + 3,
          backgroundColor: `rgba(201,79,0,${Math.random() * 0.2 + 0.1})`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, Math.random() * 20 - 10, 0],
          opacity: [0.1, 0.4, 0.1],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: Math.random() * 8 + 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 5,
        }}
      />
    ))}
  </div>
);

/* ── exam banner ── */
function ExamBanner() {
  const images = [examImage, examImage2, examImage3];
  const [cur, setCur] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCur(p => (p + 1) % images.length), 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative overflow-hidden mt-14">
      {images.map((img, i) => (
        <img 
          key={i} 
          src={img} 
          alt={`Banner ${i + 1}`}
          loading={i === 0 ? "eager" : "lazy"}
          className={`w-full h-auto block transition-opacity duration-900 ${
            i === cur ? "relative opacity-100" : "absolute inset-0 opacity-0"
          }`}
          style={{ transition: "opacity 0.9s ease" }}
        />
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCur(i)} 
            aria-label={`Slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === cur ? "w-6 bg-orange-600" : "w-2 bg-white/55"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

/* ── data ── */
const services = [
  { icon: GraduationCap, title: "Study Abroad Counseling",        desc: "Personalised guidance matching the right country, university and program with your career goals." },
  { icon: FileText,      title: "University Application Support", desc: "End-to-end help with applications, SOPs, recommendation letters and document preparation." },
  { icon: Shield,        title: "Visa Guidance",                  desc: "Expert visa counseling, document checklists, mock interviews and application tracking." },
  { icon: BookOpen,      title: "IELTS Coaching",                 desc: "Comprehensive training with practice tests, band-score strategies and experienced faculty." },
  { icon: Pencil,        title: "PTE & OET Coaching",             desc: "Focused coaching with real test simulations and personalised feedback sessions." },
  { icon: Globe,         title: "German Language Classes",        desc: "Structured courses from A1 to B2 — ideal for students aiming to study in Germany." },
];

const countries = [
  { flag: "🇮🇪", name: "Ireland" },
  { flag: "🇬🇧", name: "UK" },
  { flag: "🇨🇦", name: "Canada" },
  { flag: "🇦🇺", name: "Australia" },
  { flag: "🇳🇿", name: "New Zealand" },
  { flag: "🇩🇪", name: "Germany" },
];

const stats = [
  { icon: Users,       value: 500, suffix: "+", label: "Students Placed" },
  { icon: Award,       value: 10,  suffix: "+", label: "Years Experience" },
  { icon: MapPin,      value: 6,   suffix: "",  label: "Countries Covered" },
  { icon: CheckCircle, value: 98,  suffix: "%", label: "Visa Success Rate" },
];

/* ── social icons as inline SVG paths ── */
const InstagramSVG = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const LinkedInSVG = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const FacebookSVG = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const socials = [
  {
    label: "Instagram",
    handle: "@ecoverseas",
    href: "https://www.instagram.com/ec_overseas/",
    Icon: InstagramSVG,
    gradient: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
  },
  {
    label: "LinkedIn",
    handle: "Ebez B Punnoose",
    href: "https://www.linkedin.com/in/ebez-b-punnoose-434910395/",
    Icon: LinkedInSVG,
    gradient: "linear-gradient(135deg, #0077b5, #00a0dc)",
  },
  {
    label: "Facebook",
    handle: "EC Overseas",
    href: "https://facebook.com/ecoverseastdpa/",
    Icon: FacebookSVG,
    gradient: "linear-gradient(135deg, #1877f2, #42a5f5)",
  },
];

/* ════════════════════════════════
   Main Component with Tailwind CSS
════════════════════════════════ */
const AboutUs = () => (
  <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">

    {/* ── EXAM BANNER ── */}
    <ExamBanner />

    {/* ── HERO ── */}
    <section className="relative z-10 bg-white py-20 px-6 text-center overflow-hidden">
      <AnimatedBg />

      <Fade>
        <div className="relative z-10 max-w-4xl mx-auto">

          {/* pill badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-orange-50/10 border border-orange-200/20 rounded-full px-5 py-1.5 mb-6"
            animate={{ boxShadow: ["0 0 0px rgba(201,79,0,0)", "0 0 18px rgba(201,79,0,0.15)", "0 0 0px rgba(201,79,0,0)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs text-orange-600 tracking-wider font-bold uppercase">
              Educational Consultant · Thodupuzha, South India
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 leading-tight mb-5 tracking-tight">
            Who We Are
          </h1>

          {/* animated gold underline */}
          <div className="flex justify-center mb-5">
            <motion.div
              className="h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full bg-[length:200%_100%]"
              initial={{ width: 0 }}
              whileInView={{ width: 56 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              animate={{ backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }}
            />
          </div>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6 max-w-2xl mx-auto text-justify">
            EC Overseas is your trusted educational consultant dedicated to helping students
            achieve their dreams of studying abroad. As the leading study abroad consultant
            in Thodupuzha, we provide end-to-end support — from university selection to visa
            counseling and pre-departure briefings — for Ireland, UK, Canada, Australia,
            New Zealand and Germany.
          </p>

          {/* service tags */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-6">
            {["IELTS", "PTE", "OET", "German Language", "Spoken English"].map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.05, borderColor: "#c94f00" }}
                className="bg-white border-2 border-gray-200 text-orange-600 rounded-full px-5 py-1.5 text-xs font-semibold shadow-sm cursor-default transition-all"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* country flags */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-8">
            {countries.map((c, i) => (
              <motion.span
                key={c.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -3, boxShadow: "0 6px 20px rgba(0,0,0,0.1)" }}
                className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2 text-sm font-medium text-gray-800 shadow-sm cursor-default"
              >
                <span className="text-lg">{c.flag}</span> {c.name}
              </motion.span>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href="/contact"
            whileHover={{ y: -3, boxShadow: "0 14px 36px rgba(201,79,0,0.45)" }}
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-full px-10 py-4 font-extrabold text-base no-underline shadow-lg transition-all"
          >
            Become a Student <ArrowRight size={18} />
          </motion.a>
        </div>
      </Fade>
    </section>

    {/* ── SERVICES ── */}
    <section className="relative z-10 py-20 px-6 bg-gray-50 overflow-hidden">
      <AnimatedBg />
      <div className="max-w-6xl mx-auto relative z-10">
        <Fade>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2.5 mb-3">
              <div className="w-7 h-0.5 bg-amber-500" />
              <span className="text-xs font-bold tracking-wider text-amber-500 uppercase">
                What We Offer
              </span>
              <div className="w-7 h-0.5 bg-amber-500" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
              Our Services
            </h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              Everything you need — under one roof — to make your study abroad journey smooth and successful.
            </p>
          </div>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <Fade key={s.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(201,79,0,0.12)" }}
                className="bg-white border border-gray-200 rounded-2xl p-6 flex gap-5 items-start cursor-default transition-all"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className="w-12 h-12 rounded-xl flex-shrink-0 bg-gradient-to-br from-orange-600 to-orange-500 flex items-center justify-center shadow-md"
                >
                  <s.icon size={22} color="white" />
                </motion.div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1.5 leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed m-0">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            </Fade>
          ))}
        </div>
      </div>
    </section>

    {/* ── FOUNDER ── */}
    <section className="relative z-10 py-20 px-6 bg-white overflow-hidden">
      <AnimatedBg />
      <div className="max-w-5xl mx-auto relative z-10">
        <Fade>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2.5 mb-3">
              <div className="w-7 h-0.5 bg-amber-500" />
              <span className="text-xs font-bold tracking-wider text-amber-500 uppercase">
                A Word from the Top
              </span>
              <div className="w-7 h-0.5 bg-amber-500" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Message from Our Founder
            </h2>
          </div>
        </Fade>

        <Fade delay={0.1}>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 shadow-md">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              {/* portrait */}
              <div className="flex flex-col items-center w-full max-w-xs">
                <motion.div
                  animate={{ boxShadow: [
                    "0 0 0 4px rgba(201,79,0,0.1), 0 8px 32px rgba(201,79,0,0.15)",
                    "0 0 0 8px rgba(201,79,0,0.05), 0 8px 32px rgba(201,79,0,0.2)",
                    "0 0 0 4px rgba(201,79,0,0.1), 0 8px 32px rgba(201,79,0,0.15)",
                  ]}}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full aspect-[5/7] rounded-xl overflow-hidden border-4 border-orange-100"
                >
                  <img
                    src={founder}
                    alt="Mr. Ebez B Punnoose — Founder of EC Overseas"
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>

                <p className="font-extrabold text-gray-900 text-base mt-4 mb-1 text-center">
                  Mr. Ebez B Punnoose
                </p>
                <p className="text-xs text-gray-600 text-center mb-5 leading-relaxed">
                  Founder & Chief Executive Officer<br />EC Overseas
                </p>

                {/* social cards */}
                <div className="flex gap-2 mt-2">
                  {socials.map((s) => (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={s.label}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm"
                      style={{ background: s.gradient }}
                    >
                      <s.Icon />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* quote column */}
              <div className="flex-1 min-w-0 w-full">
                <div className="text-7xl leading-none font-black text-orange-100 mb-5 select-none font-serif">
                  "
                </div>

                <blockquote className="italic text-base sm:text-lg text-gray-900 leading-relaxed mb-5 pl-4 border-l-4 border-orange-600 m-0 text-justify">
                  At the heart of every successful venture lies a simple belief — that meaningful
                  impact begins with understanding people. My journey over the past decade has been
                  shaped by this very principle.
                </blockquote>

                <p className="text-sm text-gray-600 leading-relaxed mb-3 text-justify">
                  Three years ago, I took a step forward to turn this experience into purpose by
                  founding EC Overseas. What started as a vision to simplify global education has now
                  evolved into a platform that empowers students to pursue international opportunities
                  with clarity and confidence.Entrepreneurship, to me, is not just about building a business — it's about creating
                  value, solving real problems, and continuously evolving with purpose. The journey has
                  been challenging, but it has also been deeply rewarding.
                </p>

                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  
                </p>

                <div className="flex items-center gap-3.5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 50 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="h-0.5 bg-gradient-to-r from-orange-600 to-amber-500 rounded-full"
                  />
                  <span className="text-xs font-extrabold text-orange-600 tracking-wide">
                    EC OVERSEAS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </section>

    {/* ── ACHIEVEMENTS ── */}
    <section className="relative z-10 py-20 px-6 overflow-hidden">
      {/* animated gradient background */}
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-br from-orange-900 via-orange-700 to-orange-500"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* moving light sweep */}
      <motion.div
        className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
      />
      {/* dot grid overlay */}
      <div className="absolute inset-0 z-10"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-20">
        <Fade>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2.5 mb-3">
              <div className="w-7 h-0.5 bg-amber-500" />
              <span className="text-xs font-bold tracking-wider text-amber-500 uppercase">
                By the Numbers
              </span>
              <div className="w-7 h-0.5 bg-amber-500" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Our Achievements
            </h2>
          </div>
        </Fade>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <Fade key={s.label} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, backgroundColor: "rgba(255,255,255,0.18)" }}
                className="bg-white/10 border border-white/20 rounded-2xl py-8 px-5 text-center transition-all"
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mx-auto mb-4 border border-amber-500/30"
                >
                  <s.icon size={22} color="#f5a623" />
                </motion.div>
                <p className="text-4xl sm:text-5xl font-black text-white mb-1.5 leading-none">
                  <Counter target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-xs font-medium text-white/70 m-0">
                  {s.label}
                </p>
              </motion.div>
            </Fade>
          ))}
        </div>
      </div>
    </section>

    {/* ── CONTACT CTA ── */}
    <section className="relative z-10 py-20 px-6 bg-white text-center overflow-hidden">
      <AnimatedBg />
      <Fade>
        <div className="max-w-2xl mx-auto relative z-10">
          <motion.span
            className="inline-block text-[11px] font-bold tracking-wider text-amber-500 uppercase mb-4"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            Ready to Begin?
          </motion.span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            Your future starts with one conversation
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            Walk into our Thodupuzha office or reach out online — our counsellors are available
            six days a week and there's no appointment needed.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { icon: Mail,   text: "offer.tdpa@gmail.com", href: "mailto:offer.tdpa@gmail.com", external: false },
              { icon: Phone,  text: "+91 97785 58140",       href: "tel:+919778558140",           external: false },
              { icon: MapPin, text: "Thodupuzha, Kerala",    href: "https://maps.app.goo.gl/3K2yygR7kKj79ta77", external: true },
            ].map(item => (
              <motion.a
                key={item.text}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel="noopener noreferrer"
                whileHover={{ y: -3, borderColor: "#c94f00", backgroundColor: "#fff4ee" }}
                className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-5 py-2.5 text-sm font-semibold text-gray-800 no-underline transition-all"
              >
                <item.icon size={15} color="#c94f00" />
                {item.text}
              </motion.a>
            ))}
          </div>

          <motion.a
            href="/contact"
            whileHover={{ y: -3, boxShadow: "0 14px 36px rgba(201,79,0,0.45)" }}
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-full px-10 py-4 font-extrabold text-base no-underline shadow-lg transition-all"
          >
            Book a Free Consultation <ArrowRight size={18} />
          </motion.a>
        </div>
      </Fade>
    </section>


    {/* ── FOOTER ── */}
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

  </div>
);

export default AboutUs;