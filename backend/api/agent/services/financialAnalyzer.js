/**
 * Financial Analysis Algorithm
 *
 * This service analyzes credit card transaction data from uploaded CSV files
 * and provides spending insights, categorization, and trends.
 *
 * Budget Categorization Algorithm
 * ================================
 * For use with financial transaction data from:
 * - Chase Checking (CSV) - negative amounts = charges
 * - Chase Credit Card (CSV) - negative amounts = charges
 * - AFCU Credit Card (CSV) - negative amounts = charges
 * - Amex Cards (CSV) - POSITIVE amounts = charges (sign flip required)
 *
 * Key Notes:
 * - All amounts should be normalized to NEGATIVE = expense before categorization
 * - After categorization, take absolute value for display
 * - Venmo payments are categorized by amount: >$1000 = summer camp, ≤$500 = restaurant splits
 * - Some Zelle payments (Tim Plumber, McKinney) are home repairs, not transfers
 */

// =============================================================================
// SIGN CONVENTIONS BY SOURCE
// =============================================================================
const SIGN_CONVENTIONS = {
  chase_checking: "negative_is_expense",
  chase_credit: "negative_is_expense",
  afcu: "negative_is_expense",
  amex: "positive_is_expense", // FLIP SIGN: multiply by -1
};

// =============================================================================
// PATTERNS TO EXCLUDE (internal transfers, not real expenses)
// =============================================================================
const EXCLUDE_PATTERNS = [
  "THANK YOU",
  "AUTOPAY",
  "REWARD",
  "REFUND",
  "ADJUSTMENT",
  "ZELLE", // Most Zelle are transfers (except specific contractors)
  "TRANSFER RECD",
  "VENMO.*PAYMENT", // Handled separately by amount
  "AMERICAN EXPRESS.*PMT",
  "ACTORS FCU.*WEBPMT",
  "ONLINE PAYMENT", // Except car payments
  "ONLINE TRANSFER",
  "MOBILE PAYMENT",
];

// Exceptions to exclusions (these match exclude patterns but ARE real expenses)
const EXCLUDE_EXCEPTIONS = [
  ["Transportation - Car Payment", ["AUTO LEASE", "ALS 7334"]],
  ["Housing - Home Repairs", ["TIM PLUMBER", "MCKINNEY"]],
  ["Kids - Summer Camp", []], // Handled by Venmo amount logic
  ["Dining - Restaurants", []], // Small Venmos are restaurant splits
];

// =============================================================================
// CATEGORIZATION RULES
// =============================================================================
// Format: [category, [list of patterns to match]]
// Patterns are matched against UPPERCASE description

const CATEGORIZATION_RULES = [
  // HOUSING
  ["Housing - Mortgage", ["ROCKET MORTGAGE", "MTG PYMTS"]],
  ["Housing - Electric/Gas (Central Hudson)", ["CENTRAL HUDSON", "CENTRAL/", "WEBRECURRING"]],
  ["Housing - Propane (Paraco)", ["PARACO"]],
  ["Housing - Water Service (Culligan)", ["CULLIGAN"]],
  ["Housing - Internet/Cable (Optimum)", ["OPTIMUM"]],
  ["Housing - Trash (Royal Carting)", ["ROYAL CARTING"]],
  ["Housing - Water System Loan", ["AQUA FINANCE"]],
  ["Housing - Propane Tank Rental", ["AIRGAS"]],
  ["Housing - Lawn Care", ["LAWN DOCTOR"]],
  ["Housing - Cleaning Service", ["HOMEAGLOW", "HOMEAGLO"]],
  ["Housing - Pest Control", ["PESTIE"]],
  ["Housing - Home Repairs", ["TIM PLUMBER", "MCKINNEY"]],
  ["Housing - Home Improvement", ["HOME DEPOT", "HOMEDEPOT", "LOWE'S", "LOWES"]],
  ["Housing - Home Furnishings", ["WAYFAIR"]],
  ["Housing - Water/Sewer (Town)", ["TOWN OF FISHKILL"]],
  ["Housing - Propane (Other)", ["MHFBC", "MIDHUDSONFUEL"]],

  // TRANSPORTATION
  ["Transportation - Car Payment", ["AUTO LEASE", "ALS 7334"]],
  ["Transportation - Auto Insurance", ["PROGRESSIVE", "GEICO"]],
  ["Transportation - Gas", ["SUNOCO", "VALERO", "CITGO", "GULF", "WAWA", "EXXON", "ROYAL FARMS"]],
  ["Transportation - Tolls", ["PASSNY", "E-ZPASS", "EZPASS", "MTA/TBTA", "TOLL"]],
  ["Transportation - Public Transit", ["MTA*", "NYCT", "MNR", "NYC FERRY"]],
  ["Transportation - Rideshare", ["LYFT", "UBER"]],
  ["Transportation - Car Rental", ["ENTERPRISE RENT"]],
  ["Transportation - Car Maintenance", ["FISHKILL TIRE", "AUTO REPAIR"]],
  ["Transportation - Car Wash", ["FOAM & WASH", "CAR WASH", "SUPER WASH"]],
  ["Transportation - Parking", ["PARKMOBILE", "LAZ PARKING", "PMUSA"]],

  // GROCERIES
  [
    "Groceries",
    [
      "SHOPRITE",
      "WEGMANS",
      "TRADER JOE",
      "KEY FOODS",
      "ADAMS FAIRACRE",
      "WAL-MART",
      "WALMART",
      "GIANT ",
      "INSTACART",
      "GROCERIES",
      "WM SUPERCENTER",
      "WM SUPERC",
      "PROSPECT HILL ORCH",
      "BEACON CHEESE",
      "FISHKILL FARMS",
      "SIX DUTCHESS FARM",
      "EDGWICK FARM",
      "KATAGIRI",
      "TARGET",
      "BUTCHERY",
      "BUTCHER",
      "BEACON NATURAL",
      "SAFEWAY",
      "KEY FOOD",
      "MET FRESH",
    ],
  ],
  ["Groceries - Wholesale (Sam's Club)", ["SAM'S CLUB", "SAMSCLUB", "SAMS CLUB", "SAMS SCAN", "RENEWAL MEMBERSHIP"]],

  // DINING
  ["Dining - Delivery", ["DOORDASH", "GRUBHUB", "UBER EATS", "SEAMLESS"]],
  [
    "Dining - Coffee",
    [
      "STARBUCKS",
      "TRAX COFFEE",
      "BIG MOUTH COFFEE",
      "BEACON COFFEE",
      "HOT STUFF COFFEE",
      "RISE UP COFFEE",
      "BANK SQUARE COFFEE",
      "TODDYCAFE",
      "TODDY CAFE",
      "TRAX AT GROVEVILLE",
      "BUTLER BAKESHOP",
      "CULTURE ESPRESSO",
      "CRAFTED KUP",
      "DEVOCION",
      "DRIFTING GROUNDS",
      "DUNKIN",
      "JOE COFFEE",
      "PANERA",
      "FAIRPOUR",
      "BAGEL SHOPPE",
      "CORNER GROUNDS",
      "DEANS COFFEE",
      "CIBO EXPRESS",
    ],
  ],
  [
    "Dining - Fast Food",
    [
      "POPEYES",
      "CHIPOTLE",
      "DELI",
      "FAST FOOD",
      "YANKEE CLIPPER",
      "BETHANY SURF",
      "CHICK FIL",
      "MCDONALD",
      "TACO BELL",
      "CHARLEYS",
      "PHILLY STEAK",
      "EMPIRE BAGEL",
      "SLICE",
      "BIG VINNY",
      "SAL'S BEST",
      "DELAWARE NORTH",
    ],
  ],
  [
    "Dining - Restaurants",
    [
      "RESTAURANT",
      "DINER",
      "BEACON DAILY",
      "LYONSHARE",
      "BEAST",
      "KITCHEN SYNC",
      "ROSSI",
      "I-84 DINER",
      "MELZINGAH",
      "WINE BAR",
      "BREWING",
      "BREWERY",
      "INDUSTRIAL ARTS",
      "SLOOP",
      "PILLOW",
      "HUDSON VALLEY BREWER",
      "2 WAY BREWING",
      "VINYL ROOM",
      "FLORINAS",
      "NOBLE PIES",
      "BRAISED PIES",
      "SOBOL",
      "ANNIES PARAMOUNT",
      "CIA RESTAURANTS",
      "TOWNE CRIER",
      "NORTHEAST SEAFOOD",
      "HAPPY VALLEY",
      "WILD-NEW",
      "PALACE DUMPLINGS",
      "HIDDEN ROSE",
      "TASTING ROOM",
      "WONDER BAR",
      "CARTER",
      "PIGGY BANK",
      "ZIATUN",
      "TNT LOUNGE",
      "MASON'S FAMOUS",
      "WILLOWS FARE",
      "STONES PIZZA",
      "TACO AL DENTE",
      "GROTTO PIZZA",
      "SAVAGE WONDER",
      "SAVAGEWONDER",
      "DROWNED LANDS",
      "OYSTER PARTY",
      "BIG KEVS BBQ",
      "2PROSPORTSCATER",
      "BIERCHEESE",
      "HAKAN CHOCOLATIER",
      "WWW.HUDSON",
      "HUDSONTAC",
      "HUDSON AND PACKAR",
      "DBSFRIES",
      "PERSONAL BEST BREW",
      "THE WILD-NEW",
      "THE WILD NEW",
      "DRAUGHT INDUSTRIES",
      "TOMATO CAFE",
      "KITCHEN AND COFFEE",
      "PEACEFUL PROVISIONS",
      "SCARBOROUGH FARE",
      "MONTAUK CATCH",
      "BAR GREAT HARRY",
      "MIA BROOKLYN",
      "BAR LOUIE",
      "ROOSEVELT BAR",
      "I MORSI",
      "MORSI",
      "VINCENT'S EAT",
      "JACOBS PICKLES",
      "THREE FIFTY",
      "JUICE BOX",
      "BRYANT PK MARKET",
      "BURGER CLUB",
      "BURGER-CLUB",
      "ROAD GRUB",
      "RUSTY RUDDER",
      "BERT'S HIDEOUT",
      "MUNNOS",
      "PIZZA SHOP",
      "CHAMPIONS PIZZA",
      "KITCHEN AT THE",
      "DOGWOOD SOUTH",
    ],
  ],
  ["Dining - Alcohol/Specialty", ["BEER AND SODA", "BEER & SODA", "WINE", "LIQUOR", "SPIRIT"]],
  ["Dining - Stadium Food", ["LEVY", "AMZ*LEVY"]],

  // KIDS
  [
    "Kids - Activities",
    [
      "FUN MAX",
      "MCCANN ICE ARENA",
      "ICE ARENA",
      "LAHEY FAMILY FUN",
      "MICHAELS",
      "KIDZ KASTLE",
      "TREVOR ZOO",
      "SHELL WE BOUNCE",
      "SQ *MCCANN",
      "BEACON SOCCER",
      "SOCCER CLUB",
    ],
  ],

  // SUBSCRIPTIONS
  ["Subscriptions - Spotify", ["SPOTIFY"]],
  ["Subscriptions - Netflix", ["NETFLIX"]],
  ["Subscriptions - FuboTV", ["FUBO"]],
  ["Subscriptions - Sling TV", ["SLING"]],
  ["Subscriptions - Sirius XM", ["SIRIUS", "XM RADIO"]],
  ["Subscriptions - Prime Video", ["PRIME VIDEO"]],
  ["Subscriptions - MLB.TV", ["MLB.TV"]],
  ["Subscriptions - Claude AI", ["CLAUDE.AI", "ANTHROPIC"]],
  ["Subscriptions - ChatGPT", ["OPENAI", "CHATGPT"]],
  ["Subscriptions - NY Times", ["NYTIMES"]],
  ["Subscriptions - Squarespace", ["SQUARESPACE", "SQSP"]],
  ["Subscriptions - Apple", ["APPLE.COM"]],
  ["Subscriptions - Acorns", ["ACORNS SUBSCRIPTION", "SUBSCRIPTION.*ACORNS"]],
  ["Subscriptions - Google One", ["GOOGLE ONE"]],
  ["Subscriptions - Xbox Game Pass", ["XBOX GAME"]],

  // HEALTH
  [
    "Health - Medical/Pharmacy",
    [
      "CPAP",
      "LOFTA",
      "CVS",
      "PHARMACY",
      "MEDICAL",
      "HEALTH",
      "QUEST DIAGNOSTIC",
      "CAREMOUNT",
      "NEWBURGH",
      "NYU PHYSICIAN",
      "BEACON WELLNESS PHARM",
      "RITE AID",
      "ST LUKES",
      "MYCHART",
    ],
  ],
  ["Health - Kids Vitamins", ["HIYA"]],
  ["Health - Wellness", ["ALCHEMY WELLNESS"]],

  // ENTERTAINMENT
  ["Entertainment - Sports Events", ["RENEGADES", "HUDSONVALLEYRENEGADES", "FEVO", "HUDSON VALLEY RENEGA", "UBS ARENA"]],
  ["Entertainment - Movies/Shows", ["FANDANGO", "HOYT GALLERIA", "MOVIE", "THEATRE", "THEATER", "REG GALLERIA", "REGAL"]],
  ["Entertainment - Spa", ["MIRBEAU SPA"]],
  ["Entertainment - Amusement", ["AMUSEMENT", "CIRCUS", "CARNIVAL", "REFAIR", "RENFAIR", "RENAISSANCE"]],
  ["Entertainment - Concerts", ["TED LEO", "EVENTBRITE", "EB *"]],
  ["Entertainment - Performing Arts", ["BEACON PERFORMING"]],
  ["Entertainment - Tickets", ["TICKETMASTER", "HC VENOM"]],
  ["Entertainment - Gaming", ["OOTP", "HUMBLEBUNDLE"]],
  ["Entertainment - Other", ["PHOTOBOOTH"]],

  // SHOPPING
  ["Shopping - Amazon", ["AMAZON", "AMZN"]],
  ["Shopping - Sporting Goods", ["DICK", "SPORTING"]],
  ["Shopping - Clothing", ["DULUTH", "DESTINATION XL", "PATAGONIA"]],
  ["Shopping - Music/Instruments", ["DIVISION STREET GUITAR", "STRING SWING"]],
  ["Shopping - Electronics", ["SONOS"]],
  ["Shopping - Sports Merch", ["ISLES.*SHOP", "FROZEN POND", "TEAMFANSHOP", "FRG*"]],
  ["Shopping - Department Store", ["MACY'S", "MACYS"]],
  ["Shopping - Footwear", ["HOKA", "DECKERS"]],
  ["Shopping - Etsy", ["ETSY"]],
  ["Shopping - Home/Office", ["ACOUSTIMAC"]],
  ["Shopping - Misc", ["SE RETAIL", "WAPPINGER'S FALLS VA", "ZAKKA JOY"]],

  // WORK/PROFESSIONAL
  ["Work - Union Dues", ["IATSE"]],
  ["Work - Office Equipment", ["UPLIFT DESK", "CRANDALL OFFICE", "OFFICE"]],
  ["Work - Education/Training", ["FRONTENDMASTERS", "UDEMY"]],
  ["Professional - Legal", ["GUTTERSON LAW"]],

  // TRAVEL
  ["Travel - Lodging", ["AIRBNB"]],
  ["Travel - Hotels", ["TWA HOTEL", "HILTON", "POUGHKEEPSIE GRAND"]],
  [
    "Travel - Flights",
    ["JETBLUE", "UNITED AIRLINES", "SPIRIT AIR", "FRONTIER", "DELTA", "AMERICAN AIR", "SOUTHWEST"],
  ],
  ["Travel - Train", ["AMTRAK"]],
  ["Travel - Vacation", ["DEWEY BEACH"]],
  ["Travel - Parking", ["TOWN OF BETHANY"]],

  // PERSONAL CARE
  ["Personal Care - Hair", ["HAIR STUDIO", "VAGARO"]],

  // FEES
  ["Fees - Credit Card Interest", ["INTEREST CHARGE", "PURCHASE INTEREST", "FINANCE CHARGE"]],
  ["Bills - DMV", ["DMV"]],
  ["Bills - TSA PreCheck", ["TSA PRECHECK", "CLEAR"]],

  // SAVINGS
  ["Savings - Acorns Round-ups", ["ACORNS ROUND"]],

  // OTHER
  ["Other - Christmas Trees", ["CHRISTMAS TR", "SLATER CHEMICAL"]],
  ["Other - Lottery", ["JACKPOCKET", "JACKPOCKE"]],
  ["Other - Shipping", ["UPS STORE", "USPS"]],
  ["Other - Crypto", ["COINBASE"]],
  ["Other - Donations", ["JSCREEN"]],
  ["Other - Photos", ["MPIX"]],
  ["Other - Ice Cream", ["RON'S ICE CREAM", "FISHKILL CREAMERY"]],
  ["Other - Payment Service", ["EVO EZPAY"]],
  ["Other - Gift/Specialty Food", ["BOARDERIE", "HBV POP-UP", "MARCUS PORK", "TOBIO"]],
  ["Other - ATM Cash", ["ATM WITHDRAW", "NON-CHASE ATM"]],
  ["Other - Flowers", ["LUCILLES FLORIST", "FLORIST"]],
  ["Other - One-time", ["SHAZZA"]],
  ["Other - One-time (Gym)", ["ALL SPORT HEALTH"]],
  ["Other - One-time (Music)", ["MID-HUDSON MUSIC"]],
  ["Other - One-time (Kids Clothes)", ["LITTLE SLEEPIES"]],
  ["Other - Misc", ["INFI KIOSK"]],
];

// =============================================================================
// SPECIAL HANDLING RULES
// =============================================================================

// These patterns should NOT match if certain other patterns are present
const EXCLUSION_OVERRIDES = {
  "Shopping - Amazon": { exclude_if_contains: ["LEVY"] }, // AMZ*LEVY is stadium food
  "Dining - Alcohol/Specialty": { exclude_if_contains: ["BUTCHERY"] }, // Barb's Butchery is groceries
  "Transportation - Gas": { exclude_if_contains: ["PARACO", "AIRGAS"] }, // These are propane, not gas stations
  "Travel - Flights": { exclude_if_contains: ["DEBIT", "2684"] }, // JetBlue refund/debit exclusions
};

// Venmo amount-based categorization
const VENMO_RULES = {
  pattern: /VENMO.*PAYMENT/,
  rules: [
    { amount_gt: 1000, category: "Kids - Summer Camp" },
    { amount_lte: 500, category: "Dining - Restaurants" },
  ],
};

// =============================================================================
// CATEGORY HIERARCHY (for grouping in reports)
// =============================================================================
const CATEGORY_BUCKETS = {
  HOUSING: ["Housing -"],
  TRANSPORTATION: ["Transportation -"],
  GROCERIES: ["Groceries"],
  DINING: ["Dining -"],
  KIDS: ["Kids -"],
  SUBSCRIPTIONS: ["Subscriptions -"],
  HEALTH: ["Health -"],
  ENTERTAINMENT: ["Entertainment -"],
  SHOPPING: ["Shopping -"],
  "WORK/PROFESSIONAL": ["Work -", "Professional -"],
  "PERSONAL CARE": ["Personal Care -"],
  TRAVEL: ["Travel -"],
  FEES: ["Fees -", "Bills -"],
  SAVINGS: ["Savings -"],
  OTHER: ["Other -"],
};

// =============================================================================
// CSV SOURCE DETECTION & PARSING
// =============================================================================
// Date column names by source type
const DATE_COLUMNS = {
  chase_checking: "Posting Date",
  chase_credit: "Transaction Date",
  afcu: "Post Date",
  amex: "Date",
};

/**
 * Detect CSV source type from column headers
 * @param {Array<string>} headers - Array of CSV column headers
 * @returns {string} Source type identifier
 */
function detectSourceType(headers) {
  const headerStr = headers.join(",").toUpperCase();

  if (headerStr.includes("POSTING DATE") && headerStr.includes("DETAILS")) {
    return "chase_checking";
  }
  if (headerStr.includes("TRANSACTION DATE") && headerStr.includes("POST DATE")) {
    return "chase_credit";
  }
  if (headerStr.includes("POST DATE") && headerStr.includes("REFERENCE NUMBER")) {
    return "afcu";
  }
  if (headerStr.includes("APPEARS ON YOUR STATEMENT AS")) {
    return "amex";
  }
  return "unknown";
}

/**
 * Categorize a transaction based on its description
 * @param {string} description - The transaction description string
 * @param {number} amount - Optional amount for Venmo categorization
 * @param {Array} customPatterns - Optional array of custom patterns to check first
 * @returns {string} Category string or 'Uncategorized'
 */
function categorize(description, amount = null, customPatterns = []) {
  const descUpper = String(description).toUpperCase();

  // Check custom patterns first (higher priority)
  if (customPatterns && customPatterns.length > 0) {
    // Sort by priority (descending)
    const sortedCustom = customPatterns
      .filter((p) => p.isActive)
      .sort((a, b) => (b.priority || 100) - (a.priority || 100));

    for (const customPattern of sortedCustom) {
      try {
        const regex = new RegExp(customPattern.pattern, "i");
        if (regex.test(description)) {
          return customPattern.category;
        }
      } catch (err) {
        // Skip invalid regex patterns
        console.error(`Invalid custom pattern: ${customPattern.pattern}`);
      }
    }
  }

  // Check built-in rules
  for (const [category, patterns] of CATEGORIZATION_RULES) {
    // Check for exclusion overrides
    const override = EXCLUSION_OVERRIDES[category] || {};
    const excludePatterns = override.exclude_if_contains || [];

    if (excludePatterns.some((excl) => descUpper.includes(excl))) {
      continue;
    }

    // Check if any pattern matches
    if (patterns.some((pattern) => descUpper.includes(pattern))) {
      return category;
    }
  }

  return "Uncategorized";
}

/**
 * Categorize including Venmo amount-based logic
 * @param {string} description - The transaction description string
 * @param {number} amount - The transaction amount (absolute value)
 * @param {Array} customPatterns - Optional array of custom categorization patterns
 * @returns {string} Category string
 */
function categorizeWithVenmo(description, amount, customPatterns = []) {
  const descUpper = String(description).toUpperCase();

  // Check Venmo first
  if (VENMO_RULES.pattern.test(descUpper)) {
    for (const rule of VENMO_RULES.rules) {
      if (rule.amount_gt && amount > rule.amount_gt) {
        return rule.category;
      }
      if (rule.amount_lte && amount <= rule.amount_lte) {
        return rule.category;
      }
    }
  }

  // Fall back to standard categorization (with custom patterns)
  return categorize(description, amount, customPatterns);
}

/**
 * Determine if a transaction should be excluded (internal transfer, etc.)
 * @param {string} description - The transaction description
 * @param {string} category - The assigned category
 * @returns {boolean} True if should be excluded, False otherwise
 */
function shouldExclude(description, category) {
  const descUpper = String(description).toUpperCase();

  // Check if matches any exclude pattern
  const matchesExclude = EXCLUDE_PATTERNS.some((pattern) => {
    const regex = new RegExp(pattern);
    return regex.test(descUpper);
  });

  if (!matchesExclude) {
    return false;
  }

  // Check for exceptions - if THIS transaction's category is an exception, don't exclude
  for (const [exceptionCategory, exceptionPatterns] of EXCLUDE_EXCEPTIONS) {
    if (category === exceptionCategory) {
      return false; // This category is always kept
    }
    // Also check if description matches exception patterns (e.g., "TIM PLUMBER" in a Zelle)
    if (exceptionPatterns.length > 0 && exceptionPatterns.some((pattern) => descUpper.includes(pattern))) {
      return false;
    }
  }

  return true;
}

/**
 * Get the parent bucket for a category
 * @param {string} category - Category string
 * @returns {string} Bucket name
 */
function getBucket(category) {
  for (const [bucket, prefixes] of Object.entries(CATEGORY_BUCKETS)) {
    if (prefixes.some((prefix) => category.startsWith(prefix))) {
      return bucket;
    }
  }
  return "OTHER";
}

/**
 * Normalize transaction amount based on source type
 * @param {number} amount - Raw transaction amount
 * @param {string} sourceType - Source type (chase_checking, chase_credit, afcu, amex)
 * @returns {number} Normalized amount (negative = expense)
 */
function normalizeAmount(amount, sourceType) {
  const convention = SIGN_CONVENTIONS[sourceType];
  if (convention === "positive_is_expense") {
    return amount * -1; // Flip sign for Amex
  }
  return amount; // Already negative for expenses
}

/**
 * Process transactions from parsed CSV data
 * @param {Array} transactions - Array of transaction objects [{date, description, amount, source}]
 * @param {Array} customPatterns - Optional array of custom categorization patterns
 * @returns {Object} Categorized and analyzed transaction data
 */
function processTransactions(transactions, customPatterns = []) {
  const categorizedTransactions = [];
  const uncategorized = [];
  const excluded = [];

  for (const txn of transactions) {
    // Normalize amount
    const normalizedAmount = normalizeAmount(txn.amount, txn.source);
    const absAmount = Math.abs(normalizedAmount);

    // CRITICAL: Only process EXPENSES (negative normalized amounts)
    // Positive normalized amounts are credits/refunds, not expenses
    if (normalizedAmount >= 0) {
      excluded.push({
        date: txn.date,
        description: txn.description,
        amount: txn.amount,
        normalizedAmount,
        absAmount,
        reason: "Credit/refund (positive normalized amount, not an expense)",
      });
      continue;
    }

    // Categorize (with custom patterns)
    const category = categorizeWithVenmo(txn.description, absAmount, customPatterns);

    // Check if should be excluded
    const isExcluded = shouldExclude(txn.description, category);

    if (isExcluded) {
      // Track WHY it was excluded
      const excludeReason = getExcludeReason(txn.description, category);
      excluded.push({
        date: txn.date,
        description: txn.description,
        amount: txn.amount,
        normalizedAmount,
        absAmount,
        reason: excludeReason,
      });
      continue; // Skip internal transfers
    }

    const categorizedTxn = {
      ...txn,
      normalizedAmount,
      absAmount,
      category,
      bucket: getBucket(category),
    };

    categorizedTransactions.push(categorizedTxn);

    if (category === "Uncategorized") {
      uncategorized.push(categorizedTxn);
    }
  }

  return {
    transactions: categorizedTransactions,
    uncategorized,
    excluded,
  };
}

/**
 * Get the reason why a transaction was excluded
 * @param {string} description - Transaction description
 * @param {string} category - Category
 * @returns {string} Exclusion reason
 */
function getExcludeReason(description, category) {
  const descUpper = String(description).toUpperCase();

  for (const pattern of EXCLUDE_PATTERNS) {
    const regex = new RegExp(pattern);
    if (regex.test(descUpper)) {
      return `Matched exclusion pattern: "${pattern}"`;
    }
  }

  return "Unknown exclusion reason";
}

/**
 * Calculate monthly averages by category and bucket
 * @param {Array} transactions - Categorized transactions
 * @param {number} monthCount - Number of months in dataset
 * @returns {Object} Monthly averages by category and bucket with calculation details
 */
function calculateMonthlyAverages(transactions, monthCount = 12) {
  const categoryTotals = {};
  const bucketTotals = {};

  // Calculate totals
  for (const txn of transactions) {
    // Sum by category
    if (!categoryTotals[txn.category]) {
      categoryTotals[txn.category] = 0;
    }
    categoryTotals[txn.category] += txn.absAmount;

    // Sum by bucket
    if (!bucketTotals[txn.bucket]) {
      bucketTotals[txn.bucket] = 0;
    }
    bucketTotals[txn.bucket] += txn.absAmount;
  }

  // Calculate grand total
  const grandTotal = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);

  // Calculate averages
  const categoryAverages = {};
  for (const [category, total] of Object.entries(categoryTotals)) {
    categoryAverages[category] = total / monthCount;
  }

  const bucketAverages = {};
  for (const [bucket, total] of Object.entries(bucketTotals)) {
    bucketAverages[bucket] = total / monthCount;
  }

  const totalMonthly = grandTotal / monthCount;

  return {
    byCategory: categoryAverages,
    byBucket: bucketAverages,
    totalMonthly,
    calculationDetails: {
      grandTotal,
      monthCount,
      formula: `${grandTotal.toFixed(2)} / ${monthCount} = ${totalMonthly.toFixed(2)}`,
    },
  };
}

module.exports = {
  categorize,
  categorizeWithVenmo,
  shouldExclude,
  getExcludeReason,
  getBucket,
  normalizeAmount,
  processTransactions,
  calculateMonthlyAverages,
  detectSourceType,
  SIGN_CONVENTIONS,
  CATEGORIZATION_RULES,
  CATEGORY_BUCKETS,
  DATE_COLUMNS,
};
