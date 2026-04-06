import { useState, useEffect, useRef } from "react";
import type { ElementType } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Search, MapPin, ArrowRight, Star, GraduationCap, Globe, Users, Quote, Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { allCountries } from "@/data/countries";
import { featuredUniversities, programs } from "@/data/universities";
import { getFlagUrl, getFlagUrlFromName } from "@/lib/utils";
import heroImage from "@/assets/WEBSITE_COVER_PAGE_ENGLISH.jpg.jpeg";
import examImage from "@/assets/WEBSITE WEBSITE 1496x538 01.jpg.jpeg"

import heroImageMobile from "@/assets/mobile_cover_page.jpeg";
import studentSarah from "@/assets/student-sarah.jpg";
import studentJames from "@/assets/student-james.jpg";
import studentPriya from "@/assets/student-priya.jpg";
import { MessageSquare, Lightbulb, Wallet, FileCheck, Home, Award } from "lucide-react";

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
          <img src={heroImage} alt="European university campus" className="hidden md:block w-full h-full object-cover" width={1920} height={1080} />
          <img src={heroImageMobile} alt="European university campus" className="md:hidden w-full h-full object-cover" width={768} height={1080} />
          <div className="absolute inset-0  from-foreground/60 via-foreground/40 to-foreground/70" />
        </div>
        <div className="relative px-4 pt-12 pb-16 md:pt-20 md:pb-24 lg:pt-32 lg:pb-36 max-w-4xl mx-auto">        
         {/* Search bar (desktop) / Contact Us (mobile) */}
         {/* Search bar (desktop) / Contact Us (mobile) */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          {/* Desktop: Search bar */}
          <Link
            to="/search"
            className="hidden md:flex items-center gap-3 w-full max-w-md h-14 px-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-colors"
          >
            <Search className="h-5 w-5 text-white/70 shrink-0" />
            <span className="text-base text-white/70">Search countries, universities...</span>
          </Link>

          {/* Mobile: Contact Us button */}
          <Link
            to="/contact"
            className="flex md:hidden items-center justify-center gap-2 w-full max-w-xs h-12 px-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/20 transition-colorss"
          >
          <Mail className="h-4 w-4 text-white/70 shrink-0" />
          
          <span className="text-base text-white/70">Contact Us.</span>
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
          </div>
          <DestinationSlideshow countries={allCountries} />
        </div>
      </section>

     {/* Services Roadmap Section */}
<section className="section-padding bg-gradient-to-b from-primary to-primary/90">
  <div className="max-w-3xl mx-auto">
    <div className="text-center mb-14">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-block px-3 py-1 rounded-full border border-accent/40 text-accent text-xs font-semibold tracking-widest uppercase mb-4">
          Our Process
        </span>
        <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-3">
          Your Journey to Studying Abroad
        </h2>
        <p className="text-sm text-primary-foreground/60 max-w-md mx-auto">
          A clear, guided path from first consultation to life abroad
        </p>
      </motion.div>
    </div>

    <div className="relative">
      {/* Vertical connector line — desktop only */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-px bg-gradient-to-b from-accent/60 via-accent/30 to-transparent" />

      {/* Mobile connector line */}
      <div className="md:hidden absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-accent/60 via-accent/30 to-transparent" />

      <div className="space-y-8">
        {[
          { icon: MessageSquare, title: "Discuss",      description: "1-on-1 counselling with our experts to understand your goals and aspirations." },
          { icon: Lightbulb,    title: "Ideate",        description: "We shortlist the best-fit universities and programs tailored to your profile." },
          { icon: Wallet,       title: "Finance",       description: "Guidance on scholarships, education loans, and financial planning for your journey." },
          { icon: FileCheck,    title: "Visa",          description: "End-to-end visa documentation support with high approval rates." },
          { icon: Home,         title: "Accommodation", description: "We help you find safe, affordable housing before you land." },
          { icon: Award,        title: "PR Assistance", description: "Post-study permanent residency guidance so you can build your future abroad." },
        ].map((step, i) => {
          const isRight = i % 2 === 0;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              {/* Mobile layout */}
              <div className="flex items-start gap-4 md:hidden pl-1">
                <div className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shrink-0 ring-2 ring-white/10 ring-offset-2 ring-offset-primary">
                  <step.icon className="h-4 w-4 text-white" />
                </div>
                <div className="pt-1">
                  <p className="text-xs font-bold tracking-widest text-orange-400 uppercase mb-1">
                    Step {i + 1}
                  </p>
                  <h3 className="font-display text-xl text-primary-foreground">{step.title}</h3>
                  <p className="text-sm text-primary-foreground/60 leading-relaxed mt-1">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Desktop layout — stable 3-column grid */}
              <div className="hidden md:grid md:grid-cols-[1fr_80px_1fr] md:items-center">
                {/* Left cell */}
                <div className={isRight ? "pr-8 text-right" : ""}>
                  {isRight && (
                    <>
                      <p className="text-xs font-bold tracking-widest text-orange-400 uppercase mb-1">
                        Step {i + 1}
                      </p>
                      <h3 className="font-display text-xl md:text-2xl text-primary-foreground">
                        {step.title}
                      </h3>
                      <p className="text-sm text-primary-foreground/60 leading-relaxed mt-1">
                        {step.description}
                      </p>
                    </>
                  )}
                </div>

                {/* Center icon node — always in column 2 */}
                <div className="flex justify-center">
                  <div className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg ring-2 ring-white/10 ring-offset-2 ring-offset-primary">
                    <step.icon className="h-4 w-4 text-white" />
                  </div>
                </div>

                {/* Right cell */}
                <div className={!isRight ? "pl-8" : ""}>
                  {!isRight && (
                    <>
                      <p className="text-xs font-bold tracking-widest text-orange-400 uppercase mb-1">
                        Step {i + 1}
                      </p>
                      <h3 className="font-display text-xl md:text-2xl text-primary-foreground">
                        {step.title}
                      </h3>
                      <p className="text-sm text-primary-foreground/60 leading-relaxed mt-1">
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
      {/* Featured Universities
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
      </section> */}
{/* 
       Popular Programs 
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
      </section> */}

{/* exams section */}
      <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={examImage} alt="European university campus" className="hidden md:block w-full h-full object-cover" width={1920} height={1080} />
            <img src={heroImageMobile} alt="European university campus" className="md:hidden w-full h-full object-cover" width={768} height={1080} />
            <div className="absolute inset-0  from-foreground/60 via-foreground/40 to-foreground/70" />
          </div>
          <div className="relative px-4 pt-12 pb-16 md:pt-20 md:pb-24 lg:pt-32 lg:pb-36 max-w-4xl mx-auto">        
          
          {/* Search bar (desktop) / Contact Us (mobile) */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            {/* Desktop: Search bar */}
            <Link
              to=""
              className="hidden md:flex items-center gap-3 w-full max-w-md h-14 px-5 "
            >
              <Search className="h-5 w-5 text-white/70 shrink-0" />
              {/* <span className="text-base text-white/70">Search countries, universities...</span> */}
            </Link>

            {/* Mobile: Contact Us button */}
            <Link
              to="/contact"
              className="flex md:hidden items-center justify-center gap-2 w-full max-w-xs h-12 px-6 "
            >
            <Mail className="h-4 w-4  shrink-0" />
            
            {/* <span className="text-base text-white/70">Contact Us.</span> */}
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
                  <p className="text-xl font-bold text-primary-foreground font-body"></p>
                  <p className="text-xs text-primary-foreground/60"></p>
                </div>
              ))}
            </motion.div>
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
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:overflow-visible md:snap-none">
            {studentStories.map((story, i) => (
              <motion.div
                key={story.name}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i }}
              >
                <Link
                  to="/stories"
                  className="block bg-card rounded-xl p-5 shadow-soft hover:shadow-card transition-shadow border border-border w-[80vw] md:w-auto shrink-0 md:shrink snap-start"
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

      {/* Contact Section */}
      <section className="section-padding bg-secondary/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="font-display text-2xl md:text-3xl text-foreground">Have Questions?</h2>
            <p className="mt-2 text-muted-foreground">{" "}</p>
          </div>
          <div className="bg-card rounded-xl p-6 md:p-8 shadow-soft border border-border">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {[
                { icon: Mail, title: "Email Us", desc: "Get a response within 24 hours" },
                { icon: Users, title: "1-on-1 Advising", desc: "Schedule a personal session" },
                { icon: Globe, title: "30+ Countries", desc: "Expert knowledge worldwide" },
              ].map(item => (
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
              <Button className="h-12 px-8 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link to="/contact">Talk to an Advisor <ArrowRight className="h-4 w-4 ml-2" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding text-primary-foreground bg-[sidebar-accent-foreground] bg-stone-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl">Ready to explore the world?</h2>
          <p className="mt-3 text-primary-foreground/70 max-w-md mx-auto">
            Start your study abroad journey today. Our advisors are here to help.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="h-12 px-8 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link to="/contact">Get Started</Link>
            </Button>
            <Button variant="outline" className="h-12 px-8 border-primary-foreground/30 hover:bg-primary-foreground/10 bg-background border text-secondary-foreground" asChild>
              <Link to="/search">Browse Programs</Link>
            </Button>
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
                  <span>Your Office Address, City, Country</span>
                </a>
              </li>
              <li>
                <a href="mailto:your@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="h-4 w-4 shrink-0 text-accent" />
                  <span>your@gmail.com</span>
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
                { href: "https://instagram.com/YOUR_HANDLE", label: "Instagram", svg: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg> },
                { href: "https://linkedin.com/company/YOUR_HANDLE", label: "LinkedIn", svg: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                { href: "https://youtube.com/@YOUR_HANDLE", label: "YouTube", svg: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
                { href: "https://twitter.com/YOUR_HANDLE", label: "Twitter", svg: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                { href: "https://facebook.com/YOUR_HANDLE", label: "Facebook", svg: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
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

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/9778558140"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* Instagram Floating Button */}
      <a
        href="https://instagram.com/YOUR_HANDLE"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Follow on Instagram"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
      </a>
    </div>
  );
};
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
          animation: paused ? 'none' : 'marquee 35s linear infinite',
        }}
      >
        {/* Render twice for seamless loop */}
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
            <p className="mt-2 text-sm font-medium text-foreground text-center">{country.name}</p>
            <p className="text-xs text-muted-foreground">{country.programCount} programs</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Index;

// Service Card Component
interface ServiceItem {
  icon: ElementType;
  title: string;
  description: string;
  color: string;
}
function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 40, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="group relative h-full bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 border border-border/50 hover:border-accent/50 overflow-hidden">
        {/* Gradient Background on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon Container */}
          <div className="mb-6">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <service.icon className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Title */}
          <h3 className="font-display text-2xl text-foreground mb-3 group-hover:text-accent transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {service.description}
          </p>

          {/* Arrow Indicator */}
          <div className="mt-6 flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
            <span className="text-sm font-medium">Learn more</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
