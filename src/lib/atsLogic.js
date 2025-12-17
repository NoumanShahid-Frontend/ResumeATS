// Server-side ATS scoring logic
export function calculateATSScore(resumeText, jobDescription) {
  const resumeWords = extractKeywords(resumeText.toLowerCase());
  const jobWords = extractKeywords(jobDescription.toLowerCase());
  
  const matches = resumeWords.filter(word => jobWords.includes(word));
  const score = Math.min(100, Math.round((matches.length / jobWords.length) * 100));
  
  return {
    score,
    matchedKeywords: matches,
    missingKeywords: jobWords.filter(word => !resumeWords.includes(word)),
    totalJobKeywords: jobWords.length,
    resumeKeywords: resumeWords.length
  };
}

function extractKeywords(text) {
  const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'a', 'an'];
  
  return text
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !commonWords.includes(word))
    .filter((word, index, arr) => arr.indexOf(word) === index);
}