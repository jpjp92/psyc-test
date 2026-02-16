import React from 'react';
import { Message } from '../types';
import { User, Bot, Briefcase } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const hasAttachment = !isUser && message.attachment;

  // Basic markdown link parser for clickable links in bot responses
  const renderTextWithLinks = (text: string) => {
    // Regex to capture markdown links: [text](url)
    const parts = text.split(/(\[.*?\]\(.*?\))/g);

    return parts.map((part, index) => {
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        return (
          <a
            key={index}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0b57d0] hover:text-[#062e6f] dark:text-[#a8c7fa] dark:hover:text-[#d3e3fd] underline font-medium break-all"
          >
            {linkMatch[1]}
          </a>
        );
      }
      // Simple URL detection if not markdown
      const urlMatch = part.match(/(https?:\/\/[^\s]+)/g);
      if (urlMatch && !part.startsWith('[')) {
        return <span key={index}>{part}</span>;
      }

      return <span key={index} className="whitespace-pre-wrap">{part}</span>;
    });
  };

  // 렌더링: MBTI 카드
  const renderMbtiCard = (item: any, index: number) => (
    <div key={index} className="bg-white dark:bg-[#1e1f20] border border-gray-200 dark:border-[#444746] rounded-xl p-4 flex flex-col gap-2 w-full hover:bg-gray-50 dark:hover:bg-[#28292a] transition-colors shadow-sm h-full">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-[#0b57d0] dark:text-[#a8c7fa] font-bold text-lg">{item.code}</h4>
        <span className="text-xl">{item.emoji}</span>
      </div>
      <p className="text-gray-800 dark:text-gray-200 text-sm font-bold">{item.alias}</p>
      <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed break-keep">{item.description}</p>
    </div>
  );

  // 렌더링: 다중지능 카드
  const renderMultiIqCard = (item: any, index: number) => (
    <div key={index} className="bg-white dark:bg-[#1e1f20] border border-gray-200 dark:border-[#444746] rounded-xl p-4 flex flex-col gap-3 w-full hover:bg-gray-50 dark:hover:bg-[#28292a] transition-colors shadow-sm h-full">
      <div>
        <h4 className="text-[#0b57d0] dark:text-[#a8c7fa] font-bold text-base mb-1">{item.name}</h4>
        <p className="text-gray-700 dark:text-gray-300 text-xs break-keep">{item.description}</p>
      </div>
      <div className="bg-[#f0f4f9] dark:bg-[#131314] rounded-lg p-3 mt-auto">
        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 mb-1.5">
          <Briefcase size={12} />
          <span className="text-[10px] font-bold uppercase tracking-wider">추천 직업</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-[11px] leading-relaxed break-keep">
          {item.jobs}
        </p>
      </div>
    </div>
  );

  // 렌더링: HTP 가이드 카드
  const renderHtpCard = (data: any, index: number) => (
    <div key={index} className="w-full bg-white dark:bg-[#1e1f20] border border-gray-200 dark:border-[#444746] rounded-2xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-gray-100 dark:border-[#444746]/30 bg-[#f8faff] dark:bg-[#1c2c4c]/20">
        <h4 className="font-bold text-[#0b57d0] dark:text-[#a8c7fa] mb-1">{data.title}</h4>
        <p className="text-xs text-gray-600 dark:text-gray-400 break-keep">{data.intro}</p>
      </div>
      <div className="p-4 grid grid-cols-1 gap-3">
        {data.items.map((item: any, idx: number) => (
          <div key={idx} className="flex gap-4 p-3 rounded-xl bg-gray-50 dark:bg-[#28292a] border border-transparent hover:border-gray-200 dark:hover:border-[#444746] transition-colors">
            <div className="text-2xl pt-0.5">{item.emoji}</div>
            <div>
              <div className="font-bold text-sm text-gray-800 dark:text-gray-200">{item.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 break-keep leading-relaxed">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 렌더링: 스마트폰 과의존 가이드 카드
  const renderSmartphoneCard = (data: any, index: number) => (
    <div key={index} className="w-full bg-white dark:bg-[#1e1f20] border border-gray-200 dark:border-[#444746] rounded-2xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-gray-100 dark:border-[#444746]/30 bg-[#fff8f8] dark:bg-[#3c1c1c]/20">
        <h4 className="font-bold text-red-600 dark:text-red-400 mb-1">{data.title}</h4>
        <p className="text-xs text-gray-600 dark:text-gray-400 break-keep">{data.intro}</p>
      </div>
      <div className="p-5 space-y-5">
        <div className="space-y-3">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">주요 자가진단 항목</p>
          {data.symptoms.map((symptom: any, idx: number) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-lg">{symptom.emoji}</span>
              <div>
                <span className="font-bold text-xs text-gray-800 dark:text-gray-200 mr-2">{symptom.name}</span>
                <span className="text-[11px] text-gray-500 dark:text-gray-400 break-keep">{symptom.description}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-gray-100 dark:border-[#444746]/30">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">건강한 사용 팁</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.tips.map((tip: string, idx: number) => (
              <div key={idx} className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2 py-1 px-2 rounded-lg bg-gray-50 dark:bg-[#28292a]">
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex flex-col gap-2 ${isUser ? 'items-end max-w-[90%] md:max-w-[80%]' : 'items-start w-full max-w-full'}`}
      >

        {/* Message Bubble Row */}
        <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-3 w-full ${!isUser && 'max-w-3xl'}`}>
          {/* Avatar */}
          <div
            className={`
                flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border
                ${isUser
                ? 'bg-gray-200 border-gray-300 text-gray-600 dark:bg-[#444746] dark:border-transparent dark:text-gray-200'
                : 'bg-white border-gray-200 text-[#0b57d0] dark:bg-[#1c2c4c] dark:text-[#a8c7fa] dark:border-[#2a3d63]'
              }
            `}
          >
            {isUser ? <User size={18} /> : <Bot size={18} />}
          </div>

          {/* Text Bubble */}
          <div
            className={`py-2 px-1 text-base leading-relaxed
                ${isUser
                ? 'bg-[#e9eef6] text-gray-800 dark:bg-[#28292a] dark:text-white px-5 py-3 rounded-2xl rounded-tr-sm'
                : 'text-gray-800 dark:text-gray-200'
              }`}
          >
            {isUser ? message.text : renderTextWithLinks(message.text)}
          </div>
        </div>

        {/* Attachment Cards (Bot Only) */}
        {!isUser && message.attachment && (
          <div className="pl-11 w-full pr-4 md:pr-0">
            <div className={`grid gap-3 ${message.attachment.type === 'htp' || message.attachment.type === 'smartphone'
                ? 'grid-cols-1 max-w-2xl'
                : message.attachment.data.length > 2
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1 sm:grid-cols-2'
              }`}>
              {message.attachment.type === 'mbti' &&
                message.attachment.data.map((item, idx) => renderMbtiCard(item, idx))
              }
              {message.attachment.type === 'multi-iq' &&
                message.attachment.data.map((item, idx) => renderMultiIqCard(item, idx))
              }
              {message.attachment.type === 'htp' &&
                message.attachment.data.map((item, idx) => renderHtpCard(item, idx))
              }
              {message.attachment.type === 'smartphone' &&
                message.attachment.data.map((item, idx) => renderSmartphoneCard(item, idx))
              }
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ChatMessage;