'use client';

export default function ScoreMeter({ score }) {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="text-center p-6 bg-gray-50 rounded-lg">
      <div className={`text-6xl font-bold ${getScoreColor(score)}`}>
        {score}
      </div>
      <div className="text-lg text-gray-600 mt-2">
        ATS Score ({getScoreLabel(score)})
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
        <div
          className={`h-3 rounded-full ${
            score >= 80 ? 'bg-green-600' : 
            score >= 60 ? 'bg-yellow-600' : 'bg-red-600'
          }`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}