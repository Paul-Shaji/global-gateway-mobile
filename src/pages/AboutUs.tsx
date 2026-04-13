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