export interface Country {
  id: string;
  name: string;
  flag: string;
  region: string;
  tagline: string;
  programCount: number;
  universityCount: number;
  heroImage?: string;
}

export interface Region {
  name: string;
  countries: Country[];
}

export const popularCountries: Country[] = [
  { id: "uk", name: "United Kingdom", flag: "🇬🇧", region: "Europe", tagline: "World-class education in historic cities", programCount: 24, universityCount: 15 },
  { id: "ireland", name: "Ireland", flag: "🇮🇪", region: "Europe", tagline: "Friendly people, rich literary heritage", programCount: 8, universityCount: 5 },
  { id: "germany", name: "Germany", flag: "🇩🇪", region: "Europe", tagline: "Engineering and innovation hub", programCount: 16, universityCount: 10 },
  { id: "australia", name: "Australia", flag: "🇦🇺", region: "Oceania", tagline: "Adventure and world-class research", programCount: 12, universityCount: 8 },
  { id: "new-zealand", name: "New Zealand", flag: "🇳🇿", region: "Oceania", tagline: "Stunning landscapes and quality education", programCount: 6, universityCount: 4 },
  { id: "al", name: "Albania", flag: "🇦🇱", region: "Europe", tagline: "Emerging destination with affordable education", programCount: 4, universityCount: 3 },

];

export const regions: Region[] = [
  {
    name: "North America",
    countries: [
      { id: "canada", name: "Canada", flag: "🇨🇦", region: "North America", tagline: "Multicultural society with top-ranked universities", programCount: 18, universityCount: 12 },
    ],
  },
  {
    name: "Europe",
    countries: [
      ...popularCountries.filter(c => c.region === "Europe"),
      { id: "al", name: "Albania", flag: "🇦🇱", region: "Europe", tagline: "Emerging destination with affordable education", programCount: 4, universityCount: 3 },
      { id: "austria", name: "Austria", flag: "🇦🇹", region: "Europe", tagline: "Music, mountains, and academic excellence", programCount: 5, universityCount: 3 },
      { id: "belgium", name: "Belgium", flag: "🇧🇪", region: "Europe", tagline: "Heart of Europe", programCount: 4, universityCount: 3 },
      { id: "germany", name: "Germany", flag: "🇩🇪", region: "Europe", tagline: "Engineering and innovation hub", programCount: 16, universityCount: 10 },
      { id: "greece", name: "Greece", flag: "🇬🇷", region: "Europe", tagline: "Birthplace of Western civilization", programCount: 5, universityCount: 3 },
      { id: "ireland", name: "Ireland", flag: "🇮🇪", region: "Europe", tagline: "Friendly people, rich literary heritage", programCount: 8, universityCount: 5 },
      { id: "netherlands", name: "Netherlands", flag: "🇳🇱", region: "Europe", tagline: "Progressive and international", programCount: 9, universityCount: 6 },
      { id: "sweden", name: "Sweden", flag: "🇸🇪", region: "Europe", tagline: "Innovation and sustainability", programCount: 7, universityCount: 4 },
    ],
  },
  {
    name: "Asia",
    countries: [
      { id: "japan", name: "Japan", flag: "🇯🇵", region: "Asia", tagline: "Ancient traditions meet cutting-edge innovation", programCount: 10, universityCount: 6 },
      { id: "singapore", name: "Singapore", flag: "🇸🇬", region: "Asia", tagline: "Global hub of excellence", programCount: 4, universityCount: 3 },
      { id: "thailand", name: "Thailand", flag: "🇹🇭", region: "Asia", tagline: "Tropical learning adventures", programCount: 3, universityCount: 2 },
    ],
  },
  {
    name: "Latin America",
    countries: [
      { id: "brazil", name: "Brazil", flag: "🇧🇷", region: "Latin America", tagline: "Passion, rhythm, and diversity", programCount: 5, universityCount: 3 },
      { id: "mexico", name: "Mexico", flag: "🇲🇽", region: "Latin America", tagline: "Rich heritage and warm hospitality", programCount: 6, universityCount: 4 },
      { id: "argentina", name: "Argentina", flag: "🇦🇷", region: "Latin America", tagline: "Tango, culture, and adventure", programCount: 4, universityCount: 3 },
      { id: "colombia", name: "Colombia", flag: "🇨🇴", region: "Latin America", tagline: "Emerging destination full of surprises", programCount: 3, universityCount: 2 },
      { id: "chile", name: "Chile", flag: "🇨🇱", region: "Latin America", tagline: "Mountains, wine, and innovation", programCount: 4, universityCount: 3 },
      { id: "costa-rica", name: "Costa Rica", flag: "🇨🇷", region: "Latin America", tagline: "Pura vida and sustainability", programCount: 3, universityCount: 2 },
    ],
  },
  {
    name: "Oceania",
    countries: [
      { id: "australia", name: "Australia", flag: "🇦🇺", region: "Oceania", tagline: "Adventure and world-class research", programCount: 12, universityCount: 8 },
      { id: "new-zealand", name: "New Zealand", flag: "🇳🇿", region: "Oceania", tagline: "Stunning landscapes and quality education", programCount: 6, universityCount: 4 },
    ],
  },


];

export const allCountries = regions.flatMap(r => r.countries);
