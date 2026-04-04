import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const countryCodeMap: Record<string, string> = {
  uk: "gb", france: "fr", japan: "jp", spain: "es", italy: "it",
  australia: "au", germany: "de", canada: "ca", netherlands: "nl",
  sweden: "se", switzerland: "ch", "south-korea": "kr", brazil: "br",
  mexico: "mx", india: "in", china: "cn", singapore: "sg",
  "new-zealand": "nz", ireland: "ie", portugal: "pt", norway: "no",
  denmark: "dk", austria: "at", belgium: "be", "czech-republic": "cz",
  greece: "gr", poland: "pl", finland: "fi", "south-africa": "za",
  thailand: "th", argentina: "ar", chile: "cl", colombia: "co",
  "costa-rica": "cr", egypt: "eg", israel: "il", kenya: "ke",
  morocco: "ma", peru: "pe", "united-kingdom": "gb",
};

export function getFlagUrl(countryId: string, size: number = 40): string {
  const code = countryCodeMap[countryId.toLowerCase()] || countryId.toLowerCase();
  return `https://flagcdn.com/w${size}/${code}.png`;
}

export function getFlagUrlFromName(countryName: string, size: number = 40): string {
  const id = countryName.toLowerCase().replace(/\s+/g, "-");
  return getFlagUrl(id, size);
}
