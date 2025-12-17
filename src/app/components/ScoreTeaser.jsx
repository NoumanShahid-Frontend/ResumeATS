'use client';

export default function ScoreTeaser({ score, topIssues }) {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreRing = (score) => {
    if (score >= 80) return 'stroke-green-600';
    if (score >= 60) return 'stroke-yellow-600';
    return 'stroke-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <div className="mb-6">
        <div className="relative w-32 h-32 mx-auto">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - score / 100)}`}
              className={getScoreRing(score)}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-4xl font-bold ${getScoreColor(score)}`}>
              {score}
            </span>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mt-4">ATS Compatibility Score</h2>
      </div>

      <div className="space-y-3 mb-8">
        {topIssues.map((issue, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span className="text-gray-700">{issue}</span>
            <span className="text-gray-400">•••</span>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Want the Full Analysis?</h3>
        <p className="mb-4">Get detailed recommendations, side-by-side comparison, and optimized resume download</p>
        <button className="w-full bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
          Unlock Full Report - $4.99
        </button>
        <p className="text-sm mt-2 opacity-90">Or start 7-day free trial</p>
      </div>
    </div>
  );
}