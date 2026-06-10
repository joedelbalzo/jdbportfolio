// Pure merge of per-file analyses for the combined view.
// Approximation: monthly averages are summed across files and monthCount comes from
// the first file, so files covering different date ranges skew the combined average.
export default function mergeAnalyses(selectedUploads) {
  if (selectedUploads.length === 1) {
    return selectedUploads[0].analysis;
  }

  const mergedBuckets = {};
  let totalMonthlyAverage = 0;
  let totalTransactions = 0;
  let categorizedCount = 0;
  let uncategorizedCount = 0;
  let excludedCount = 0;

  selectedUploads.forEach((upload) => {
    const analysis = upload.analysis;
    totalMonthlyAverage += analysis.totalMonthlyAverage;
    totalTransactions += analysis.totalTransactions;
    categorizedCount += analysis.categorizedCount;
    uncategorizedCount += analysis.uncategorizedCount;
    excludedCount += analysis.excludedCount;

    Object.entries(analysis.buckets).forEach(([bucket, data]) => {
      if (!mergedBuckets[bucket]) {
        mergedBuckets[bucket] = { total: 0, categories: [] };
      }
      mergedBuckets[bucket].total += data.total;

      data.categories.forEach((cat) => {
        const existing = mergedBuckets[bucket].categories.find((c) => c.category === cat.category);
        if (existing) {
          existing.monthlyAverage += cat.monthlyAverage;
          existing.transactionCount += cat.transactionCount;
        } else {
          mergedBuckets[bucket].categories.push({ ...cat });
        }
      });
    });
  });

  return {
    dateRange: `Combined: ${selectedUploads.length} files (approximate)`,
    monthCount: selectedUploads[0].analysis.monthCount,
    totalTransactions,
    categorizedCount,
    uncategorizedCount,
    excludedCount,
    totalMonthlyAverage: Number(totalMonthlyAverage.toFixed(2)),
    buckets: mergedBuckets,
    aiSuggestions: [],
    uncategorized: [],
    excludedSample: [],
  };
}
