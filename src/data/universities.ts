export interface University {
  id: string;
  name: string;
  country: string;
  countryFlag: string;
  city: string;
  founded: number;
  ranking?: string;
  students: string;
  rating: number;
  reviewCount: number;
  programCount: number;
  featured: boolean;
  description: string;
}

export interface Program {
  id: string;
  name: string;
  university: string;
  universityId: string;
  country: string;
  countryId: string;
  duration: string;
  term: string;
  language: string;
  category: string;
}

export const universities: University[] = [
  {
    id: "oxford", name: "University of Oxford", country: "United Kingdom", countryFlag: "🇬🇧",
    city: "Oxford", founded: 1096, ranking: "#1 in UK", students: "24,000",
    rating: 4.9, reviewCount: 342, programCount: 8, featured: true,
    description: "The University of Oxford is the oldest university in the English-speaking world, with evidence of teaching dating back to 1096."
  },
  {
    id: "sorbonne", name: "Sorbonne University", country: "France", countryFlag: "🇫🇷",
    city: "Paris", founded: 1257, ranking: "#1 in France", students: "50,000",
    rating: 4.8, reviewCount: 256, programCount: 6, featured: true,
    description: "Sorbonne University is a world-class research university, presenting the comprehensive disciplinary range of arts, humanities, social sciences, natural sciences, engineering and medicine."
  },
  {
    id: "tokyo", name: "University of Tokyo", country: "Japan", countryFlag: "🇯🇵",
    city: "Tokyo", founded: 1877, ranking: "#1 in Japan", students: "28,000",
    rating: 4.7, reviewCount: 189, programCount: 5, featured: true,
    description: "The University of Tokyo is Japan's most prestigious university, known for its rigorous academics and cutting-edge research."
  },
  {
    id: "barcelona", name: "University of Barcelona", country: "Spain", countryFlag: "🇪🇸",
    city: "Barcelona", founded: 1450, ranking: "#1 in Spain", students: "63,000",
    rating: 4.6, reviewCount: 198, programCount: 7, featured: false,
    description: "The University of Barcelona is a comprehensive higher education institution in the heart of Catalonia."
  },
  {
    id: "bologna", name: "University of Bologna", country: "Italy", countryFlag: "🇮🇹",
    city: "Bologna", founded: 1088, ranking: "#2 in Italy", students: "85,000",
    rating: 4.7, reviewCount: 167, programCount: 5, featured: false,
    description: "Founded in 1088, the University of Bologna is the oldest university in continuous operation in the world."
  },
  {
    id: "melbourne", name: "University of Melbourne", country: "Australia", countryFlag: "🇦🇺",
    city: "Melbourne", founded: 1853, ranking: "#1 in Australia", students: "52,000",
    rating: 4.8, reviewCount: 278, programCount: 9, featured: true,
    description: "The University of Melbourne is a leading research university consistently ranked among the best globally."
  },
];

export const programs: Program[] = [
  { id: "p1", name: "Semester in Paris", university: "Sorbonne University", universityId: "sorbonne", country: "France", countryId: "france", duration: "Semester", cost: "€8,500", term: "Spring 2026", language: "French/English", category: "Liberal Arts" },
  { id: "p2", name: "Art & Culture in Paris", university: "Sorbonne University", universityId: "sorbonne", country: "France", countryId: "france", duration: "Summer", cost: "€4,200", term: "Summer 2026", language: "English", category: "Arts" },
  { id: "p3", name: "Business in Europe", university: "Sorbonne University", universityId: "sorbonne", country: "France", countryId: "france", duration: "Semester", cost: "€9,100", term: "Fall 2026", language: "English", category: "Business" },
  { id: "p4", name: "French Language Immersion", university: "Sorbonne University", universityId: "sorbonne", country: "France", countryId: "france", duration: "8 Weeks", cost: "€3,800", term: "Summer 2026", language: "French", category: "Language" },
  { id: "p5", name: "Oxford Summer Programme", university: "University of Oxford", universityId: "oxford", country: "United Kingdom", countryId: "uk", duration: "Summer", cost: "£6,500", term: "Summer 2026", language: "English", category: "Liberal Arts" },
  { id: "p6", name: "Semester at Oxford", university: "University of Oxford", universityId: "oxford", country: "United Kingdom", countryId: "uk", duration: "Semester", cost: "£14,000", term: "Fall 2026", language: "English", category: "Liberal Arts" },
  { id: "p7", name: "Tokyo Tech Exchange", university: "University of Tokyo", universityId: "tokyo", country: "Japan", countryId: "japan", duration: "Semester", cost: "¥850,000", term: "Spring 2026", language: "Japanese/English", category: "STEM" },
  { id: "p8", name: "Spanish Language & Culture", university: "University of Barcelona", universityId: "barcelona", country: "Spain", countryId: "spain", duration: "Semester", cost: "€6,200", term: "Fall 2026", language: "Spanish/English", category: "Language" },
];

export const featuredUniversities = universities.filter(u => u.featured);
