const demoImageUpload = document.getElementById("demo-image-upload");
const demoPreviewImage = document.getElementById("demo-preview-image");
const demoPreviewText = document.getElementById("demo-preview-text");
const demoImagePreview = document.getElementById("demo-image-preview");
const demoChatForm = document.getElementById("demo-chat-form");
const demoUserId = document.getElementById("demo-user-id");
const demoQuery = document.getElementById("demo-query");
const demoCategory = document.getElementById("demo-category");
const demoBrand = document.getElementById("demo-brand");
const chatTranscript = document.getElementById("chat-transcript");
const analysisStatus = document.getElementById("analysis-status");
const resultsCount = document.getElementById("results-count");
const demoResults = document.getElementById("demo-results");
const insightNeed = document.getElementById("insight-need");
const insightFit = document.getElementById("insight-fit");
const insightOutcome = document.getElementById("insight-outcome");
const systemMode = document.getElementById("system-mode");
const searchHistoryList = document.getElementById("search-history");
const agentButton = document.getElementById("agent-button");
const agentPanel = document.getElementById("agent-panel");
const agentCloseButton = document.getElementById("agent-close-button");
const agentChatForm = document.getElementById("agent-chat-form");
const agentQuery = document.getElementById("agent-query");
const agentCategory = document.getElementById("agent-category");
const agentBrand = document.getElementById("agent-brand");
const agentTranscript = document.getElementById("agent-transcript");
const agentStatusCopy = document.getElementById("agent-status-copy");

let uploadedFile = null;
let demoImageUrl = "";
const SEARCH_HISTORY_KEY = "inDepth-search-history";
const USER_PROFILES_KEY = "inDepth-user-profiles";
const SEARCH_LOGS_KEY = "inDepth-search-logs";
const STORAGE_VERSION_KEY = "inDepth-storage-version";
const STORAGE_VERSION = "2";

if (window.localStorage.getItem(STORAGE_VERSION_KEY) !== STORAGE_VERSION) {
  window.localStorage.removeItem(SEARCH_HISTORY_KEY);
  window.localStorage.removeItem(USER_PROFILES_KEY);
  window.localStorage.removeItem(SEARCH_LOGS_KEY);
  window.localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION);
}

let searchHistory = loadSearchHistory();
let userProfiles = loadJson(USER_PROFILES_KEY, {});
let searchLogs = loadJson(SEARCH_LOGS_KEY, []);

const knowledgeBase = [
  {
    topic: "shipping",
    keywords: ["shipping", "delivery", "arrive", "late"],
    response:
      "Shipping times vary by seller and listing, but you can usually check estimated delivery dates directly on the product page.",
  },
  {
    topic: "returns",
    keywords: ["return", "refund", "send back"],
    response:
      "Many eBay listings support returns, but return windows depend on the seller policy shown in the listing details.",
  },
  {
    topic: "seller tools",
    keywords: ["seller", "store", "tools", "listing"],
    response:
      "eBay seller tools can help with listing optimization, pricing, and inventory management depending on the seller plan.",
  },
];

const products = [
  {
    name: "Apple MacBook Air 2017",
    brand: "Apple",
    category: "laptops",
    price: 449,
    tags: ["macbook", "apple", "laptop", "student", "portable"],
  },
  {
    name: "Apple MacBook Pro 2015",
    brand: "Apple",
    category: "laptops",
    price: 499,
    tags: ["macbook", "apple", "laptop", "retina"],
  },
  {
    name: "Lenovo ThinkPad X1 Carbon",
    brand: "Lenovo",
    category: "laptops",
    price: 479,
    tags: ["business", "laptop", "lenovo", "work"],
  },
  {
    name: "Dell Inspiron 15",
    brand: "Dell",
    category: "laptops",
    price: 389,
    tags: ["laptop", "budget", "student", "dell"],
  },
  {
    name: "ASUS TUF Gaming A15",
    brand: "ASUS",
    category: "laptops",
    price: 499,
    tags: ["gaming", "laptop", "asus", "performance"],
  },
  {
    name: "Samsung Galaxy Book Go",
    brand: "Samsung",
    category: "laptops",
    price: 329,
    tags: ["laptop", "portable", "budget", "samsung"],
  },
  {
    name: "Acer Aspire 3",
    brand: "Acer",
    category: "laptops",
    price: 249,
    tags: ["laptop", "budget", "student", "acer"],
  },
  {
    name: "HP Chromebook 14",
    brand: "HP",
    category: "laptops",
    price: 219,
    tags: ["laptop", "chromebook", "budget", "student", "hp"],
  },
  {
    name: "Seiko 5 Automatic Watch",
    brand: "Seiko",
    category: "watches",
    price: 220,
    tags: ["watch", "automatic", "vintage", "collector"],
  },
  {
    name: "Wilson NFL MVP Football",
    brand: "Wilson",
    category: "sports",
    price: 24,
    tags: ["football", "sports", "kids", "outdoor", "play"],
  },
  {
    name: "Nike Youth Vapor Football",
    brand: "Nike",
    category: "sports",
    price: 32,
    tags: ["football", "sports", "youth", "kids", "training"],
  },
  {
    name: "Adidas Predator Soccer Ball",
    brand: "Adidas",
    category: "sports",
    price: 29,
    tags: ["soccer", "ball", "sports", "kids", "outdoor"],
  },
  {
    name: "Spalding Indoor Basketball",
    brand: "Spalding",
    category: "sports",
    price: 27,
    tags: ["basketball", "sports", "indoor", "youth"],
  },
  {
    name: "Sony WH-CH520 Headphones",
    brand: "Sony",
    category: "electronics",
    price: 59,
    tags: ["headphones", "audio", "electronics", "wireless"],
  },
  {
    name: "Apple AirPods 2nd Gen",
    brand: "Apple",
    category: "electronics",
    price: 89,
    tags: ["airpods", "apple", "audio", "earbuds"],
  },
  {
    name: "iPhone 12",
    brand: "Apple",
    category: "phones",
    price: 399,
    tags: ["iphone", "phone", "apple", "smartphone", "ios"],
  },
  {
    name: "Samsung Galaxy S21",
    brand: "Samsung",
    category: "phones",
    price: 349,
    tags: ["samsung", "phone", "smartphone", "android", "galaxy"],
  },
  {
    name: "Google Pixel 6",
    brand: "Google",
    category: "phones",
    price: 299,
    tags: ["google", "pixel", "phone", "smartphone", "android"],
  },
  {
    name: "PlayStation 5 DualSense Controller",
    brand: "Sony",
    category: "gaming",
    price: 54,
    tags: ["gaming", "controller", "playstation", "ps5"],
  },
  {
    name: "Nintendo Switch Lite",
    brand: "Nintendo",
    category: "gaming",
    price: 179,
    tags: ["gaming", "nintendo", "switch", "portable"],
  },
  {
    name: "LEGO Classic Creative Box",
    brand: "LEGO",
    category: "toys",
    price: 34,
    tags: ["lego", "toy", "kids", "creative", "gift"],
  },
  {
    name: "Hot Wheels 20-Car Pack",
    brand: "Hot Wheels",
    category: "toys",
    price: 22,
    tags: ["toy", "cars", "kids", "gift", "play"],
  },
  {
    name: "KitchenAid Stand Mixer",
    brand: "KitchenAid",
    category: "home",
    price: 249,
    tags: ["kitchen", "home", "appliance", "mixer"],
  },
  {
    name: "Dyson V8 Vacuum",
    brand: "Dyson",
    category: "home",
    price: 299,
    tags: ["vacuum", "home", "cleaning", "appliance"],
  },
  {
    name: "Levi's 511 Slim Jeans",
    brand: "Levi's",
    category: "fashion",
    price: 59,
    tags: ["jeans", "denim", "slim", "fashion", "pants"],
  },
  {
    name: "UrbanStyle Baggy Cargo Pants",
    brand: "UrbanStyle",
    category: "fashion",
    price: 45,
    tags: ["baggy", "cargo", "pants", "fashion", "streetwear"],
  },
  {
    name: "Wrangler Relaxed Fit Jeans",
    brand: "Wrangler",
    category: "fashion",
    price: 39,
    tags: ["jeans", "denim", "relaxed", "pants", "casual"],
  },
  {
    name: "Polo Ralph Lauren Classic T-Shirt",
    brand: "Polo Ralph Lauren",
    category: "clothing",
    price: 34,
    tags: ["shirt", "t-shirt", "tee", "clothing", "casual", "cotton"],
  },
  {
    name: "Nike Dri-FIT Training Shirt",
    brand: "Nike",
    category: "clothing",
    price: 28,
    tags: ["shirt", "athletic shirt", "training", "gym", "clothing", "workout"],
  },
  {
    name: "Carhartt Heavyweight Hoodie",
    brand: "Carhartt",
    category: "clothing",
    price: 54,
    tags: ["hoodie", "sweatshirt", "clothing", "casual", "streetwear"],
  },
  {
    name: "The North Face Puffer Jacket",
    brand: "The North Face",
    category: "jackets",
    price: 129,
    tags: ["jacket", "puffer", "outerwear", "winter", "coat"],
  },
  {
    name: "Patagonia Better Sweater Jacket",
    brand: "Patagonia",
    category: "jackets",
    price: 99,
    tags: ["jacket", "fleece", "outerwear", "lightweight", "casual"],
  },
  {
    name: "Columbia Winter Parka Coat",
    brand: "Columbia",
    category: "coats",
    price: 145,
    tags: ["coat", "parka", "winter", "outerwear", "warm"],
  },
  {
    name: "London Fog Wool Blend Coat",
    brand: "London Fog",
    category: "coats",
    price: 118,
    tags: ["coat", "wool", "dress coat", "outerwear", "formal"],
  },
  {
    name: "14K Gold Rope Chain",
    brand: "Golden Luxe",
    category: "jewelry",
    price: 210,
    tags: ["jewelry", "chain", "necklace", "gold", "accessories"],
  },
  {
    name: "Sterling Silver Cuban Link Chain",
    brand: "Urban Shine",
    category: "jewelry",
    price: 95,
    tags: ["jewelry", "chain", "necklace", "silver", "cuban link"],
  },
  {
    name: "Tiffany Style Heart Pendant Necklace",
    brand: "Blue Box Co.",
    category: "jewelry",
    price: 88,
    tags: ["jewelry", "necklace", "pendant", "gift", "silver"],
  },
  {
    name: "Jordan 4 Retro Black / White",
    brand: "Jordan",
    category: "shoes",
    price: 265,
    tags: ["jordan", "air jordan", "shoes", "sneakers", "basketball", "court", "gym"],
  },
  {
    name: "Nike Journey Run",
    brand: "Nike",
    category: "shoes",
    price: 110,
    tags: ["nike", "shoes", "sneakers", "running", "casual", "trainer"],
  },
  {
    name: "Adidas Ultraboost",
    brand: "Adidas",
    category: "shoes",
    price: 169,
    tags: ["adidas", "shoes", "sneakers", "running", "trainer", "comfort"],
  },
  {
    name: "On Cloudrunner",
    brand: "On",
    category: "shoes",
    price: 150,
    tags: ["on", "shoes", "running", "trainer", "comfort", "performance"],
  },
  {
    name: "Jordan Courtside 23",
    brand: "Jordan",
    category: "shoes",
    price: 140,
    tags: ["jordans", "basketball sneakers", "air jordan", "court", "gym"],
  },
  {
    name: "Running Sneakers",
    brand: "Nike",
    category: "shoes",
    price: 140,
    tags: ["running shoes", "sneakers", "athletic shoes", "nike shoes", "running", "trainer"],
  },
  {
    name: "Basketball Shoes",
    brand: "Jordan",
    category: "shoes",
    price: 220,
    tags: ["jordans", "basketball sneakers", "air jordan", "basketball", "court", "gym"],
  },
  {
    name: "Gaming Console",
    brand: "Sony",
    category: "electronics",
    price: 499,
    tags: ["playstation", "gaming system", "console", "new", "used", "refurbished"],
  },
  {
    name: "Wireless Earbuds",
    brand: "Apple",
    category: "electronics",
    price: 179,
    tags: ["airpods", "bluetooth earbuds", "wireless headphones", "new", "refurbished"],
  },
  {
    name: "Beats Studio Buds",
    brand: "Beats",
    category: "electronics",
    price: 99,
    tags: ["earbuds", "wireless earbuds", "audio", "music", "beats"],
  },
  {
    name: "Bose QuietComfort Headphones",
    brand: "Bose",
    category: "electronics",
    price: 199,
    tags: ["headphones", "noise cancelling", "audio", "music", "wireless"],
  },
  {
    name: "Laptop",
    brand: "Dell",
    category: "electronics",
    price: 899,
    tags: ["computer", "laptop", "notebook", "new", "used", "refurbished"],
  },
  {
    name: "Smartphone",
    brand: "Apple",
    category: "electronics",
    price: 799,
    tags: ["iphone", "mobile phone", "smartphone", "new", "used", "refurbished"],
  },
  {
    name: "Smartwatch",
    brand: "Samsung",
    category: "electronics",
    price: 249,
    tags: ["fitness tracker", "smart watch", "wearable", "new", "refurbished"],
  },
  {
    name: "DSLR Camera",
    brand: "Canon",
    category: "electronics",
    price: 999,
    tags: ["camera", "dslr", "photography", "new", "used"],
  },
  {
    name: "Coffee Maker",
    brand: "Keurig",
    category: "home appliances",
    price: 129,
    tags: ["coffee machine", "espresso maker", "keurig", "new", "used"],
  },
  {
    name: "Car Dash Camera",
    brand: "Garmin",
    category: "automotive",
    price: 199,
    tags: ["dash cam", "car camera", "driving recorder", "new", "refurbished"],
  },
  {
    name: "Power Drill",
    brand: "DeWalt",
    category: "hardware",
    price: 149,
    tags: ["power drill", "tool set", "electric drill", "new", "used"],
  },
  {
    name: "Computer Monitor",
    brand: "LG",
    category: "office equipment",
    price: 279,
    tags: ["monitor", "display", "screen", "new", "refurbished"],
  },
  {
    name: "Vintage Baseball Cards",
    brand: "Topps",
    category: "collectibles",
    price: 120,
    tags: ["sports cards", "baseball cards", "collectible cards", "used", "graded"],
  },
  {
    name: "Gardening Tool Set",
    brand: "Fiskars",
    category: "outdoor",
    price: 59,
    tags: ["garden tools", "plant tools", "gardening set", "new"],
  },
  {
    name: "DeWalt Garden Hand Tool Kit",
    brand: "DeWalt",
    category: "outdoor",
    price: 47,
    tags: ["gardening tools", "garden tools", "yard", "outdoor", "tool kit"],
  },
  {
    name: "Miracle-Gro Pruning Shears Set",
    brand: "Miracle-Gro",
    category: "outdoor",
    price: 24,
    tags: ["gardening", "pruning", "garden tools", "plants", "yard"],
  },
  {
    name: "Rare Vintage Books",
    brand: "Penguin Classics",
    category: "books",
    price: 85,
    tags: ["rare books", "collectible books", "vintage books", "used", "collectible"],
  },
];

const categoryKeywords = {
  laptops: ["laptop", "computer", "macbook", "notebook", "pc"],
  watches: ["watch", "watches", "timepiece"],
  sports: ["football", "soccer", "basketball", "sports", "ball", "athletic"],
  electronics: ["headphones", "earbuds", "speaker", "electronics", "audio"],
  phones: ["phone", "iphone", "android", "smartphone", "galaxy", "pixel", "cellphone"],
  gaming: ["gaming", "controller", "console", "playstation", "nintendo", "xbox"],
  toys: ["toy", "toys", "kids", "lego", "gift"],
  home: ["kitchen", "vacuum", "home", "appliance", "cleaning"],
  shoes: ["shoe", "shoes", "sneaker", "sneakers", "jordans", "air jordan", "nike", "running", "gym", "basketball"],
  fashion: ["jeans", "pants", "baggy", "skinny", "fashion", "clothes", "cargo", "denim"],
  clothing: ["clothing", "shirt", "pants", "jeans", "apparel", "hoodie", "tee", "t-shirt", "sweatshirt"],
  jackets: ["jacket", "jackets", "puffer", "fleece", "outerwear", "bomber"],
  coats: ["coat", "coats", "parka", "overcoat", "winter coat", "dress coat"],
  jewelry: ["jewelry", "chain", "chains", "necklace", "necklaces", "pendant", "cuban link"],
  "home appliances": ["coffee maker", "appliance", "espresso", "keurig", "home appliance"],
  automotive: ["car", "automotive", "dash cam", "driving", "vehicle"],
  hardware: ["drill", "tool", "hardware", "power drill", "electric drill"],
  "office equipment": ["monitor", "display", "screen", "office", "computer monitor"],
  collectibles: ["collectible", "cards", "baseball cards", "sports cards", "graded"],
  outdoor: ["garden", "gardening", "outdoor", "plant", "tools", "yard", "pruning", "garden tools"],
  books: ["book", "books", "rare books", "vintage books", "collectible books"],
};

const styleSynonyms = {
  baggy: ["baggy", "loose", "oversized", "wide"],
  skinny: ["skinny", "slim", "tight", "fitted"],
  sports: ["sports", "athletic", "equipment", "training", "football", "basketball"],
  laptop: ["laptop", "computer", "notebook", "macbook", "chromebook"],
  headphones: ["headphones", "audio", "music", "earphones", "earbuds"],
  phone: ["phone", "iphone", "android", "smartphone", "cellphone", "mobile"],
  jeans: ["jeans", "denim", "pants"],
  shoes: ["shoes", "shoe", "sneakers", "jordans", "footwear", "gym shoes", "basketball shoes"],
  shirts: ["shirt", "shirts", "tee", "t-shirt", "top", "hoodie", "sweatshirt"],
  jackets: ["jacket", "jackets", "puffer", "outerwear", "bomber", "fleece"],
  coats: ["coat", "coats", "parka", "overcoat", "winter coat"],
  jewelry: ["jewelry", "jewellery", "chain", "chains", "necklace", "necklaces", "pendant", "cuban link"],
  earbuds: ["earbuds", "airpods", "buds", "in-ear", "wireless earbuds"],
  running: ["running", "runner", "jogging", "athletic", "marathon", "training"],
  basketball: ["basketball", "court", "hoops", "gym", "jumpman"],
  books: ["books", "book", "novel", "reading"],
  monitor: ["monitor", "display", "screen"],
  tools: ["tools", "drill", "hardware", "equipment", "gardening tools", "garden tools", "yard tools"],
  automotive: ["car", "dash cam", "vehicle", "driving"],
};

const shoeUseCaseKeywords = {
  running: ["running", "runner", "jogging", "marathon", "cardio"],
  basketball: ["basketball", "court", "hoops", "jumpman"],
  gym: ["gym", "training", "workout", "lifting", "exercise", "trainer"],
  casual: ["casual", "daily", "everyday", "lifestyle", "walking"],
};

function getDemoValues() {
  return {
    userId: demoUserId.value.trim() || "guest-demo",
    query: demoQuery.value.trim(),
    category: demoCategory.value.trim(),
    brand: demoBrand.value.trim(),
  };
}

function hasSearchInput(values) {
  return Boolean(values.query || values.category || values.brand);
}

function hasAuditInput(values) {
  return hasSearchInput(values) || Boolean(uploadedFile);
}

function getDisplayQuery(values) {
  if (values.query) {
    return values.query;
  }

  if (values.category) {
    return values.brand
      ? `Show me ${values.brand} ${values.category}`
      : `Show me ${values.category}`;
  }

  if (values.brand) {
    return `Show me ${values.brand} items`;
  }

  if (uploadedFile) {
    return "Analyze uploaded evidence";
  }

  return "";
}

function loadJson(key, fallback) {
  const saved = window.localStorage.getItem(key);
  if (!saved) {
    return fallback;
  }
  try {
    return JSON.parse(saved);
  } catch {
    return fallback;
  }
}

function loadSearchHistory() {
  return loadJson(SEARCH_HISTORY_KEY, []);
}

function saveSearchHistory() {
  window.localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searchHistory));
}

function saveUserProfiles() {
  window.localStorage.setItem(USER_PROFILES_KEY, JSON.stringify(userProfiles));
}

function saveSearchLogs() {
  window.localStorage.setItem(SEARCH_LOGS_KEY, JSON.stringify(searchLogs));
}

function getUserProfile(userId) {
  if (!userProfiles[userId]) {
    userProfiles[userId] = {
      name: userId,
      search_history: [],
      favorite_category: null,
      preferred_brand: null,
      budget: null,
    };
    saveUserProfiles();
  }

  return userProfiles[userId];
}

function renderSearchHistory() {
  if (!searchHistoryList) {
    return;
  }

  searchHistoryList.innerHTML = "";

  if (searchHistory.length === 0) {
    const empty = document.createElement("div");
    empty.className = "history-item";
    empty.textContent = "No recent searches yet.";
    searchHistoryList.appendChild(empty);
    return;
  }

  searchHistory.slice(0, 4).forEach((item) => {
    const row = document.createElement("div");
    row.className = "history-item";
    row.textContent = `${item.query} -> ${item.category}`;
    searchHistoryList.appendChild(row);
  });
}

function setStatus(text) {
  analysisStatus.textContent = text;
}

function appendChatMessage(role, text) {
  const bubble = document.createElement("article");
  bubble.className = `chat-bubble ${role}`;
  bubble.textContent = text;
  chatTranscript.appendChild(bubble);
  chatTranscript.scrollTop = chatTranscript.scrollHeight;
}

function appendAgentMessage(role, text) {
  const bubble = document.createElement("article");
  bubble.className = `chat-bubble ${role}`;
  bubble.textContent = text;
  agentTranscript.appendChild(bubble);
  agentTranscript.scrollTop = agentTranscript.scrollHeight;
}

function openAgentPanel() {
  if (agentStatusCopy) {
    agentStatusCopy.classList.remove("hidden");
    agentStatusCopy.textContent =
      "Human agent access is open. Use the support chat below to get live guided help.";
  }
  if (agentButton) {
    agentButton.textContent = "Human Agent Open";
  }
  if (agentPanel) {
    agentPanel.classList.remove("hidden");
  }
}

function renderResults(items) {
  resultsCount.textContent = `${items.length} results`;
  demoResults.innerHTML = "";

  if (items.length === 0) {
    const empty = document.createElement("article");
    empty.className = "result-item";
    empty.innerHTML = "<strong>No products yet</strong><p>Recommendations will appear here after a product-focused question.</p>";
    demoResults.appendChild(empty);
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "result-item";
    card.innerHTML = `<strong>${item.title}</strong><p>${item.body}</p>`;
    demoResults.appendChild(card);
  });
}

function renderAudit(audit) {
  appendChatMessage("assistant", audit.reply);
  insightNeed.textContent = audit.favoriteCategory;
  insightFit.textContent = audit.preferredBrand;
  insightOutcome.textContent = audit.budgetMemory;
  renderResults(audit.results);
}

function extractBudget(message) {
  const dollarMatch = message.match(/\$(\d+(?:\.\d{1,2})?)/);
  if (dollarMatch) {
    return Number(dollarMatch[1]);
  }

  const phraseMatch = message.match(
    /\b(?:budget|under|below|less than|only have|have|with|for)\s+\$?(\d+(?:\.\d{1,2})?)\b/i
  );
  if (phraseMatch) {
    return Number(phraseMatch[1]);
  }

  const standaloneNumber = message.match(/\b(\d{2,5})(?:\s*dollars?)?\b/i);
  if (
    standaloneNumber &&
    /\b(budget|under|below|less than|only have|have|with|for)\b/i.test(message)
  ) {
    return Number(standaloneNumber[1]);
  }

  return null;
}

function formatBudgetSignal(currentBudget) {
  return currentBudget ? `$${currentBudget}` : "No budget provided in this request";
}

function expandTerms(query) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const expanded = new Set(words);

  Object.entries(styleSynonyms).forEach(([key, synonyms]) => {
    words.forEach((word) => {
      if (synonyms.includes(word)) {
        expanded.add(key);
        synonyms.forEach((term) => expanded.add(term));
      }
    });
  });

  return Array.from(expanded);
}

function detectRequestedCategory(message, category) {
  const text = `${message} ${category}`.toLowerCase();
  const expandedTerms = expandTerms(text);
  const rankedMatches = Object.entries(categoryKeywords)
    .map(([name, keywords]) => ({
      name,
      score: keywords.reduce(
        (total, keyword) =>
          total + (text.includes(keyword) || expandedTerms.includes(keyword) ? 1 : 0),
        0
      ),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  if (rankedMatches.length > 0) {
    return rankedMatches[0].name;
  }

  const trimmed = category.trim().toLowerCase();
  return trimmed || null;
}

function detectShoeUseCase(message, category) {
  const text = `${message} ${category}`.toLowerCase();
  const rankedMatches = Object.entries(shoeUseCaseKeywords)
    .map(([name, keywords]) => ({
      name,
      score: keywords.reduce(
        (total, keyword) => total + (text.includes(keyword) ? 1 : 0),
        0
      ),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  return rankedMatches.length > 0 ? rankedMatches[0].name : null;
}

function isPreferredBrandRelevant(preferredBrand, recommended, message, category) {
  if (!preferredBrand) {
    return false;
  }

  const text = `${message} ${category}`.toLowerCase();
  const normalizedBrand = preferredBrand.toLowerCase();

  if (text.includes(normalizedBrand)) {
    return true;
  }

  return recommended.some((item) => item.brand.toLowerCase() === normalizedBrand);
}

function normalizeBrandName(brand) {
  if (!brand) {
    return "";
  }

  return brand
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function updatePreferences(profile, message, category, brand = "") {
  const text = `${message} ${category} ${brand}`.toLowerCase();
  const knownBrands = [
    "apple",
    "macbook",
    "lenovo",
    "dell",
    "asus",
    "samsung",
    "seiko",
    "wilson",
    "nike",
    "adidas",
    "spalding",
    "sony",
    "nintendo",
    "lego",
    "dyson",
    "kitchenaid",
    "acer",
    "hp",
    "jordan",
    "new balance",
    "hot wheels",
    "bose",
    "beats",
    "carhartt",
    "patagonia",
    "columbia",
    "the north face",
    "dewalt",
    "miracle-gro",
  ];

  knownBrands.forEach((brand) => {
    if (text.includes(brand)) {
      profile.preferred_brand =
        brand === "macbook" ? "Apple" : normalizeBrandName(brand);
    }
  });

  if (brand.trim()) {
    profile.preferred_brand = normalizeBrandName(brand.trim());
  }

  Object.entries(categoryKeywords).forEach(([categoryName, keywords]) => {
    if (keywords.some((keyword) => text.includes(keyword))) {
      profile.favorite_category = categoryName;
    }
  });

  const budget = extractBudget(message);
  if (budget) {
    profile.budget = budget;
  }
}

function searchKnowledge(message) {
  const text = message.toLowerCase();
  const expandedTerms = expandTerms(text);
  let bestMatch = null;
  let bestScore = 0;

  knowledgeBase.forEach((item) => {
    let score = 0;
    item.keywords.forEach((keyword) => {
      if (text.includes(keyword) || expandedTerms.includes(keyword)) {
        score += 2;
      }
    });
    if (text.includes(item.topic.toLowerCase())) {
      score += 3;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  });

  return bestScore > 0 ? bestMatch.response : null;
}

function recommendProducts(profile, message, category, brand = "") {
  const text = `${message} ${category} ${brand}`.toLowerCase();
  const expandedTerms = expandTerms(text);
  const budget = extractBudget(message);
  const favoriteCategory = profile.favorite_category;
  const explicitBrand = normalizeBrandName(brand.trim());
  const preferredBrand = explicitBrand || profile.preferred_brand;
  const requestedCategory = detectRequestedCategory(message, category);
  const shoeUseCase =
    requestedCategory === "shoes" ? detectShoeUseCase(message, category) : null;

  const scored = products
    .map((product) => {
      if (requestedCategory && product.category !== requestedCategory) {
        return { score: -1, product };
      }

      if (explicitBrand && product.brand.toLowerCase() !== explicitBrand.toLowerCase()) {
        return { score: -1, product };
      }

      if (budget && product.price > budget) {
        return { score: -1, product };
      }

      let score = 0;

      const categoryTerms = categoryKeywords[product.category] || [];
      if (
        text.includes(product.category.toLowerCase().replace(/s$/, "")) ||
        text.includes(product.category.toLowerCase()) ||
        categoryTerms.some((term) => text.includes(term) || expandedTerms.includes(term))
      ) {
        score += 6;
      }

      if (requestedCategory && product.category === requestedCategory) {
        score += 8;
      }

      if (favoriteCategory && product.category.toLowerCase() === favoriteCategory) {
        score += requestedCategory && favoriteCategory !== requestedCategory ? 1 : 2;
      }

      if (
        text.includes(product.brand.toLowerCase()) ||
        expandedTerms.includes(product.brand.toLowerCase()) ||
        (product.brand === "Apple" && text.includes("macbook")) ||
        (product.brand === "Jordan" && (text.includes("air jordan") || text.includes("jordans"))) ||
        (product.brand === "Levi's" && expandedTerms.includes("jeans"))
      ) {
        score += 6;
      }

      if (preferredBrand && product.brand.toLowerCase() === preferredBrand.toLowerCase()) {
        score += explicitBrand ? 8 : 2;
      }

      product.tags.forEach((tag) => {
        if (text.includes(tag.toLowerCase()) || expandedTerms.includes(tag.toLowerCase())) {
          score += 2;
        }
      });

      if (shoeUseCase && product.category === "shoes") {
        if (
          shoeUseCase === "basketball" &&
          (product.tags.includes("basketball") || product.tags.includes("court"))
        ) {
          score += 6;
        }

        if (
          shoeUseCase === "running" &&
          (product.tags.includes("running") || product.tags.includes("trainer"))
        ) {
          score += 6;
        }

        if (
          shoeUseCase === "gym" &&
          (product.tags.includes("gym") ||
            product.tags.includes("trainer") ||
            product.tags.includes("court"))
        ) {
          score += 5;
        }

        if (
          shoeUseCase === "casual" &&
          (product.tags.includes("casual") || product.tags.includes("lifestyle"))
        ) {
          score += 5;
        }
      }

      if (text.includes("son") || text.includes("daughter") || text.includes("kids") || text.includes("child")) {
        if (product.tags.includes("kids") || product.tags.includes("youth")) {
          score += 2;
        }
      }

      if (budget && product.price <= budget) {
        score += 4;
      }

      return { score, product };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => a.score === b.score ? a.product.price - b.product.price : b.score - a.score)
    .slice(0, 3);

  return scored.map((item) => item.product);
}

function logSearch(userId, query, responseType) {
  searchLogs.push({
    user_id: userId,
    query,
    response_type: responseType,
  });
  saveSearchLogs();
}

function buildChatbotResponse(values) {
  const profile = getUserProfile(values.userId);
  profile.search_history.push(values.query);
  updatePreferences(profile, values.query, values.category, values.brand);
  saveUserProfiles();
  const requestedCategory = detectRequestedCategory(values.query, values.category);
  const activeBudget = extractBudget(values.query);
  const shoeUseCase =
    requestedCategory === "shoes"
      ? detectShoeUseCase(values.query, values.category)
      : null;

  const knowledgeAnswer = searchKnowledge(values.query);
  if (knowledgeAnswer) {
    logSearch(values.userId, values.query, "knowledge");
    return {
      reply: knowledgeAnswer,
      favoriteCategory: profile.favorite_category || "Not learned yet",
      preferredBrand: profile.preferred_brand || "Not learned yet",
      budgetMemory: formatBudgetSignal(activeBudget),
      results: [],
    };
  }

  const recommended = recommendProducts(
    profile,
    values.query,
    values.category,
    values.brand
  );
  if (recommended.length > 0) {
    logSearch(values.userId, values.query, "recommendation");
    return {
      reply:
        recommended.length > 0
          ? `Here are some products you may like${
              shoeUseCase ? ` for ${shoeUseCase}` : ""
            }${
              isPreferredBrandRelevant(
                profile.preferred_brand,
                recommended,
                values.query,
                values.category
              )
                ? ` based on your interest in ${profile.preferred_brand}`
                : ""
            }${values.brand ? ` filtered to ${normalizeBrandName(values.brand)}` : ""}:`
          : "I found some options for you.",
      favoriteCategory: profile.favorite_category || "Not learned yet",
      preferredBrand: profile.preferred_brand || "Not learned yet",
      budgetMemory: formatBudgetSignal(activeBudget),
      results: recommended.map((item) => ({
        title: item.name,
        body: `Brand: ${item.brand} | Category: ${item.category} | $${item.price} | Best for: ${
          item.tags.includes("basketball") || item.tags.includes("court")
            ? "basketball / gym"
            : item.tags.includes("running") || item.tags.includes("trainer")
              ? "running / training"
              : "general use"
        }`,
      })),
    };
  }

  logSearch(values.userId, values.query, "fallback");
  return {
    reply:
      requestedCategory
        ? `I could not find a strong match in ${requestedCategory}${activeBudget ? ` within a budget of $${activeBudget}` : ""}. Try increasing the budget, changing the category, or asking about a different product.`
        : "I could not find a strong match. Try asking about products, shipping, returns, or recommendations.",
    favoriteCategory: profile.favorite_category || "Not learned yet",
    preferredBrand: profile.preferred_brand || "Not learned yet",
    budgetMemory: formatBudgetSignal(activeBudget),
    results: [],
  };
}

function buildHumanAgentResponse(values) {
  const profile = getUserProfile(values.userId);
  profile.search_history.push(values.query);
  updatePreferences(profile, values.query, values.category, values.brand);
  saveUserProfiles();

  const requestedCategory = detectRequestedCategory(values.query, values.category);
  const activeBudget = extractBudget(values.query);
  const shoeUseCase =
    requestedCategory === "shoes"
      ? detectShoeUseCase(values.query, values.category)
      : null;
  const knowledgeAnswer = searchKnowledge(values.query);
  const recommended = recommendProducts(profile, values.query, values.category, values.brand);

  if (knowledgeAnswer) {
    logSearch(values.userId, values.query, "human-agent-knowledge");
    return {
      reply: `I can help with that. ${knowledgeAnswer} If you want, I can also help narrow down the right item before you buy.`,
      favoriteCategory: profile.favorite_category || "Not learned yet",
      preferredBrand: profile.preferred_brand || "Not learned yet",
      budgetMemory: formatBudgetSignal(activeBudget),
      results: [],
    };
  }

  if (recommended.length > 0) {
    logSearch(values.userId, values.query, "human-agent-recommendation");

    let intro = "I can help with that.";
    if (requestedCategory) {
      intro += ` You are shopping for ${requestedCategory}`;
      if (shoeUseCase) {
        intro += ` with a ${shoeUseCase} focus`;
      }
      if (activeBudget) {
        intro += ` and a budget around $${activeBudget}`;
      }
      intro += ".";
    }
    if (values.brand.trim()) {
      intro += ` I narrowed this to ${normalizeBrandName(values.brand.trim())} options first.`;
    }

    let personalization = "";
    if (
      isPreferredBrandRelevant(
        profile.preferred_brand,
        recommended,
        values.query,
        values.category
      )
    ) {
      personalization = ` I also kept your interest in ${profile.preferred_brand} in mind.`;
    }

    return {
      reply: `${intro}${personalization} These are the options I would walk you through first:`,
      favoriteCategory: profile.favorite_category || "Not learned yet",
      preferredBrand: profile.preferred_brand || "Not learned yet",
      budgetMemory: formatBudgetSignal(activeBudget),
      results: recommended.map((item) => ({
        title: item.name,
        body: `Brand: ${item.brand} | Category: ${item.category} | $${item.price} | Agent note: ${
          item.tags.includes("basketball") || item.tags.includes("court")
            ? "strong for basketball and gym use"
            : item.tags.includes("running") || item.tags.includes("trainer")
              ? "better for running and training"
              : "good general-purpose fit"
        }`,
      })),
    };
  }

  logSearch(values.userId, values.query, "human-agent-fallback");
  return {
    reply: requestedCategory
      ? `I am not seeing a strong ${requestedCategory} match${activeBudget ? ` under $${activeBudget}` : ""} right now. If you want, try raising the budget a little, or I can help you pivot to the closest alternative that still fits your needs.`
      : "I can help, but I need a little more detail. Tell me the item you want, your budget, or the brand you prefer, and I will narrow it down for you.",
    favoriteCategory: profile.favorite_category || "Not learned yet",
    preferredBrand: profile.preferred_brand || "Not learned yet",
    budgetMemory: formatBudgetSignal(activeBudget),
    results: [],
  };
}

function buildUploadOnlyAudit(values) {
  const profile = getUserProfile(values.userId);
  return {
    reply:
      "I received the uploaded evidence and started the audit. Add a category, brand, or budget if you want more targeted recommendations, or upload another result to compare visibility and trust issues.",
    favoriteCategory: profile.favorite_category || "Not learned yet",
    preferredBrand: profile.preferred_brand || "Not learned yet",
    budgetMemory: "No budget provided in this request",
    results: [],
  };
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function requestAudit(values) {
  if (window.location.protocol === "file:") {
    throw new Error("Local file mode does not support /api requests");
  }

  const payload = {
    userId: values.userId,
    query: values.query,
    category: values.category,
    searchHistory,
    image: uploadedFile ? await fileToDataUrl(uploadedFile) : null,
    filename: uploadedFile ? uploadedFile.name : null,
  };

  const response = await fetch("/api/audit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }

  return response.json();
}

async function runDemo() {
  const values = getDemoValues();
  if (!hasAuditInput(values)) {
    setStatus("Needs input");
    appendChatMessage(
      "assistant",
      "Please use Step 1 or Step 2 before sending. Upload evidence, enter search details, or do both so I can help you."
    );
    return;
  }

  const displayQuery = getDisplayQuery(values);
  searchHistory = [
    { query: displayQuery, category: values.category || "general" },
    ...searchHistory.filter((item) => item.query !== displayQuery),
  ].slice(0, 6);
  saveSearchHistory();
  renderSearchHistory();

  setStatus("Analyzing");
  systemMode.textContent = "AI mode";
  appendChatMessage("user", displayQuery);

  if (uploadedFile && !hasSearchInput(values)) {
    const audit = buildUploadOnlyAudit(values);
    renderAudit(audit);
    setStatus("Live browser mode");
    systemMode.textContent = "Live browser mode";
    return;
  }

  if (window.location.protocol === "file:") {
    const audit = buildChatbotResponse(values);
    renderAudit(audit);
    setStatus("Live browser mode");
    systemMode.textContent = "Live browser mode";
    return;
  }

  try {
    const audit = await requestAudit(values);
    renderAudit(audit);
    setStatus("Analyzed");
  } catch (error) {
    const audit = buildChatbotResponse(values);
    renderAudit(audit);
    setStatus("Mock mode");
    systemMode.textContent = "Live browser mode";
  }
}

function getAgentValues() {
  return {
    userId: demoUserId.value.trim() || "guest-demo",
    query: agentQuery.value.trim(),
    category: agentCategory.value.trim(),
    brand: agentBrand.value.trim(),
  };
}

function renderAgentAudit(audit) {
  appendAgentMessage("assistant", audit.reply);
  insightNeed.textContent = audit.favoriteCategory;
  insightFit.textContent = audit.preferredBrand;
  insightOutcome.textContent = audit.budgetMemory;
  renderResults(audit.results);
}

function runAgentDemo() {
  const values = getAgentValues();
  if (!hasSearchInput(values)) {
    appendAgentMessage(
      "assistant",
      "Please enter what you need help with, or at least give me a category so I can guide you."
    );
    return;
  }

  appendAgentMessage("user", getDisplayQuery(values));
  const audit = buildHumanAgentResponse(values);
  renderAgentAudit(audit);
  if (agentStatusCopy) {
    agentStatusCopy.classList.remove("hidden");
    agentStatusCopy.textContent =
      "Human agent conversation is active. Keep asking follow-up questions for guided help.";
  }
  agentQuery.value = "";
  agentBrand.value = "";
}

function updateDemoPreview(file) {
  if (!file) {
    return;
  }

  uploadedFile = file;

  if (demoImageUrl) {
    URL.revokeObjectURL(demoImageUrl);
  }

  demoImageUrl = URL.createObjectURL(file);
  demoPreviewImage.src = demoImageUrl;
  demoPreviewText.textContent = file.name;
  demoImagePreview.classList.add("has-image");
}

function resetDemoPreview() {
  uploadedFile = null;

  if (demoImageUrl) {
    URL.revokeObjectURL(demoImageUrl);
    demoImageUrl = "";
  }

  demoImageUpload.value = "";
  demoPreviewImage.removeAttribute("src");
  demoPreviewText.textContent = "No audit evidence selected";
  demoImagePreview.classList.remove("has-image");
}

demoImageUpload.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (file) {
    updateDemoPreview(file);
  }
});

demoChatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await runDemo();
  demoQuery.value = "";
  demoBrand.value = "";
  resetDemoPreview();
});

agentButton.addEventListener("click", () => {
  openAgentPanel();
});

agentCloseButton.addEventListener("click", () => {
  if (agentPanel) {
    agentPanel.classList.add("hidden");
  }
  if (agentStatusCopy) {
    agentStatusCopy.classList.add("hidden");
  }
  if (agentButton) {
    agentButton.textContent = "Human Agent";
  }
});

agentChatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  runAgentDemo();
});

renderSearchHistory();
renderResults([]);
