import React from 'react';
import { X, HelpCircle, MessageCircle, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1e1f20] rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative animate-in zoom-in-95 duration-200 border border-transparent dark:border-[#444746]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-[#444746]">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <HelpCircle className="text-[#0b57d0] dark:text-[#a8c7fa]" />
            사용 가이드
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#333537] text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
          
          <section>
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              1. 챗봇과 대화하기
            </h3>
            <div className="flex gap-4 items-start bg-[#f0f4f9] dark:bg-[#28292a] p-4 rounded-2xl border border-gray-200 dark:border-[#444746]">
              <MessageCircle className="text-[#0b57d0] dark:text-[#a8c7fa] mt-1 shrink-0" size={20} />
              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-3 w-full">
                <div className="space-y-1.5 font-medium">
                   <p className="text-gray-700 dark:text-gray-300">"요즘 진로 때문에 너무 고민이야"</p>
                   <p className="text-[#0b57d0] dark:text-[#a8c7fa]">"ISFJ 성격 특징 알려줘"</p>
                   <p className="text-[#0b57d0] dark:text-[#a8c7fa]">"음악지능 추천 직업은?"</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 border-t border-gray-300 dark:border-[#444746]/50 pt-3">
                  맞춤 <span className="text-[#0b57d0] dark:text-[#a8c7fa] font-semibold">검사 링크</span> 및 <span className="text-[#0b57d0] dark:text-[#a8c7fa] font-semibold">상세 정보</span>를 제공합니다.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              2. 제공하는 검사 및 정보
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-[#f0f4f9] dark:bg-[#28292a] border border-gray-200 dark:border-[#444746] p-3 rounded-lg flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                 <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400"></span> MBTI 성격 정보
              </div>
              <div className="bg-[#f0f4f9] dark:bg-[#28292a] border border-gray-200 dark:border-[#444746] p-3 rounded-lg flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                 <span className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400"></span> 다중지능 분석
              </div>
              <div className="bg-[#f0f4f9] dark:bg-[#28292a] border border-gray-200 dark:border-[#444746] p-3 rounded-lg flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                 <span className="w-1.5 h-1.5 rounded-full bg-orange-500 dark:bg-orange-400"></span> HTP 그림 심리 검사
              </div>
              <div className="bg-[#f0f4f9] dark:bg-[#28292a] border border-gray-200 dark:border-[#444746] p-3 rounded-lg flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                 <span className="w-1.5 h-1.5 rounded-full bg-red-500 dark:bg-red-400"></span> 스마트폰 과의존 진단
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              3. 이용 팁
            </h3>
            <div className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex gap-3 items-start">
                <Sparkles size={18} className="text-[#0b57d0] dark:text-[#a8c7fa] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-gray-800 dark:text-gray-200">상세 카드 보기:</strong><br/> 
                  궁금한 MBTI 유형(예: ENFP)이나 지능(예: 언어지능)을 입력하면 상세 설명 카드를 보여줍니다.
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <ExternalLink size={18} className="text-gray-500 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-gray-800 dark:text-gray-200">검사 바로가기:</strong><br/> 
                  챗봇이 제공하는 링크를 클릭하면 해당 검사 사이트로 이동합니다.
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <ShieldCheck size={18} className="text-gray-500 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-gray-800 dark:text-gray-200">주의사항:</strong><br/> 
                  이 챗봇은 전문적인 의학 진단을 대체하지 않습니다. 마음이 많이 힘들 땐 전문가의 도움을 받으세요.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-[#444746] bg-white dark:bg-[#1e1f20] flex justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 bg-[#0b57d0] hover:bg-[#0b57d0]/90 dark:bg-[#a8c7fa] dark:hover:bg-[#8ab4f8] text-white dark:text-[#062e6f] font-bold rounded-full transition-colors"
          >
            확인했어요
          </button>
        </div>

      </div>
    </div>
  );
};

export default InfoModal;