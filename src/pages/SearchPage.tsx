import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, X, ChevronLeft, MapPin, Star } from "lucide-react";
import { allCountries } from "@/data/countries";
import { universities } from "@/data/universities";
import { programs } from "@/data/universities";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query || query.length < 2) return null;
    const q = query.toLowerCase();
    return {
      countries: allCountries.filter(c => c.name.toLowerCase().includes(q)),
      universities: universities.filter(u =>
        u.name.toLowerCase().includes(q) || u.city.toLowerCase().includes(q)
      ),
      programs: programs.filter(p =>
        p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      ),
    };
  }, [query]);

  const popularSearches = [
    "Semester programs", "Scholarships available", "Language requirements",
    "Summer programs Europe", "Business schools UK",
  ];

  return (
    <div className="min-h-screen bg-background pt-14">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center gap-2 px-4 bg-card/95 backdrop-blur-md border-b border-border">
        <button onClick={() => navigate(-1)} className="touch-target flex items-center justify-center shrink-0">
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search countries, universities..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            className="w-full h-10 pl-10 pr-10 rounded-lg bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent text-sm"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <button onClick={() => navigate(-1)} className="text-sm font-medium text-accent shrink-0">
          Cancel
        </button>
      </div>

      <div className="px-4 py-4">
        {!results ? (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Popular Searches</h3>
            <div className="space-y-1">
              {popularSearches.map(s => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="w-full text-left py-3 px-3 rounded-lg text-foreground hover:bg-secondary transition-colors flex items-center gap-3 touch-target"
                >
                  <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Countries */}
            {results.countries.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Countries ({results.countries.length})
                </h3>
                {results.countries.map(c => (
                  <Link
                    key={c.id}
                    to={`/country/${c.id}`}
                    className="flex items-center gap-3 py-3 px-2 hover:bg-secondary rounded-lg transition-colors touch-target"
                  >
                    <span className="text-xl">{c.flag}</span>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.programCount} programs</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Universities */}
            {results.universities.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Universities ({results.universities.length})
                </h3>
                {results.universities.map(u => (
                  <Link
                    key={u.id}
                    to={`/university/${u.id}`}
                    className="flex items-center gap-3 py-3 px-2 hover:bg-secondary rounded-lg transition-colors touch-target"
                  >
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-lg">{u.countryFlag}</div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{u.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {u.city}, {u.country}
                      </p>
                    </div>
                    <Star className="h-3.5 w-3.5 text-gold fill-gold" />
                    <span className="text-sm text-foreground">{u.rating}</span>
                  </Link>
                ))}
              </div>
            )}

            {/* Programs */}
            {results.programs.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Programs ({results.programs.length})
                </h3>
                {results.programs.map(p => (
                  <Link
                    key={p.id}
                    to={`/program/${p.id}`}
                    className="block bg-card rounded-lg p-4 mb-2 shadow-soft border border-border hover:shadow-card transition-shadow"
                  >
                    <h4 className="font-semibold text-foreground">{p.name}</h4>
                    <p className="text-sm text-muted-foreground">{p.university}</p>
                    <div className="mt-1 flex items-center gap-2 text-sm">
                      <span className="font-medium text-foreground">{p.cost}</span>
                      <span className="text-muted-foreground">• {p.term}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {results.countries.length === 0 && results.universities.length === 0 && results.programs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No results found for "{query}"</p>
                <p className="text-sm text-muted-foreground mt-1">Try a different search term</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
