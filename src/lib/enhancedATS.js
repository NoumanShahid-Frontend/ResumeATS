// Enhanced ATS analysis with detailed recommendations
export function generateDetailedATSAnalysis(resumeText, jobDescription) {
  const basic = calculateBasicScore(resumeText, jobDescription);
  const formatting = analyzeFormatting(resumeText);
  const sections = analyzeSections(resumeText);
  const actionVerbs = analyzeActionVerbs(resumeText);
  
  return {
    ...basic,
    formatting,
    sections,
    actionVerbs,
    recommendations: generateRecommendations(basic, formatting, sections, actionVerbs),
    overallHealth: calculateOverallHealth(basic, formatting, sections, actionVerbs)
  };
}

function calculateBasicScore(resumeText, jobDescription) {
  const resumeWords = extractKeywords(resumeText.toLowerCase());
  const jobWords = extractKeywords(jobDescription.toLowerCase());
  
  const matches = resumeWords.filter(word => jobWords.includes(word));
  const score = Math.min(100, Math.round((matches.length / jobWords.length) * 100));
  
  return {
    score,
    matchedKeywords: matches,
    missingKeywords: jobWords.filter(word => !resumeWords.includes(word)),
    keywordDensity: (matches.length / resumeWords.length) * 100
  };
}

function analyzeFormatting(resumeText) {
  const issues = [];
  const lines = resumeText.split('\n');
  
  if (resumeText.includes('Header') || resumeText.includes('Footer')) {
    issues.push('Remove headers/footers for ATS compatibility');
  }
  
  const bulletPoints = lines.filter(line => line.trim().startsWith('•') || line.trim().startsWith('-')).length;
  if (bulletPoints < 3) {
    issues.push('Add more bullet points to highlight achievements');
  }
  
  return {
    score: Math.max(0, 100 - (issues.length * 20)),
    issues,
    bulletPointCount: bulletPoints
  };
}

function analyzeSections(resumeText) {
  const requiredSections = ['experience', 'education', 'skills'];
  const foundSections = [];
  const missingSections = [];
  
  requiredSections.forEach(section => {
    if (resumeText.toLowerCase().includes(section)) {
      foundSections.push(section);
    } else {
      missingSections.push(section);
    }
  });
  
  return {
    score: (foundSections.length / requiredSections.length) * 100,
    foundSections,
    missingSections
  };
}

function analyzeActionVerbs(resumeText) {
  const strongVerbs = ['achieved', 'managed', 'led', 'developed', 'implemented', 'created', 'improved', 'increased', 'reduced', 'optimized'];
  const weakVerbs = ['responsible for', 'worked on', 'helped with', 'assisted'];
  
  const strongCount = strongVerbs.filter(verb => resumeText.toLowerCase().includes(verb)).length;
  const weakCount = weakVerbs.filter(verb => resumeText.toLowerCase().includes(verb)).length;
  
  return {
    score: Math.min(100, (strongCount / (strongCount + weakCount + 1)) * 100),
    strongVerbs: strongCount,
    weakVerbs: weakCount
  };
}

function generateRecommendations(basic, formatting, sections, actionVerbs) {
  const recommendations = [];
  
  if (basic.score < 70) {
    recommendations.push({
      type: 'keywords',
      priority: 'high',
      title: 'Add Missing Keywords',
      description: `Include ${basic.missingKeywords.slice(0, 5).join(', ')} in your resume`
    });
  }
  
  if (formatting.issues.length > 0) {
    recommendations.push({
      type: 'formatting',
      priority: 'medium',
      title: 'Fix Formatting Issues',
      description: formatting.issues.join('; ')
    });
  }
  
  if (actionVerbs.score < 60) {
    recommendations.push({
      type: 'content',
      priority: 'high',
      title: 'Use Stronger Action Verbs',
      description: 'Replace weak phrases with action verbs like "achieved", "managed", "led"'
    });
  }
  
  return recommendations;
}

function calculateOverallHealth(basic, formatting, sections, actionVerbs) {
  return Math.round((basic.score + formatting.score + sections.score + actionVerbs.score) / 4);
}

function extractKeywords(text) {
  const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
  return text
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !commonWords.includes(word))
    .filter((word, index, arr) => arr.indexOf(word) === index);
}