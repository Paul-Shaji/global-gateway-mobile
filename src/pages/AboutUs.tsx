import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap, FileText, Shield, BookOpen, Pencil, Globe,
  Instagram, Linkedin, Facebook, ArrowRight,
  MapPin, Award, Users, CheckCircle, Mail, Phone,
} from "lucide-react";

import examImage  from "@/assets/WEBSITE WEBSITE 1496x538 01.jpg.jpeg";
import examImage2 from "@/assets/WEBSITE WEBSITE 1496x538 02.jpg.jpeg";
import examImage3 from "@/assets/WEBSITE WEBSITE 1496x538.jpg.jpeg";
import founder    from "@/assets/founder.jpeg";

/* ── tokens ── */
const T = {
  primary:  "#c94f00",
  dark:     "#8f3200",
  mid:      "#e85d00",
  light:    "#fff4ee",
  lightMid: "#ffe0cc",
  gold:     "#f5a623",
  white:    "#ffffff",
  cardBg:   "#fffaf7",
  text:     "#1a0a00",
  muted:    "#6b4226",
  border:   "#f0c9a8",
};

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

/* ── exam banner ── */
function ExamBanner() {
  const images = [examImage, examImage2, examImage3];
  const [cur, setCur] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCur(p => (p + 1) % images.length), 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <section style={{ overflow: "hidden", position: "relative", marginTop: "3.5rem" }}>
      {images.map((img, i) => (
        <img key={i} src={img} alt={`Banner ${i + 1}`}
          loading={i === 0 ? "eager" : "lazy"}
          style={{
            width: "100%", height: "auto", display: "block",
            position: i === 0 ? "relative" : "absolute",
            inset: 0, opacity: i === cur ? 1 : 0,
            transition: "opacity 0.9s ease",
          }}
        />
      ))}
      <div style={{
        position: "absolute", bottom: 16, left: "50%",
        transform: "translateX(-50%)", display: "flex", gap: 8,
      }}>
        {images.map((_, i) => (
          <button key={i} onClick={() => setCur(i)} aria-label={`Slide ${i + 1}`} style={{
            width: i === cur ? 24 : 8, height: 8,
            borderRadius: 4, border: "none", cursor: "pointer",
            background: i === cur ? T.primary : "rgba(255,255,255,0.55)",
            transition: "width 0.3s, background 0.3s", padding: 0,
          }} />
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

const socials = [
  { icon: Instagram, label: "@ecoverseas",      href: "https://www.instagram.com/ec_overseas/",                    color: "#c13584" },
  { icon: Linkedin,  label: "Ebez B Punnoose",  href: "https://www.linkedin.com/in/ebez-b-punnoose-434910395/",   color: "#0077b5" },
  { icon: Facebook,  label: "EC Overseas",      href: "https://facebook.com/ecoverseastdpa/",                     color: "#1877f2" },
];

/* ════════════════════════════════
   Main
════════════════════════════════ */
const AboutUs = () => (
  <div style={{
    minHeight: "100vh", background: T.white,
    color: T.text, fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
    overflowX: "hidden",
  }}>

    {/* ── EXAM BANNER ── */}
    <ExamBanner />

    {/* ── HERO ── */}
    <section style={{
      position: "relative", zIndex: 1,
      background: T.white,
      padding: "5rem 1.5rem 4.5rem",
      textAlign: "center",
      overflow: "hidden",
    }}>
      {/* subtle grid */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "radial-gradient(circle, rgba(201,79,0,0.07) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      <Fade>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto" }}>

          {/* pill badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(201,79,0,0.08)",
            border: `1px solid rgba(201,79,0,0.2)`,
            borderRadius: 40, padding: "6px 20px",
            marginBottom: "1.8rem",
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: T.gold, display: "inline-block", flexShrink: 0,
            }} />
            <span style={{
              fontSize: 12, color: T.primary,
              letterSpacing: "0.14em", fontWeight: 700, textTransform: "uppercase",
            }}>
              Educational Consultant · Thodupuzha, South India
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(2.8rem, 7vw, 4.5rem)",
            fontWeight: 900, color: T.text,
            lineHeight: 1.08, margin: "0 0 1.2rem",
            letterSpacing: "-0.03em",
          }}>
            Who We Are
          </h1>

          {/* gold underline */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.6rem" }}>
            <div style={{ width: 56, height: 4, background: T.gold, borderRadius: 2 }} />
          </div>

          <p style={{
            fontSize: "clamp(0.95rem, 1.8vw, 1.08rem)",
            color: T.muted, lineHeight: 1.9,
            marginBottom: "2rem", maxWidth: 680,
            marginLeft: "auto", marginRight: "auto",
          }}>
            EC Overseas is your trusted educational consultant dedicated to helping students
            achieve their dreams of studying abroad. As the leading study abroad consultant
            in Thodupuzha, we provide end-to-end support — from university selection to visa
            counseling and pre-departure briefings — for Ireland, UK, Canada, Australia,
            New Zealand and Germany.
          </p>

          {/* service tags */}
          <div style={{
            display: "flex", flexWrap: "wrap",
            justifyContent: "center", gap: 10, marginBottom: "2rem",
          }}>
            {["IELTS", "PTE", "OET", "German Language", "Spoken English"].map(tag => (
              <span key={tag} style={{
                background: T.white,
                border: `1.5px solid ${T.border}`,
                color: T.primary, borderRadius: 40,
                padding: "6px 18px", fontSize: 13, fontWeight: 600,
                boxShadow: "0 2px 8px rgba(201,79,0,0.07)",
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* country flags */}
          <div style={{
            display: "flex", flexWrap: "wrap",
            justifyContent: "center", gap: 10, marginBottom: "2.8rem",
          }}>
            {countries.map(c => (
              <span key={c.name} style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: T.white,
                border: `1px solid ${T.border}`,
                borderRadius: 40, padding: "7px 18px",
                fontSize: 14, color: T.text, fontWeight: 500,
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}>
                <span style={{ fontSize: 18 }}>{c.flag}</span> {c.name}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a href="/contact" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: T.primary, color: T.white,
            borderRadius: 50, padding: "15px 40px",
            fontWeight: 800, fontSize: 16, textDecoration: "none",
            letterSpacing: "0.02em",
            boxShadow: `0 8px 28px rgba(201,79,0,0.35)`,
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 14px 36px rgba(201,79,0,0.45)`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "none";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 8px 28px rgba(201,79,0,0.35)`;
            }}
          >
            Become a Student <ArrowRight size={18} />
          </a>
        </div>
      </Fade>
    </section>

    {/* ── SERVICES ── */}
    <section style={{
      position: "relative", zIndex: 1,
      padding: "5.5rem 1.5rem",
      background: T.white,
    }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <Fade>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10, marginBottom: "0.7rem",
            }}>
              <div style={{ width: 28, height: 2, background: T.gold }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: T.gold, textTransform: "uppercase" }}>
                What We Offer
              </span>
              <div style={{ width: 28, height: 2, background: T.gold }} />
            </div>
            <h2 style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
              fontWeight: 800, color: T.text,
              lineHeight: 1.2, margin: "0 0 0.8rem",
            }}>
              Our Services
            </h2>
            <p style={{ fontSize: 15, color: T.muted, maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
              Everything you need — under one roof — to make your study abroad journey smooth and successful.
            </p>
          </div>
        </Fade>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20,
        }}>
          {services.map((s, i) => (
            <Fade key={s.title} delay={i * 0.07}>
              <div style={{
                background: i % 2 === 0 ? T.cardBg : T.white,
                border: `1px solid ${T.border}`,
                borderRadius: 20, padding: "1.8rem",
                display: "flex", gap: 18, alignItems: "flex-start",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "default",
              }}
                onMouseEnter={e => {
                  const d = e.currentTarget as HTMLDivElement;
                  d.style.transform = "translateY(-4px)";
                  d.style.boxShadow = "0 12px 32px rgba(201,79,0,0.1)";
                }}
                onMouseLeave={e => {
                  const d = e.currentTarget as HTMLDivElement;
                  d.style.transform = "none";
                  d.style.boxShadow = "none";
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                  background: `linear-gradient(135deg, ${T.primary} 0%, ${T.mid} 100%)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 4px 14px rgba(201,79,0,0.25)`,
                }}>
                  <s.icon size={22} color={T.white} />
                </div>
                <div>
                  <h3 style={{
                    fontSize: 16, fontWeight: 700, color: T.text,
                    margin: "0 0 6px", lineHeight: 1.3,
                  }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.75, margin: 0 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>

    {/* ── FOUNDER ── */}
    <section style={{
      position: "relative", zIndex: 1,
      padding: "5.5rem 1.5rem",
      background: "#f9f9f9",
    }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>
        <Fade>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: "0.7rem" }}>
              <div style={{ width: 28, height: 2, background: T.gold }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: T.gold, textTransform: "uppercase" }}>
                A Word from the Top
              </span>
              <div style={{ width: 28, height: 2, background: T.gold }} />
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, color: T.text, margin: 0 }}>
              Message from Our Founder
            </h2>
          </div>
        </Fade>

        <Fade delay={0.1}>
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 48, alignItems: "flex-start",
            background: T.white,
            border: `1px solid ${T.border}`,
            borderRadius: 24,
            padding: "clamp(1.8rem, 5vw, 3.5rem)",
            boxShadow: "0 8px 40px rgba(201,79,0,0.06)",
          }}>

            {/* portrait column */}
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              flexShrink: 0, width: "clamp(180px, 20vw, 240px)",
            }}>
              {/* image frame */}
              <div style={{
                width: "100%",
                aspectRatio: "5/7",
                borderRadius: 18,
                overflow: "hidden",
                border: `3px solid ${T.lightMid}`,
                boxShadow: `0 8px 32px rgba(201,79,0,0.15)`,
              }}>
                <img
                  src={founder}
                  alt="Mr. Ebez B Punnoose — Founder of EC Overseas"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                />
              </div>

              <p style={{
                fontWeight: 800, color: T.text, fontSize: 16,
                marginTop: "1.1rem", marginBottom: 4, textAlign: "center",
              }}>
                Mr. Ebez B Punnoose
              </p>
              <p style={{
                fontSize: 12, color: T.muted, textAlign: "center",
                marginBottom: "1.2rem", lineHeight: 1.6,
              }}>
                Founder & Chief Educational Consultant<br />EC Overseas
              </p>

              {/* social pills */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
                {socials.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: T.cardBg, border: `1px solid ${T.border}`,
                    borderRadius: 40, padding: "7px 14px",
                    fontSize: 12, fontWeight: 600, color: T.text,
                    textDecoration: "none", transition: "background 0.2s, border-color 0.2s",
                  }}
                    onMouseEnter={e => {
                      const a = e.currentTarget as HTMLAnchorElement;
                      a.style.background = T.light;
                      a.style.borderColor = T.primary;
                    }}
                    onMouseLeave={e => {
                      const a = e.currentTarget as HTMLAnchorElement;
                      a.style.background = T.cardBg;
                      a.style.borderColor = T.border;
                    }}
                  >
                    <s.icon size={13} color={s.color} />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* quote column */}
            <div style={{ flex: 1, minWidth: 260 }}>
              {/* decorative quote mark */}
              <div style={{
                fontSize: 120, lineHeight: 0.8, fontWeight: 900,
                color: T.lightMid, marginBottom: "1.4rem",
                userSelect: "none", fontFamily: "Georgia, serif",
              }}>
                "
              </div>

              <blockquote style={{
                fontStyle: "italic",
                fontSize: "clamp(1rem, 2vw, 1.18rem)",
                color: T.text, lineHeight: 1.85,
                marginBottom: "1.6rem",
                paddingLeft: "1.2rem",
                borderLeft: `4px solid ${T.primary}`,
                margin: "0 0 1.6rem 0",
              }}>
                At the heart of every successful venture lies a simple belief — that meaningful
                impact begins with understanding people. My journey over the past decade has been
                shaped by this very principle.
              </blockquote>

              <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.9, marginBottom: "1.1rem" }}>
                Three years ago, I took a step forward to turn this experience into purpose by
                founding EC Overseas. What started as a vision to simplify global education has now
                evolved into a platform that empowers students to pursue international opportunities
                with clarity and confidence.
              </p>

              <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.9, marginBottom: "1.8rem" }}>
                Entrepreneurship, to me, is not just about building a business — it's about creating
                value, solving real problems, and continuously evolving with purpose. The journey has
                been challenging, but it has also been deeply rewarding.
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 50, height: 3, background: T.primary, borderRadius: 2 }} />
                <span style={{ fontSize: 13, fontWeight: 800, color: T.primary, letterSpacing: "0.08em" }}>
                  EC OVERSEAS
                </span>
              </div>
            </div>

          </div>
        </Fade>
      </div>
    </section>

    {/* ── ACHIEVEMENTS ── */}
    <section style={{
      position: "relative", zIndex: 1,
      padding: "5.5rem 1.5rem",
      background: `linear-gradient(145deg, #7a2800 0%, ${T.primary} 55%, #e06010 100%)`,
      overflow: "hidden",
    }}>
      {/* dot grid */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Fade>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: "0.7rem" }}>
              <div style={{ width: 28, height: 2, background: T.gold }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", color: T.gold, textTransform: "uppercase" }}>
                By the Numbers
              </span>
              <div style={{ width: 28, height: 2, background: T.gold }} />
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, color: T.white, margin: 0 }}>
              Our Achievements
            </h2>
          </div>
        </Fade>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 20,
        }}>
          {stats.map((s, i) => (
            <Fade key={s.label} delay={i * 0.1}>
              <div style={{
                background: "rgba(255,255,255,0.09)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 20, padding: "2.2rem 1.5rem",
                textAlign: "center",
                transition: "background 0.2s, transform 0.2s",
              }}
                onMouseEnter={e => {
                  const d = e.currentTarget as HTMLDivElement;
                  d.style.background = "rgba(255,255,255,0.18)";
                  d.style.transform = "translateY(-6px)";
                }}
                onMouseLeave={e => {
                  const d = e.currentTarget as HTMLDivElement;
                  d.style.background = "rgba(255,255,255,0.09)";
                  d.style.transform = "none";
                }}
              >
                <div style={{
                  width: 50, height: 50, borderRadius: 14,
                  background: "rgba(245,166,35,0.18)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1.1rem",
                }}>
                  <s.icon size={22} color={T.gold} />
                </div>
                <p style={{
                  fontSize: "clamp(2.2rem, 4.5vw, 3rem)",
                  fontWeight: 900, color: T.white,
                  margin: "0 0 6px", lineHeight: 1,
                }}>
                  <Counter target={s.value} suffix={s.suffix} />
                </p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 500, margin: 0 }}>
                  {s.label}
                </p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>

    {/* ── CONTACT CTA ── */}
    <section style={{
      position: "relative", zIndex: 1,
      padding: "5rem 1.5rem",
      background: T.white,
      textAlign: "center",
    }}>
      <Fade>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <span style={{
            display: "inline-block", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.18em", color: T.gold, textTransform: "uppercase",
            marginBottom: "1rem",
          }}>
            Ready to Begin?
          </span>
          <h2 style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
            fontWeight: 800, color: T.text,
            lineHeight: 1.2, margin: "0 0 1rem",
          }}>
            Your future starts with one conversation
          </h2>
          <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.8, marginBottom: "2rem" }}>
            Walk into our Thodupuzha office or reach out online — our counsellors are available
            six days a week and there's no appointment needed.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginBottom: "2.5rem" }}>
            {[
              { icon: Mail,  text: "offer.tdpa@gmail.com",        href: "mailto:offer.tdpa@gmail.com" },
              { icon: Phone, text: "+91 97785 58140",             href: "tel:+919778558140" },
              { icon: MapPin,text: "Thodupuzha, Kerala",          href: "https://maps.app.goo.gl/3K2yygR7kKj79ta77" },
            ].map(item => (
              <a key={item.text} href={item.href} target={item.icon === MapPin ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: T.cardBg, border: `1px solid ${T.border}`,
                  borderRadius: 40, padding: "10px 20px",
                  fontSize: 14, fontWeight: 600, color: T.text,
                  textDecoration: "none", transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={e => {
                  const a = e.currentTarget as HTMLAnchorElement;
                  a.style.borderColor = T.primary;
                  a.style.background = T.light;
                }}
                onMouseLeave={e => {
                  const a = e.currentTarget as HTMLAnchorElement;
                  a.style.borderColor = T.border;
                  a.style.background = T.cardBg;
                }}
              >
                <item.icon size={15} color={T.primary} />
                {item.text}
              </a>
            ))}
          </div>

          <a href="/contact" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: T.primary, color: T.white,
            borderRadius: 50, padding: "15px 40px",
            fontWeight: 800, fontSize: 16, textDecoration: "none",
            boxShadow: `0 8px 28px rgba(201,79,0,0.35)`,
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 14px 36px rgba(201,79,0,0.45)`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "none";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 8px 28px rgba(201,79,0,0.35)`;
            }}
          >
            Book a Free Consultation <ArrowRight size={18} />
          </a>
        </div>
      </Fade>
    </section>

    {/* ── FOOTER ── */}
    <footer style={{
      background: T.text, color: "rgba(255,255,255,0.7)",
      padding: "3.5rem 1.5rem 2rem",
    }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 40, marginBottom: "3rem",
        }}>
          {/* brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
              <GraduationCap size={24} color={T.gold} />
              <span style={{ fontWeight: 800, fontSize: 18, color: T.white, letterSpacing: "-0.02em" }}>
                EC Overseas
              </span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.75, marginBottom: "1.2rem", maxWidth: 240 }}>
              Thodupuzha's leading study abroad consultancy, helping Kerala students reach the world.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(255,255,255,0.6)",
                    transition: "background 0.2s, color 0.2s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={e => {
                    const a = e.currentTarget as HTMLAnchorElement;
                    a.style.background = "rgba(255,255,255,0.18)";
                    a.style.color = T.white;
                  }}
                  onMouseLeave={e => {
                    const a = e.currentTarget as HTMLAnchorElement;
                    a.style.background = "rgba(255,255,255,0.08)";
                    a.style.color = "rgba(255,255,255,0.6)";
                  }}
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* contact */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: T.white, marginBottom: "1rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Contact
            </h4>
            {[
              { icon: Mail,  text: "offer.tdpa@gmail.com",  href: "mailto:offer.tdpa@gmail.com" },
              { icon: Phone, text: "+91 97785 58140",        href: "tel:+919778558140" },
              { icon: MapPin,text: "Thodupuzha, Kerala",     href: "https://maps.app.goo.gl/3K2yygR7kKj79ta77" },
            ].map(item => (
              <a key={item.text} href={item.href} target={item.icon === MapPin ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  fontSize: 13, color: "rgba(255,255,255,0.6)",
                  textDecoration: "none", marginBottom: "0.7rem",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = T.white; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)"; }}
              >
                <item.icon size={13} color={T.gold} /> {item.text}
              </a>
            ))}
          </div>

          {/* explore */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: T.white, marginBottom: "1rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Explore
            </h4>
            {["Study in Ireland", "Study in UK", "Study in Canada", "Study in Australia", "German Language"].map(l => (
              <a key={l} href="#" style={{
                display: "block", fontSize: 13, color: "rgba(255,255,255,0.6)",
                textDecoration: "none", marginBottom: "0.6rem",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = T.white; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)"; }}
              >
                {l}
              </a>
            ))}
          </div>

          {/* support */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: T.white, marginBottom: "1rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Support
            </h4>
            {["Contact Us", "Student Stories", "FAQs", "Privacy Policy"].map(l => (
              <a key={l} href="#" style={{
                display: "block", fontSize: 13, color: "rgba(255,255,255,0.6)",
                textDecoration: "none", marginBottom: "0.6rem",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = T.white; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)"; }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "1.5rem",
          display: "flex", flexWrap: "wrap",
          justifyContent: "space-between", alignItems: "center", gap: 12,
        }}>
          <span style={{ fontSize: 13 }}>© 2026 EC Overseas. All rights reserved.</span>
          <span style={{ fontSize: 13, color: T.gold }}>Made with ♥ in Thodupuzha</span>
        </div>
      </div>
    </footer>

  </div>
);

export default AboutUs;