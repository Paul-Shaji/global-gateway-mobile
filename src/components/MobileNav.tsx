import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AlignLeft, X, Search, ChevronRight, ChevronLeft, GraduationCap } from "lucide-react";
import { allCountries, regions, type Country } from "@/data/countries";
import { universities, type University } from "@/data/universities";
import { Button } from "@/components/ui/button";
import { getFlagUrl, getFlagUrlFromName } from "@/lib/utils";
import logo from "@/assets/logo_ecoverseas.png"
import { Label } from "recharts";

type NavPanel = "main" | "countries" | "universities";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<NavPanel>("main");
  const [countrySearch, setCountrySearch] = useState("");
  const [uniSearch, setUniSearch] = useState("");
  const [expandedRegions, setExpandedRegions] = useState<string[]>(["Popular Destinations"]);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    setPanel("main");
    setCountrySearch("");
    setUniSearch("");
  }, []);

  const handleNavClick = (path: string) => {
    close();
    navigate(path);
  };

  const toggleRegion = (name: string) => {
    setExpandedRegions(prev =>
      prev.includes(name) ? prev.filter(r => r !== name) : [...prev, name]
    );
  };

  const filteredCountries = countrySearch
    ? allCountries.filter(c => c.name.toLowerCase().includes(countrySearch.toLowerCase()))
    : null;

  const filteredUniversities = uniSearch
    ? universities.filter(u =>
        u.name.toLowerCase().includes(uniSearch.toLowerCase()) ||
        u.country.toLowerCase().includes(uniSearch.toLowerCase())
      )
    : universities;

  const popularCountries = allCountries.filter(c =>
    ["uk", "france", "japan", "spain", "italy"].includes(c.id)
  );

  return (
    <>
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 bg-black border-b border-white/10 text-white">
      <Link to="/" className="flex items-center gap-2">
  <img 
    src={logo}
    alt="EC Overseas" 
    className="h-10 w-auto object-contain"
  />
</Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { label: "Countries", path: "/search" },
            { label: "Universities", path: "/search" },
            { label: "Stories", path: "/stories" },
            { label: "About Us", path: "/about" },
            { label: "Contact", path: "/contact" },
          ].map(item => (
            <Link
              key={item.label}
              to={item.path}
              className="px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-secondary text-center text-primary-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Button className="ml-2 h-9 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link to="/contact">Apply Now</Link>
          </Button>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-1">
          <button
            onClick={() => handleNavClick("/search")}
            className="touch-target flex items-center justify-center rounded-lg hover:bg-secondary transition-colors text-primary-foreground"
            aria-label="Search"
          >
            <Search className="h-5 w-5 text-primary-foreground" />
          </button>
          <button
            onClick={() => setOpen(true)}
            className="touch-target flex items-center justify-center rounded-lg hover:bg-secondary transition-colors text-primary-foreground"
            aria-label="Open menu"
          >
            <AlignLeft className="h-6 w-6 text-primary-foreground" />
          </button>
        </div>
      </header>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[100] bg-background"
          >
            <AnimatePresence mode="wait">
              {panel === "main" && (
                <motion.div
                  key="main"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="h-full flex flex-col"
                >
                  {/* Menu Header */}
                  <div className="h-14 flex items-center justify-between px-5 border-b border-border bg-background">
                    {/* <img src={logo} alt="EC Overseas" className="h-8 w-auto object-contain" /> */}
                    <button onClick={close} className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary" aria-label="Close menu">
                      <X className="h-5 w-5 text-foreground" />
                    </button>
                  </div>

                  <nav className="flex-1 overflow-y-auto">
                    {/* Nav label */}
                    <p className="px-5 pt-5 pb-2 text-xs font-bold tracking-widest text-muted-foreground uppercase">Navigation</p>

                    {[
                      { label: "Home", path: "/", icon: "🏠" },
                      { label: "About Us", path: "/about", icon: "ℹ️" },
                      // { label: "Programs", path: "/programs", icon: "🎓" },
                      { label: "Student Stories", path: "/stories", icon: "💬" },
                      { label: "Contact an Advisor", path: "/contact", icon: "📞" },
                    ].map(item => (
                      <button
                        key={item.label}
                        onClick={() => handleNavClick(item.path)}
                        className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-orange-500/10 transition-colors text-left group"
                      >
                        <span className="text-lg w-7 text-center">{item.icon}</span>
                        <span className="text-base font-medium text-foreground group-hover:text-orange-500 transition-colors">{item.label}</span>
                      </button>
                    ))}

                    {/* Expandable items */}
                    <button
                      onClick={() => setPanel("countries")}
                      className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-orange-500/10 transition-colors text-left group"
                    >
                      <span className="text-lg w-7 text-center">🌍</span>
                      <span className="text-base font-medium text-foreground group-hover:text-orange-500 transition-colors flex-1">Countries</span>
                      <ChevronRight className="h-4 w-4 text-orange-400" />
                    </button>
                    <button
                      onClick={() => setPanel("universities")}
                      className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-orange-500/10 transition-colors text-left group"
                    >
                      <span className="text-lg w-7 text-center">🏛️</span>
                      <span className="text-base font-medium text-foreground group-hover:text-orange-500 transition-colors flex-1">Universities</span>
                      <ChevronRight className="h-4 w-4 text-orange-400" />
                    </button>

                    {/* Divider */}
                    <div className="mx-5 my-4 border-t border-border" />

                    {/* CTA Buttons */}
                    <div className="px-5 space-y-3">
                      <Button
                        className="w-full h-12 text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 rounded-xl"
                        onClick={() => handleNavClick("/contact")}
                      >
                        Apply Now
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full h-12 text-sm border-orange-400 text-orange-500 hover:bg-orange-500/10 rounded-xl"
                        onClick={() => handleNavClick("/contact")}
                      >
                        Contact Us
                      </Button>
                    </div>

                    {/* Social links */}
                    <div className="px-5 pt-6 pb-8">
                      <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-3">Follow Us</p>
                      <div className="flex gap-3">
                        {[
                          { label: "Instagram", href: "https://instagram.com/ec_overseas/", svg: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg> },
                          { label: "YouTube", href: "https://youtube.com/@YOUR_HANDLE", svg: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
                          { label: "Facebook", href: "https://facebook.com/ecoverseastdpa/", svg: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
                        ].map(s => (
                          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                            className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 hover:bg-orange-500/20 transition-colors">
                            {s.svg}
                          </a>
                        ))}
                      </div>
                    </div>
                  </nav>
                </motion.div>
              )}

              {panel === "countries" && (
                <motion.div
                  key="countries"
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 40, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-full flex flex-col"
                >
                  <div className="h-14 flex items-center justify-between px-4 border-b border-border">
                    <button onClick={() => setPanel("main")} className="touch-target flex items-center gap-1 text-muted-foreground">
                      <ChevronLeft className="h-5 w-5" /> Back
                    </button>
                    <span className="font-display text-lg text-foreground">Countries</span>
                    <button onClick={close} className="touch-target flex items-center justify-center" aria-label="Close">
                      <X className="h-6 w-6 text-foreground" />
                    </button>
                  </div>
                  <div className="px-4 py-3 border-b border-border">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search countries..."
                        value={countrySearch}
                        onChange={e => setCountrySearch(e.target.value)}
                        className="w-full h-11 pl-10 pr-10 rounded-lg bg-secondary border-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                      {countrySearch && (
                        <button onClick={() => setCountrySearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                          <X className="h-4 w-4 text-muted-foreground" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {filteredCountries ? (
                      filteredCountries.length > 0 ? (
                        <div className="py-2">
                          {filteredCountries.map(c => (
                            <CountryItem key={c.id} country={c} onClick={() => handleNavClick(`/country/${c.id}`)} />
                          ))}
                        </div>
                      ) : (
                        <p className="p-8 text-center text-muted-foreground">No countries found</p>
                      )
                    ) : (
                      <>
                        <RegionSection
                          title="Popular Destinations"
                          countries={popularCountries}
                          expanded={expandedRegions.includes("Popular Destinations")}
                          onToggle={() => toggleRegion("Popular Destinations")}
                          onCountryClick={id => handleNavClick(`/country/${id}`)}
                        />
                        {regions.map(r => (
                          <RegionSection
                            key={r.name}
                            title={`${r.name} (${r.countries.length})`}
                            countries={r.countries}
                            expanded={expandedRegions.includes(r.name)}
                            onToggle={() => toggleRegion(r.name)}
                            onCountryClick={id => handleNavClick(`/country/${id}`)}
                            limit={5}
                          />
                        ))}
                      </>
                    )}
                  </div>
                </motion.div>
              )}

              {panel === "universities" && (
                <motion.div
                  key="universities"
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 40, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-full flex flex-col"
                >
                  <div className="h-14 flex items-center justify-between px-4 border-b border-border">
                    <button onClick={() => setPanel("main")} className="touch-target flex items-center gap-1 text-muted-foreground">
                      <ChevronLeft className="h-5 w-5" /> Back
                    </button>
                    <span className="font-display text-lg text-foreground">Universities</span>
                    <button onClick={close} className="touch-target flex items-center justify-center" aria-label="Close">
                      <X className="h-6 w-6 text-foreground" />
                    </button>
                  </div>
                  <div className="px-4 py-3 border-b border-border">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search universities..."
                        value={uniSearch}
                        onChange={e => setUniSearch(e.target.value)}
                        className="w-full h-11 pl-10 pr-10 rounded-lg bg-secondary border-none text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                      {uniSearch && (
                        <button onClick={() => setUniSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                          <X className="h-4 w-4 text-muted-foreground" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto py-2">
                    {filteredUniversities.length > 0 ? (
                      filteredUniversities.map(u => (
                        <button
                          key={u.id}
                          onClick={() => handleNavClick(`/university/${u.id}`)}
                          className="w-full flex items-center gap-3 px-4 py-3 min-h-[56px] hover:bg-secondary transition-colors text-left"
                        >
                          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0 overflow-hidden">
                             <img src={getFlagUrlFromName(u.country, 80)} alt={u.country} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">{u.name}</p>
                            <p className="text-sm text-muted-foreground">{u.city}, {u.country}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                        </button>
                      ))
                    ) : (
                      <p className="p-8 text-center text-muted-foreground">No universities found</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavItem({ label, onClick, chevron }: { label: string; onClick: () => void; chevron?: boolean }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-6 py-4 min-h-[56px] text-lg font-medium text-foreground hover:bg-secondary transition-colors"
    >
      {label}
      {chevron && <ChevronRight className="h-5 w-5 text-muted-foreground" />}
    </button>
  );
}

function CountryItem({ country, onClick }: { country: Country; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 min-h-[56px] hover:bg-secondary transition-colors"
    >
      <img src={getFlagUrl(country.id, 40)} alt={country.name} className="w-8 h-6 rounded object-cover" />
      <span className="flex-1 text-left font-medium text-foreground">{country.name}</span>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}

function RegionSection({
  title,
  countries,
  expanded,
  onToggle,
  onCountryClick,
  limit,
}: {
  title: string;
  countries: Country[];
  expanded: boolean;
  onToggle: () => void;
  onCountryClick: (id: string) => void;
  limit?: number;
}) {
  const [showAll, setShowAll] = useState(false);
  const visible = expanded ? (showAll || !limit ? countries : countries.slice(0, limit)) : [];

  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 min-h-[48px]"
      >
        <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">{title}</span>
        <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${expanded ? "rotate-90" : ""}`} />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {visible.map(c => (
              <CountryItem key={c.id} country={c} onClick={() => onCountryClick(c.id)} />
            ))}
            {limit && !showAll && countries.length > limit && (
              <button
                onClick={() => setShowAll(true)}
                className="w-full py-3 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              >
                Show More ({countries.length - limit} more) ▼
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
