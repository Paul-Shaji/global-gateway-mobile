import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap, FileText, Shield, BookOpen, Pencil, Globe,
  Instagram, Linkedin, Facebook, MessageCircle, ArrowRight,
  MapPin, Award, Users, CheckCircle,
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
    <div style={{ position: "relative", zIndex: 1 }}>
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

    <div style={{ height: 72 }} />
  </div>
);

export default AboutUs;