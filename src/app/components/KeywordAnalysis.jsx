'use client';

export default function KeywordAnalysis({ matchedKeywords, missingKeywords }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-semibold text-green-800 mb-3">
          Matched Keywords ({matchedKeywords.length})
        </h3>
        <div className="flex flex-wrap gap-2">
          {matchedKeywords.map((keyword, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-green-200 text-green-800 rounded text-sm"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
      
      <div className="bg-red-50 p-4 rounded-lg">
        <h3 className="font-semibold text-red-800 mb-3">
          Missing Keywords ({missingKeywords.length})
        </h3>
        <div className="flex flex-wrap gap-2">
          {missingKeywords.slice(0, 20).map((keyword, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-red-200 text-red-800 rounded text-sm"
            >
              {keyword}
            </span>
          ))}
        </div>
        {missingKeywords.length > 20 && (
          <p className="text-sm text-red-600 mt-2">
            +{missingKeywords.length - 20} more keywords
          </p>
        )}
      </div>
    </div>
  );
}