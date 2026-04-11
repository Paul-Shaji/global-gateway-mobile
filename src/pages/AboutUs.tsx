import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap, FileText, Shield, BookOpen, Pencil, Globe,
  Instagram, Linkedin, Facebook, MessageCircle, ArrowRight,
  MapPin, Award, Users, CheckCircle, Mail, Phone,
} from "lucide-react";

import examImage  from "@/assets/WEBSITE WEBSITE 1496x538 01.jpg.jpeg";
import examImage2 from "@/assets/WEBSITE WEBSITE 1496x538 02.jpg.jpeg";
import examImage3 from "@/assets/WEBSITE WEBSITE 1496x538.jpg.jpeg";
import founder    from "@/assets/20240921_163629.jpg (1).jpeg";

/* ── design tokens ── */
const T = {
  primary:   "#c94f00",
  dark:      "#8f3200",
  mid:       "#e85d00",
  light:     "#fff4ee",
  lightMid:  "#ffe0cc",
  gold:      "#f5a623",
  white:     "#ffffff",
  cardBg:    "#fffaf7",
  text:      "#2a1200",
  muted:     "#7a4a2a",
  border:    "#f0c9a8",
  heroBg1:   "#7a2800",
  heroBg2:   "#c94f00",
};

/* ══════════════════════════════════════
   Animated Counter
══════════════════════════════════════ */
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

/* ══════════════════════════════════════
   Floating Background Orbs
══════════════════════════════════════ */
const Background = () => (
  <div style={{ pointerEvents: "none", position: "fixed", inset: 0, zIndex: 0, overflow: "hidden" }}>
    {[
      { w: 460, l: "-4%",  t: "3%",   d: 20 },
      { w: 320, l: "70%",  t: "6%",   d: 24 },
      { w: 540, l: "28%",  t: "48%",  d: 28 },
      { w: 280, l: "78%",  t: "62%",  d: 18 },
      { w: 200, l: "10%",  t: "80%",  d: 16 },
    ].map((o, i) => (
      <div key={i} style={{
        position:     "absolute",
        width:        o.w,
        height:       o.w,
        borderRadius: "50%",
        background:   T.primary,
        opacity:      0.04,
        left:         o.l,
        top:          o.t,
        animation:    `eco-orb ${o.d}s ease-in-out infinite alternate`,
        animationDelay: `${i * 1.6}s`,
      }} />
    ))}
    <style>{`
      @keyframes eco-orb {
        0%   { transform: translate(0,0) scale(1); }
        50%  { transform: translate(10px,-18px) scale(1.03); }
        100% { transform: translate(-8px,-26px) scale(1.05); }
      }
    `}</style>
  </div>
);

/* ══════════════════════════════════════
   Fade-in wrapper
══════════════════════════════════════ */
const Fade = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.65, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
);

/* ══════════════════════════════════════
   Section Heading
══════════════════════════════════════ */
const SectionHeading = ({ title, sub }: { title: string; sub: string }) => (
  <div style={{ textAlign: "center", marginBottom: "3rem" }}>
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: "0.6rem" }}>
      <div style={{ width: 30, height: 2, background: T.gold, borderRadius: 0 }} />
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: T.gold, textTransform: "uppercase" }}>
        {sub}
      </span>
      <div style={{ width: 30, height: 2, background: T.gold, borderRadius: 0 }} />
    </div>
    <h2 style={{
      fontSize: "clamp(1.65rem, 3vw, 2.25rem)", fontWeight: 800,
      color: T.dark, lineHeight: 1.2, margin: 0,
    }}>
      {title}
    </h2>
  </div>
);

/* ══════════════════════════════════════
   Data
══════════════════════════════════════ */
const services = [
  { icon: GraduationCap, title: "Study Abroad Counseling",        desc: "Personalised guidance to match the right country, university and program with your career goals." },
  { icon: FileText,      title: "University Application Support", desc: "End-to-end assistance with applications, SOPs, recommendation letters and document preparation." },
  { icon: Shield,        title: "Visa Guidance",                  desc: "Expert visa counseling, document checklists, mock interviews and application tracking." },
  { icon: BookOpen,      title: "IELTS Coaching",                 desc: "Comprehensive training with experienced faculty, practice tests and band-score strategies." },
  { icon: Pencil,        title: "PTE & OET Coaching",             desc: "Focused coaching with real test simulations and personalised feedback sessions." },
  { icon: Globe,         title: "German Language Classes",        desc: "Structured German courses from A1 to B2 — ideal for students aiming to study in Germany." },
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

const socials = [
  { icon: Instagram,     label: "@ecoverseas",    href: "https://www.instagram.com/ec_overseas/", color: "#c13584" },
  { icon: Linkedin,      label: "Ebez B Punnoose",     href: "https://www.linkedin.com/in/ebez-b-punnoose-434910395/", color: "#0077b5" },

];

/* ══════════════════════════════════════
   Exam Banner Slider
══════════════════════════════════════ */
function ExamBanner() {
  const images = [examImage, examImage2, examImage3];
  const [cur, setCur] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCur(p => (p + 1) % images.length), 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <section style={{ overflow: "hidden", position: "relative" }}>
      {images.map((img, i) => (
        <img key={i} src={img} alt={`Banner ${i + 1}`} style={{
          width: "100%", height: "auto", display: "block",
          position: i === 0 ? "relative" : "absolute",
          inset: 0, opacity: i === cur ? 1 : 0,
          transition: "opacity 0.8s ease",
        }} />
      ))}
      <div style={{
        position: "absolute", bottom: 14, left: "50%",
        transform: "translateX(-50%)",
        display: "flex", gap: 7,
      }}>
        {images.map((_, i) => (
          <button key={i} onClick={() => setCur(i)} style={{
            width: i === cur ? 22 : 8, height: 8,
            borderRadius: 4, border: "none", cursor: "pointer",
            background: i === cur ? T.primary : "rgba(255,255,255,0.6)",
            transition: "width 0.3s, background 0.3s",
            padding: 0,
          }} />
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   Main Component
══════════════════════════════════════ */
const AboutUs = () => (
  <div style={{
    minHeight: "100vh",
    background: T.white,
    color: T.text,
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    overflowX: "hidden",
  }}>
    <Background />

    {/* ════════════════ EXAM BANNER ════════════════ */}
<div style={{ position: "relative", zIndex: 1, marginTop: "4rem" }}>
  <ExamBanner />
</div>

    {/* ════════════════ HERO ════════════════ */}
   {/* ════════════════ HERO ════════════════ */}
      <section style={{
        position: "relative", zIndex: 1,
        background: "transparent",
        padding: "5.5rem 1.5rem 5rem",
        textAlign: "center",
        overflow: "hidden",
      }}>
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />
      <div style={{
        position: "absolute", width: 600, height: 600,
        borderRadius: "50%", background: "rgba(255,200,100,0.07)",
        top: "-200px", left: "50%", transform: "translateX(-50%)",
        zIndex: 0,
      }} />

      <Fade>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: 40, padding: "6px 20px",
            marginBottom: "1.6rem",
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: T.gold, display: "inline-block", flexShrink: 0,
            }} />
            <span style={{
              fontSize: 12, color: T.dark,
              letterSpacing: "0.14em", fontWeight: 600, textTransform: "uppercase",
            }}>
              Educational Consultant · Thodupuzha, South India
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(2.6rem, 6.5vw, 4.2rem)",
            fontWeight: 900, color: T.dark,
            lineHeight: 1.1, margin: "0 0 1rem",
            letterSpacing: "-0.025em",
          }}>
            Who We Are
          </h1>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
            <div style={{ width: 64, height: 4, background: T.gold, borderRadius: 2 }} />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginBottom: "1.4rem" }}>
            {["IELTS", "PTE", "OET", "GERMAN", "Spoken English"].map(tag => (
              <span key={tag} style={{
                background: "rgba(255,255,255,0.13)",
                border: "1px solid rgba(255,255,255,0.28)",
                color: T.white, borderRadius: 40,
                padding: "5px 18px", fontSize: 13, fontWeight: 600,
              }}>
                {tag}
              </span>
            ))}
          </div>

          <p style={{ fontSize: 17, color: T.gold, fontWeight: 700, marginBottom: "1.2rem", letterSpacing: "0.01em" }}>
            Best Study Abroad Consultant in South India
          </p>

          <p style={{
            fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)",
            color: T.muted, lineHeight: 1.85,
            marginBottom: "2.2rem", maxWidth: 700,
            marginLeft: "auto", marginRight: "auto",
          }}>
            EC Overseas is your trusted educational consultant dedicated to helping students achieve their
            dreams of studying abroad. As the best study abroad consultant in Thodupuzha, we specialise in
            tailored guidance for Ireland, UK, Canada, Australia, New Zealand and Germany — providing
            end-to-end support from university selection to visa counseling and pre-departure briefings.
            We also offer top-notch coaching for IELTS, PTE, OET, German and Spoken English.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginBottom: "2.5rem" }}>
            {countries.map(c => (
              <span key={c.name} style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: "rgba(255,255,255,0.11)",
                border: "1px solid rgba(255,255,255,0.22)",
                borderRadius: 40, padding: "7px 18px",
                fontSize: 14, color: T.white, fontWeight: 500,
              }}>
                <span style={{ fontSize: 18 }}>{c.flag}</span> {c.name}
              </span>
            ))}
          </div>

          <a href="/contact" style={{
            display: "inline-flex", alignItems: "center", gap: 9,
            background: T.gold, color: "#2a1200",
            borderRadius: 50, padding: "15px 38px",
            fontWeight: 800, fontSize: 16, textDecoration: "none",
            letterSpacing: "0.02em",
            boxShadow: "0 6px 24px rgba(245,166,35,0.45)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => {
              const a = e.currentTarget as HTMLAnchorElement;
              a.style.transform = "translateY(-3px) scale(1.03)";
              a.style.boxShadow = "0 10px 30px rgba(245,166,35,0.5)";
            }}
            onMouseLeave={e => {
              const a = e.currentTarget as HTMLAnchorElement;
              a.style.transform = "none";
              a.style.boxShadow = "0 6px 24px rgba(245,166,35,0.45)";
            }}
          >
            Become a Student <ArrowRight size={18} />
          </a>
        </div>
      </Fade>
    </section>

    

    {/* ════════════════ FOUNDER ════════════════ */}
    <section style={{ position: "relative", zIndex: 1, padding: "5.5rem 1.5rem", background: T.white }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>
        <Fade>
          <SectionHeading title="Message from Our Founder" sub="A Word from the Top" />
        </Fade>
        <Fade delay={0.1}>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 48,
            alignItems: "flex-start",
            background: T.cardBg,
            border: `1px solid ${T.border}`,
            borderRadius: 22,
            padding: "clamp(1.5rem, 4vw, 3rem)",
            overflow: "hidden",
          }}>

            {/* portrait column */}
            <div style={{
              display: "flex", flexDirection: "column",
              alignItems: "center",
              flexShrink: 0,
              width: "clamp(200px, 22vw, 260px)",
            }}>
              {/* tall portrait frame */}
              <div style={{
                
              }}>
                <img
                  src={founder}
                  alt="Founder of EC Overseas"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                />
              </div>

              <p style={{ fontWeight: 800, color: T.dark, fontSize: 17, marginTop: "1.1rem", marginBottom: 3, textAlign: "center" }}>
                Mr. Ebez B Punnoose

              </p>
              <p style={{ fontSize: 12, color: T.muted, textAlign: "center", marginBottom: "1.2rem", lineHeight: 1.5 }}>
                Founder & Chief Educational Consultant<br />EC Overseas
              </p>

              {/* social pills */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
                {socials.map(s => (
                  <a key={s.label} href={s.href} style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: T.white,
                    border: `1px solid ${T.border}`,
                    borderRadius: 40, padding: "7px 14px",
                    fontSize: 12, fontWeight: 600, color: T.dark,
                    textDecoration: "none",
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                    onMouseEnter={e => {
                      const a = e.currentTarget as HTMLAnchorElement;
                      a.style.background = T.light;
                      a.style.borderColor = T.primary;
                    }}
                    onMouseLeave={e => {
                      const a = e.currentTarget as HTMLAnchorElement;
                      a.style.background = T.white;
                      a.style.borderColor = T.border;
                    }}
                  >
                    <s.icon size={13} color={s.color} />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* message column */}
            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{
                fontSize: 100, lineHeight: 0.75, fontWeight: 900,
                color: T.lightMid, marginBottom: "1.2rem",
                userSelect: "none", fontFamily: "Georgia, serif",
              }}>
                "
              </div>

              <blockquote style={{
                fontStyle: "italic",
                fontSize: "clamp(1rem, 1.9vw, 1.15rem)",
                color: T.dark, lineHeight: 1.85,
                marginBottom: "1.6rem",
                paddingLeft: "1.2rem",
                borderLeft: `4px solid ${T.primary}`,
                borderRadius: 0,
              }}>
               At the heart of every successful venture lies a simple belief — that meaningful impact begins with understanding people. My journey over the past decade has been shaped by this very principle.
              </blockquote>

              <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.85, marginBottom: "1.1rem" }}>
              Three years ago, I took a step forward to turn this experience into purpose by founding EC Overseas. What started as a vision to simplify global education has now evolved into a platform that empowers students to pursue international opportunities with clarity and confidence.
              </p>

              <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.85, marginBottom: "1.8rem" }}>
              As an educational consultant, I believe our role goes beyond process facilitation. We are mentors, advisors, and sometimes the first point of reassurance for students stepping into unfamiliar territory. Every success story we help create reinforces our commitment to excellence and integrity.

              
                </p>

                <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.85, marginBottom: "1.8rem" }}>
                 Entrepreneurship, to me, is not just about building a business — it’s about creating value, solving real problems, and continuously evolving with purpose. The journey has been challenging, but it has also been deeply rewarding.
               </p>

              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 50, height: 2, background: T.primary, borderRadius: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: T.primary, letterSpacing: "0.06em" }}>
                  EC OVERSEAS
                </span>
              </div>
            </div>

          </div>
        </Fade>
      </div>
    </section>

    {/* ════════════════ ACHIEVEMENTS ════════════════ */}
    <section style={{
      position: "relative", zIndex: 1,
      padding: "5.5rem 1.5rem",
      background: `linear-gradient(145deg, ${T.heroBg1} 0%, ${T.primary} 55%, #e06010 100%)`,
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
      }} />
      <div style={{
        position: "absolute", width: 700, height: 400,
        borderRadius: "50%", background: "rgba(255,180,50,0.06)",
        bottom: "-150px", left: "50%", transform: "translateX(-50%)", zIndex: 0,
      }} />

      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Fade>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: "0.6rem" }}>
              <div style={{ width: 28, height: 2, background: T.gold, borderRadius: 0 }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: T.gold, textTransform: "uppercase" }}>
                By the Numbers
              </span>
              <div style={{ width: 28, height: 2, background: T.gold, borderRadius: 0 }} />
            </div>
            <h2 style={{
              fontSize: "clamp(1.65rem, 3vw, 2.25rem)",
              fontWeight: 800, color: T.white, margin: 0,
            }}>
              Our Achievements
            </h2>
          </div>
        </Fade>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: 20,
        }}>
          {stats.map((s, i) => (
            <Fade key={s.label} delay={i * 0.1}>
              <div style={{
                background: "rgba(255,255,255,0.09)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 18, padding: "2rem 1.5rem",
                textAlign: "center",
                transition: "background 0.2s, transform 0.2s",
              }}
                onMouseEnter={e => {
                  const d = e.currentTarget as HTMLDivElement;
                  d.style.background = "rgba(255,255,255,0.16)";
                  d.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  const d = e.currentTarget as HTMLDivElement;
                  d.style.background = "rgba(255,255,255,0.09)";
                  d.style.transform = "none";
                }}
              >
                <div style={{
                  width: 46, height: 46, borderRadius: 13,
                  background: "rgba(245,166,35,0.18)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1rem",
                }}>
                  <s.icon size={20} color={T.gold} />
                </div>
                <p style={{
                  fontSize: "clamp(2rem, 4vw, 2.8rem)",
                  fontWeight: 900, color: T.white,
                  margin: "0 0 5px", lineHeight: 1,
                }}>
                  <Counter target={s.value} suffix={s.suffix} />
                </p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.72)", fontWeight: 500, margin: 0 }}>
                  {s.label}
                </p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
    

     {/* Footer */}
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
                <a href="https://maps.app.goo.gl/3K2yygR7kKj79ta77" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  <span>EC Overseas</span>
                </a>
              </li>
              <li>
                <a href="mailto:your@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="h-4 w-4 shrink-0 text-accent" />
                  <span>offer.tdpa@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="h-4 w-4 shrink-0 text-accent" />
                  <span>+19 9778358140 </span>
                </a>
              </li>
            </ul>
            {/* Social Media */}
            <div className="flex items-center gap-3 pt-1">
              {[
                { href: "https://instagram.com/ec_overseas/", label: "Instagram", svg: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg> },
                { href: "https://linkedin.com/in/ebez-b-punnoose-434910395/", label: "LinkedIn", svg: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                // { href: "https://youtube.com/@YOUR_HANDLE", label: "YouTube", svg: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
                
                { href: "https://facebook.com/ecoverseastdpa/", label: "Facebook", svg: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors">
                  {s.svg}
                </a>
              ))}
            </div>
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
    

    <div style={{ height: 72 }} />
  </div>

  
);



export default AboutUs;