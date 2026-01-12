import React from 'react';

export interface IssueItemProps {
  keyword: string;
  severity?: string;
  voices: string[];
  context?: string;
  related_issues?: string;
  type: 'positive' | 'negative' | 'neutral';
}

export const IssueItem: React.FC<IssueItemProps> = ({
  keyword,
  severity,
  voices,
  context,
  related_issues,
  type,
}) => {
  const getTypeColor = () => {
    switch (type) {
      case 'positive':
        return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' };
      case 'negative':
        return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
      case 'neutral':
        return { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
    }
  };

  const colors = getTypeColor();

  return (
    <div className={`${colors.bg} border ${colors.border} rounded-[12px] p-[20px] mb-[16px]`}>
      <div className="flex items-start justify-between mb-[12px]">
        <h4 className={`text-[16px] font-bold ${colors.text}`}>{keyword}</h4>
        {severity && (
          <span
            className={`px-[12px] py-[4px] rounded-[8px] text-[12px] font-medium ${
              severity === '심각'
                ? 'bg-red-100 text-red-700'
                : severity === '중간'
                ? 'bg-orange-100 text-orange-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {severity}
          </span>
        )}
      </div>

      {context && (
        <p className="text-[14px] text-[#546E7A] mb-[12px] italic">💡 {context}</p>
      )}

      <div className="space-y-[8px] mb-[12px]">
        {voices.map((voice, idx) => (
          <div key={idx} className="flex items-start gap-[8px]">
            <span className="text-[12px] text-gray-400 mt-[2px]">💬</span>
            <p className="text-[14px] text-[#37474F] leading-[1.6] italic">"{voice}"</p>
          </div>
        ))}
      </div>

      {related_issues && (
        <p className="text-[12px] text-[#78909C]">
          🔗 연관 이슈: {related_issues}
        </p>
      )}
    </div>
  );
};

export interface IssueListProps {
  title: string;
  count: number;
  color: string;
  issues: Array<{
    keyword: string;
    severity?: string;
    voices: string[];
    context?: string;
    related_issues?: string;
  }>;
  type: 'positive' | 'negative' | 'neutral';
}

export const IssueList: React.FC<IssueListProps> = ({
  title,
  count,
  color,
  issues,
  type,
}) => {
  if (!issues || issues.length === 0) return null;

  return (
    <div className="bg-white rounded-[16px] shadow-md p-[24px] mb-[20px]">
      <div className="flex items-center justify-between mb-[20px]">
        <h3 className="text-[20px] font-bold" style={{ color }}>
          {title}
        </h3>
        <span
          className="px-[16px] py-[6px] rounded-[20px] text-[14px] font-medium text-white"
          style={{ backgroundColor: color }}
        >
          {count}건
        </span>
      </div>

      <div>
        {issues.map((issue, idx) => (
          <IssueItem key={idx} {...issue} type={type} />
        ))}
      </div>
    </div>
  );
};
