export interface Location {
  name: string;
  lat: number;
  lng: number;
  country: string;
  hint: string;
  difficulty: "easy" | "medium" | "hard";
  region: "world" | "asia" | "europe" | "americas";
}

export const locations: Location[] = [
  // ========== EASY — Famous capitals & landmarks ==========
  { name: "Paris", lat: 48.8566, lng: 2.3522, country: "France", hint: "City of Light", difficulty: "easy", region: "europe" },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503, country: "Japan", hint: "Largest metro area on Earth", difficulty: "easy", region: "asia" },
  { name: "New York City", lat: 40.7128, lng: -74.006, country: "USA", hint: "The Big Apple", difficulty: "easy", region: "americas" },
  { name: "London", lat: 51.5074, lng: -0.1278, country: "UK", hint: "Home of Big Ben", difficulty: "easy", region: "europe" },
  { name: "Sydney", lat: -33.8688, lng: 151.2093, country: "Australia", hint: "Famous opera house", difficulty: "easy", region: "world" },
  { name: "Cairo", lat: 30.0444, lng: 31.2357, country: "Egypt", hint: "Near the Great Pyramids", difficulty: "easy", region: "world" },
  { name: "Moscow", lat: 55.7558, lng: 37.6173, country: "Russia", hint: "Red Square", difficulty: "easy", region: "europe" },
  { name: "Beijing", lat: 39.9042, lng: 116.4074, country: "China", hint: "Forbidden City", difficulty: "easy", region: "asia" },
  { name: "Rio de Janeiro", lat: -22.9068, lng: -43.1729, country: "Brazil", hint: "Christ the Redeemer", difficulty: "easy", region: "americas" },
  { name: "Dubai", lat: 25.2048, lng: 55.2708, country: "UAE", hint: "Tallest building in the world", difficulty: "easy", region: "asia" },
  { name: "Rome", lat: 41.9028, lng: 12.4964, country: "Italy", hint: "The Eternal City", difficulty: "easy", region: "europe" },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437, country: "USA", hint: "Hollywood", difficulty: "easy", region: "americas" },
  { name: "Mumbai", lat: 19.076, lng: 72.8777, country: "India", hint: "Bollywood capital", difficulty: "easy", region: "asia" },
  { name: "Berlin", lat: 52.52, lng: 13.405, country: "Germany", hint: "Once divided by a wall", difficulty: "easy", region: "europe" },
  { name: "Bangkok", lat: 13.7563, lng: 100.5018, country: "Thailand", hint: "City of Temples", difficulty: "easy", region: "asia" },

  // ========== MEDIUM — Well-known but less pinpointed ==========
  { name: "Colombo", lat: 6.9271, lng: 79.8612, country: "Sri Lanka", hint: "Island nation's capital", difficulty: "medium", region: "asia" },
  { name: "Istanbul", lat: 41.0082, lng: 28.9784, country: "Turkey", hint: "Straddles two continents", difficulty: "medium", region: "europe" },
  { name: "Buenos Aires", lat: -34.6037, lng: -58.3816, country: "Argentina", hint: "Tango capital", difficulty: "medium", region: "americas" },
  { name: "Nairobi", lat: -1.2921, lng: 36.8219, country: "Kenya", hint: "Safari gateway", difficulty: "medium", region: "world" },
  { name: "Seoul", lat: 37.5665, lng: 126.978, country: "South Korea", hint: "K-pop origin", difficulty: "medium", region: "asia" },
  { name: "Lisbon", lat: 38.7223, lng: -9.1393, country: "Portugal", hint: "City of seven hills", difficulty: "medium", region: "europe" },
  { name: "Singapore", lat: 1.3521, lng: 103.8198, country: "Singapore", hint: "Lion City", difficulty: "medium", region: "asia" },
  { name: "Mexico City", lat: 19.4326, lng: -99.1332, country: "Mexico", hint: "Built on a lake bed", difficulty: "medium", region: "americas" },
  { name: "Cape Town", lat: -33.9249, lng: 18.4241, country: "South Africa", hint: "Table Mountain", difficulty: "medium", region: "world" },
  { name: "Kathmandu", lat: 27.7172, lng: 85.324, country: "Nepal", hint: "Gateway to Everest", difficulty: "medium", region: "asia" },
  { name: "Stockholm", lat: 59.3293, lng: 18.0686, country: "Sweden", hint: "Nobel Prize city", difficulty: "medium", region: "europe" },
  { name: "Havana", lat: 23.1136, lng: -82.3666, country: "Cuba", hint: "Classic cars & cigars", difficulty: "medium", region: "americas" },
  { name: "Athens", lat: 37.9838, lng: 23.7275, country: "Greece", hint: "Birthplace of democracy", difficulty: "medium", region: "europe" },
  { name: "Jakarta", lat: -6.2088, lng: 106.8456, country: "Indonesia", hint: "Largest archipelago nation", difficulty: "medium", region: "asia" },
  { name: "Lima", lat: -12.0464, lng: -77.0428, country: "Peru", hint: "Gateway to Machu Picchu", difficulty: "medium", region: "americas" },
  { name: "Vienna", lat: 48.2082, lng: 16.3738, country: "Austria", hint: "City of music", difficulty: "medium", region: "europe" },
  { name: "Hanoi", lat: 21.0285, lng: 105.8542, country: "Vietnam", hint: "City of lakes", difficulty: "medium", region: "asia" },
  { name: "Bogotá", lat: 4.711, lng: -74.0721, country: "Colombia", hint: "High-altitude capital", difficulty: "medium", region: "americas" },
  { name: "Prague", lat: 50.0755, lng: 14.4378, country: "Czech Republic", hint: "City of a hundred spires", difficulty: "medium", region: "europe" },
  { name: "Addis Ababa", lat: 9.02, lng: 38.7469, country: "Ethiopia", hint: "African Union HQ", difficulty: "medium", region: "world" },
  { name: "Marrakech", lat: 31.6295, lng: -7.9811, country: "Morocco", hint: "Red City of Morocco", difficulty: "medium", region: "world" },
  { name: "Manila", lat: 14.5995, lng: 120.9842, country: "Philippines", hint: "Pearl of the Orient", difficulty: "medium", region: "asia" },

  // ========== HARD — Obscure cities & tricky locations ==========
  { name: "Ulaanbaatar", lat: 47.8864, lng: 106.9057, country: "Mongolia", hint: "Coldest capital city", difficulty: "hard", region: "asia" },
  { name: "Reykjavik", lat: 64.1466, lng: -21.9426, country: "Iceland", hint: "Northernmost capital", difficulty: "hard", region: "europe" },
  { name: "Tbilisi", lat: 41.7151, lng: 44.8271, country: "Georgia", hint: "Ancient wine country", difficulty: "hard", region: "europe" },
  { name: "Montevideo", lat: -34.9011, lng: -56.1645, country: "Uruguay", hint: "First FIFA World Cup", difficulty: "hard", region: "americas" },
  { name: "Dar es Salaam", lat: -6.7924, lng: 39.2083, country: "Tanzania", hint: "Haven of Peace", difficulty: "hard", region: "world" },
  { name: "Almaty", lat: 43.2551, lng: 76.9126, country: "Kazakhstan", hint: "City of Apples", difficulty: "hard", region: "asia" },
  { name: "Bratislava", lat: 48.1486, lng: 17.1077, country: "Slovakia", hint: "Danube beauty", difficulty: "hard", region: "europe" },
  { name: "Quito", lat: -0.1807, lng: -78.4678, country: "Ecuador", hint: "On the equator line", difficulty: "hard", region: "americas" },
  { name: "Windhoek", lat: -22.5609, lng: 17.0658, country: "Namibia", hint: "Desert capital", difficulty: "hard", region: "world" },
  { name: "Yangon", lat: 16.8661, lng: 96.1951, country: "Myanmar", hint: "Golden pagoda city", difficulty: "hard", region: "asia" },
  { name: "Valletta", lat: 35.8989, lng: 14.5146, country: "Malta", hint: "Tiny Mediterranean fortress", difficulty: "hard", region: "europe" },
  { name: "Asunción", lat: -25.2637, lng: -57.5759, country: "Paraguay", hint: "Mother of Cities", difficulty: "hard", region: "americas" },
  { name: "Lusaka", lat: -15.3875, lng: 28.3228, country: "Zambia", hint: "Near Victoria Falls", difficulty: "hard", region: "world" },
  { name: "Bishkek", lat: 42.8746, lng: 74.5698, country: "Kyrgyzstan", hint: "Central Asian gem", difficulty: "hard", region: "asia" },
  { name: "Riga", lat: 56.9496, lng: 24.1052, country: "Latvia", hint: "Art Nouveau architecture", difficulty: "hard", region: "europe" },
  { name: "Tegucigalpa", lat: 14.0723, lng: -87.1921, country: "Honduras", hint: "Silver hill capital", difficulty: "hard", region: "americas" },
  { name: "Antananarivo", lat: -18.8792, lng: 47.5079, country: "Madagascar", hint: "Lemur island capital", difficulty: "hard", region: "world" },
  { name: "Thimphu", lat: 27.4728, lng: 89.6393, country: "Bhutan", hint: "Gross National Happiness", difficulty: "hard", region: "asia" },
  { name: "Tirana", lat: 41.3275, lng: 19.8187, country: "Albania", hint: "Colorful Balkan capital", difficulty: "hard", region: "europe" },
  { name: "Belmopan", lat: 17.251, lng: -88.759, country: "Belize", hint: "Smallest Central American capital", difficulty: "hard", region: "americas" },
  { name: "Maputo", lat: -25.9692, lng: 32.5732, country: "Mozambique", hint: "Indian Ocean port", difficulty: "hard", region: "world" },
  { name: "Vientiane", lat: 17.9757, lng: 102.6331, country: "Laos", hint: "City of sandalwood", difficulty: "hard", region: "asia" },
  { name: "Chisinau", lat: 47.0105, lng: 28.8638, country: "Moldova", hint: "Wine cellar capital", difficulty: "hard", region: "europe" },
];

export function getGameLocations(
  region: string,
  difficulty: string,
  count: number = 5
): Location[] {
  let pool = locations.filter((loc) => {
    const regionMatch = region === "world" || loc.region === region;
    const diffMatch = loc.difficulty === difficulty;
    return regionMatch && diffMatch;
  });

  if (pool.length < count) {
    pool = locations.filter((loc) => {
      return region === "world" || loc.region === region;
    });
  }

  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const seen = new Set<string>();
  const unique = shuffled.filter((loc) => {
    if (seen.has(loc.name)) return false;
    seen.add(loc.name);
    return true;
  });

  return unique.slice(0, count);
}
