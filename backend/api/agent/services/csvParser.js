const { detectSourceType, DATE_COLUMNS } = require("./financialAnalyzer");

/**
 * Parse CSV content into array of objects
 * @param {string} csvContent - Raw CSV file content
 * @returns {Object} { headers: Array<string>, rows: Array<Array<string>> }
 */
function parseCSV(csvContent) {
  // Normalize line endings (handle Windows CRLF)
  const normalizedContent = csvContent.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  const lines = normalizedContent.trim().split("\n");
  console.log(`[CSV PARSER] Total lines in file: ${lines.length} (including header)`);

  if (lines.length < 2) {
    throw new Error("CSV file is empty or has no data rows");
  }

  // Parse CSV line (handle quoted fields with commas)
  const parseLine = (line) => {
    const result = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Escaped quote
          current += '"';
          i++; // Skip next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === "," && !inQuotes) {
        // End of field
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }

    // Add last field
    result.push(current.trim());
    return result;
  };

  const headers = parseLine(lines[0]);
  console.log(`[CSV PARSER] Header row: ${headers.join(", ")}`);

  const dataLines = lines.slice(1);
  console.log(`[CSV PARSER] Data lines after slice(1): ${dataLines.length}`);

  const rows = dataLines.map(parseLine).filter((row) => row.some((cell) => cell !== ""));
  console.log(`[CSV PARSER] Data rows after filtering empty: ${rows.length}`);

  return { headers, rows };
}

/**
 * Convert parsed CSV to transaction objects
 * @param {Array<string>} headers - CSV column headers
 * @param {Array<Array<string>>} rows - CSV data rows
 * @returns {Array<Object>} Transaction objects with {date, description, amount, source}
 */
function csvToTransactions(headers, rows) {
  // Detect source type
  const sourceType = detectSourceType(headers);
  if (sourceType === "unknown") {
    throw new Error(
      "Unable to detect CSV source type. Please ensure you're uploading a valid CSV from Chase, AFCU, or Amex."
    );
  }

  // Get column mappings
  const dateColumn = DATE_COLUMNS[sourceType];
  const descriptionColumn = getDescriptionColumn(sourceType);
  const amountColumn = "Amount";

  // Find column indices
  const dateIndex = headers.findIndex((h) => h === dateColumn);
  const descIndex = headers.findIndex((h) => h.includes(descriptionColumn));
  const amountIndex = headers.findIndex((h) => h === amountColumn);

  if (dateIndex === -1 || descIndex === -1 || amountIndex === -1) {
    throw new Error(
      `Missing required columns for ${sourceType}. Expected: ${dateColumn}, ${descriptionColumn}, ${amountColumn}`
    );
  }

  // Convert rows to transaction objects
  const transactions = rows
    .map((row) => {
      const dateStr = row[dateIndex];
      const description = row[descIndex];
      const amountStr = row[amountIndex];

      // Skip rows with missing data
      if (!dateStr || !description || !amountStr) {
        return null;
      }

      // Parse amount (remove currency symbols, commas)
      const amount = parseFloat(amountStr.replace(/[$,]/g, ""));
      if (isNaN(amount)) {
        return null;
      }

      // Parse date (MM/DD/YYYY format)
      const date = parseDate(dateStr);
      if (!date) {
        return null;
      }

      // Clean and truncate description (max 255 chars for DB)
      let cleanDescription = description.trim().replace(/\s+/g, " "); // Collapse multiple spaces
      if (cleanDescription.length > 255) {
        cleanDescription = cleanDescription.substring(0, 252) + "...";
      }

      return {
        date: date.toISOString().split("T")[0], // YYYY-MM-DD format
        description: cleanDescription,
        amount,
        source: sourceType,
      };
    })
    .filter((txn) => txn !== null);

  return transactions;
}

/**
 * Get description column name by source type
 * @param {string} sourceType - Source type identifier
 * @returns {string} Description column name
 */
function getDescriptionColumn(sourceType) {
  const mapping = {
    chase_checking: "Description", // Chase uses "Description" column for merchant names
    chase_credit: "Description",
    afcu: "Description",
    amex: "Description",
  };
  return mapping[sourceType] || "Description";
}

/**
 * Parse date string to Date object
 * Handles MM/DD/YYYY and YYYY-MM-DD formats
 * @param {string} dateStr - Date string
 * @returns {Date|null} Date object or null if invalid
 */
function parseDate(dateStr) {
  try {
    // Try MM/DD/YYYY format first (common in US bank CSVs)
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      const month = parseInt(parts[0], 10);
      const day = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);

      if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
        return new Date(year, month - 1, day);
      }
    }

    // Try YYYY-MM-DD format
    const isoDate = new Date(dateStr);
    if (!isNaN(isoDate.getTime())) {
      return isoDate;
    }

    return null;
  } catch (err) {
    return null;
  }
}

/**
 * Get date range from transactions
 * @param {Array<Object>} transactions - Array of transaction objects
 * @returns {Object} { startDate, endDate, monthCount, calculationLog }
 */
function getDateRange(transactions) {
  if (transactions.length === 0) {
    throw new Error("No valid transactions found");
  }

  const dates = transactions.map((txn) => new Date(txn.date)).sort((a, b) => a - b);

  const startDate = dates[0];
  const endDate = dates[dates.length - 1];

  // Calculate days between first and last transaction
  const daysDifference = (endDate - startDate) / (1000 * 60 * 60 * 24);

  // Calculate month count (approximate - 30 days per month)
  const monthCountRaw = daysDifference / 30;
  const monthCount = Math.max(1, Math.round(monthCountRaw));

  const calculationLog = {
    firstTransactionDate: startDate.toISOString().split("T")[0],
    lastTransactionDate: endDate.toISOString().split("T")[0],
    daysBetween: Math.round(daysDifference),
    monthCountFormula: `${Math.round(daysDifference)} days / 30 = ${monthCountRaw.toFixed(2)} → rounded to ${monthCount}`,
    monthCountRaw: monthCountRaw.toFixed(2),
    monthCountUsed: monthCount,
  };

  return {
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
    monthCount,
    calculationLog,
  };
}

module.exports = {
  parseCSV,
  csvToTransactions,
  getDateRange,
};
