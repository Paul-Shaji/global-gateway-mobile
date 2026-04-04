import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Search, ChevronRight, ChevronLeft, GraduationCap } from "lucide-react";
import { allCountries, regions, type Country } from "@/data/countries";
import { universities, type University } from "@/data/universities";
import { Button } from "@/components/ui/button";
import { getFlagUrl, getFlagUrlFromName } from "@/lib/utils";

type NavPanel = "main" | "countries" | "universities";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<NavPanel>("main");
  const [countrySearch, setCountrySearch] = useState("");
  const [uniSearch, setUniSearch] = useState("");
  const [expandedRegions, setExpandedRegions] = useState<string[]>(["Popular Destinations"]);
  const navigate = useNavigate();

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
      <header className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 bg-card/95 backdrop-blur-md border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <GraduationCap className="h-7 w-7 text-accent" />
          <span className="font-display text-lg text-foreground">StudyAbroad</span>
        </Link>
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleNavClick("/search")}
            className="touch-target flex items-center justify-center rounded-lg hover:bg-secondary transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5 text-foreground" />
          </button>
          <button
            onClick={() => setOpen(true)}
            className="touch-target flex items-center justify-center rounded-lg hover:bg-secondary transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-foreground" />
          </button>
        </div>
      </header>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-card"
          >
            <AnimatePresence mode="wait">
              {panel === "main" && (
                <motion.div
                  key="main"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-full flex flex-col"
                >
                  <div className="h-14 flex items-center justify-between px-4 border-b border-border">
                    <span className="font-display text-lg text-foreground">Menu</span>
                    <button onClick={close} className="touch-target flex items-center justify-center" aria-label="Close menu">
                      <X className="h-6 w-6 text-foreground" />
                    </button>
                  </div>
                  <nav className="flex-1 overflow-y-auto py-4">
                    <NavItem label="Home" onClick={() => handleNavClick("/")} />
                    <NavItem label="Programs" onClick={() => handleNavClick("/programs")} />
                    <NavItem label="Countries" chevron onClick={() => setPanel("countries")} />
                    <NavItem label="Universities" chevron onClick={() => setPanel("universities")} />
                    <NavItem label="Student Stories" onClick={() => handleNavClick("/stories")} />
                    <NavItem label="Resources" onClick={() => handleNavClick("/resources")} />
                    <div className="px-4 pt-6">
                      <Button
                        className="w-full h-12 text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90"
                        onClick={() => handleNavClick("/apply")}
                      >
                        Apply Now
                      </Button>
                    </div>
                    <div className="px-4 pt-3">
                      <Button
                        variant="outline"
                        className="w-full h-12 text-base border-border text-foreground"
                        onClick={() => handleNavClick("/contact")}
                      >
                        Contact Us
                      </Button>
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
      <span className="text-xl">{country.flag}</span>
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
