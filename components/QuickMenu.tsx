import React from 'react';
import { PSYCH_TESTS } from '../constants';
import { Brain, Lightbulb, Palette, Smartphone, ExternalLink, Zap } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'Brain': <Brain size={20} />,
  'Lightbulb': <Lightbulb size={20} />,
  'Palette': <Palette size={20} />,
  'Smartphone': <Smartphone size={20} />,
};

const QuickMenu: React.FC = () => {
  return (
    <div className="bg-[#f0f4f9] dark:bg-[#1e1f20] rounded-xl overflow-hidden h-fit sticky top-4 border border-transparent dark:border-none">
      <div className="bg-[#f0f4f9] dark:bg-[#1e1f20] px-4 py-3 border-b border-gray-200 dark:border-[#444746]">
        <h3 className="font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2 text-sm">
           <Zap size={16} className="text-yellow-500 dark:text-yellow-400 fill-yellow-500/20 dark:fill-yellow-400/20" /> 바로가기
        </h3>
        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 ml-6">추천 심리 검사 모음</p>
      </div>
      <div className="p-2 space-y-1">
        {PSYCH_TESTS.map((test) => (
          <a
            key={test.id}
            href={test.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#e2e7eb] dark:hover:bg-[#333537] transition-colors group"
          >
            <div className="text-gray-500 dark:text-gray-400 group-hover:text-[#0b57d0] dark:group-hover:text-[#a8c7fa] transition-colors shrink-0">
              {iconMap[test.icon]}
            </div>
            {/* Added min-w-0 to prevent text from overflowing the flex container */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white truncate">
                {test.name}
              </div>
              <div className="text-[10px] text-gray-500 truncate">
                {test.description}
              </div>
            </div>
            <ExternalLink size={14} className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuickMenu;