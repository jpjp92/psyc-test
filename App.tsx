import React, { useState, useRef, useEffect } from 'react';
import { Send, Menu, Info, Sparkles, Brain, Lightbulb, Palette, Smartphone, Bot, X, Moon, Sun } from 'lucide-react';
import { Message } from './types';
import ChatMessage from './components/ChatMessage';
import QuickMenu from './components/QuickMenu';
import InfoModal from './components/InfoModal';
// import { sendMessageToGemini } from './services/geminiService'; // Gemini API 비활성화
import { sendMessageToBot } from './services/ruleBasedService'; // 규칙 기반 챗봇 활성화
import { PSYCH_TESTS } from './constants';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to Dark Mode

  // Initialize sidebar state based on screen width (SSR safe check)
  const [isSidebarOpen, setIsSidebarOpen] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Icon mapping updated to components for responsive sizing
  const iconMap: Record<string, React.ElementType> = {
    'Brain': Brain,
    'Lightbulb': Lightbulb,
    'Palette': Palette,
    'Smartphone': Smartphone,
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle Theme Toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText || isLoading) return;

    if (!text) setInputValue('');

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: messageText,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call Rule-based Bot (No API Cost)
      // returns { text: string, attachment?: ... }
      const response = await sendMessageToBot(messageText);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text,
        timestamp: Date.now(),
        attachment: response.attachment // Pass attachment to message
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setIsLoading(false);
      if (window.innerWidth > 768) {
        inputRef.current?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Helper to open test link from welcome chips
  const handleChipClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-[100dvh] bg-white dark:bg-[#131314] font-sans text-gray-800 dark:text-gray-200 transition-colors duration-200 overflow-hidden">

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 bg-[#f0f4f9] dark:bg-[#1e1f20] border-r border-gray-200 dark:border-[#444746]/50
          transition-all duration-300 ease-in-out flex flex-col whitespace-nowrap
          ${isSidebarOpen
            ? 'translate-x-0 w-72 opacity-100'
            : '-translate-x-full lg:translate-x-0 lg:w-0 lg:opacity-0 lg:border-r-0 lg:overflow-hidden'
          }
        `}
      >
        <div className="h-full flex flex-col w-72 pt-[env(safe-area-inset-top)]">
          {/* Mobile Sidebar Header with Brand */}
          <div className="flex items-center justify-between px-5 py-5 lg:hidden border-b border-gray-200 dark:border-[#444746]/30">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4285f4] to-[#9b72cb] flex items-center justify-center text-white shadow-sm">
                <Brain size={18} />
              </div>
              <span className="font-bold text-gray-800 dark:text-gray-200 tracking-tight">숲 상담소</span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 -mr-1 rounded-full text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-[#333537] hover:text-black dark:hover:text-white transition-all active:scale-90"
              title="닫기"
            >
              <X size={22} />
            </button>
          </div>

          {/* Sidebar Content - Reduced top padding for Desktop to move QuickMenu up */}
          <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar lg:pt-2">
            {/* Use QuickMenu component but adjusted for this context via its own styles */}
            <QuickMenu />

            {/* Simplified Tip Section */}
            <div className="mt-4 px-4 py-3 bg-white dark:bg-[#28292a] rounded-xl border border-gray-200 dark:border-[#444746] text-[#0b57d0] dark:text-[#a8c7fa] text-sm mx-4 shadow-sm dark:shadow-none">
              <p className="font-semibold mb-1 flex items-center gap-2 text-xs">
                <Sparkles size={12} /> 이용 팁
              </p>
              <p className="opacity-80 text-xs leading-relaxed text-gray-600 dark:text-gray-300 whitespace-normal break-keep">
                궁금한 검사명을 입력하면 상세 정보를 안내해 드려요.
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full relative bg-white dark:bg-[#131314] overflow-hidden transition-colors duration-200">

        {/* Header (Desktop: Minimal / Mobile: Visible) */}
        <header className="h-14 lg:h-16 flex items-center justify-between px-4 lg:px-6 z-10 sticky top-0 bg-white/90 dark:bg-[#131314]/90 backdrop-blur-md transition-colors duration-200 pt-[env(safe-area-inset-top)] box-content">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="p-2 -ml-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#333537] hover:text-black dark:hover:text-white transition-colors"
              title={isSidebarOpen ? "사이드바 접기" : "사이드바 펼치기"}
            >
              <Menu size={24} />
            </button>
            <div className="font-medium text-gray-700 dark:text-gray-200">
              숲 상담소
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#333537] transition-colors"
              title={isDarkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
            >
              {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>
            <button
              onClick={() => setIsInfoOpen(true)}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#333537] transition-colors"
              title="사용법 보기"
            >
              <Info size={22} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-0 custom-scrollbar scroll-smooth relative">

          {messages.length === 0 ? (
            /* Welcome Screen (Gemini Style) */
            <div className="h-full flex flex-col items-center justify-center px-4 pb-20">
              <div className="w-full max-w-4xl space-y-6 md:space-y-8">

                {/* Greeting */}
                <div className="space-y-1 md:space-y-2">
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285f4] via-[#9b72cb] to-[#d96570]">
                      반가워요,
                    </span>
                  </h2>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-[#c4c7c5] dark:text-[#444746]">
                    무엇을 도와드릴까요?
                  </h2>
                </div>

                {/* Suggestion Chips (Gemini Style Cards) */}
                {/* Mobile: grid-cols-2 for 2x2 layout, Desktop: grid-cols-4 */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {PSYCH_TESTS.map((test) => {
                    const Icon = iconMap[test.icon];
                    return (
                      <button
                        key={test.id}
                        onClick={() => handleChipClick(test.url)}
                        className="text-left p-3 md:p-4 rounded-xl bg-[#f0f4f9] dark:bg-[#1e1f20] hover:bg-[#e2e7eb] dark:hover:bg-[#333537] transition-all duration-200 group h-32 md:h-36 flex flex-col justify-between border border-transparent hover:border-gray-200 dark:hover:border-[#444746]"
                      >
                        <div className="bg-white dark:bg-[#333537] w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[#0b57d0] dark:text-[#a8c7fa] group-hover:bg-[#fff] dark:group-hover:bg-[#444746] transition-colors shadow-sm dark:shadow-none">
                          <Icon className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-gray-200 mb-0.5 text-sm md:text-base">{test.name}</div>
                          <div className="text-[10px] md:text-xs text-gray-600 dark:text-gray-500 line-clamp-2 leading-tight">{test.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

              </div>
            </div>
          ) : (
            /* Chat Messages */
            <div className="max-w-3xl mx-auto space-y-4 p-4 lg:p-0 pt-2 pb-8">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isLoading && (
                <div className="flex justify-start w-full mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-[#1c2c4c] border border-gray-200 dark:border-[#2a3d63] flex items-center justify-center text-[#0b57d0] dark:text-[#a8c7fa]">
                      <Bot size={18} className="animate-pulse" />
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm py-2">
                      생각하는 중...
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area (Floating) */}
        <div className="p-4 bg-white dark:bg-[#131314] transition-colors duration-200">
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-[#f0f4f9] dark:bg-[#1e1f20] rounded-[28px] transition-colors focus-within:bg-[#e9eef6] dark:focus-within:bg-[#28292a] hover:bg-[#e9eef6] dark:hover:bg-[#28292a]">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="질문해주세요"
                disabled={isLoading}
                className="w-full pl-6 pr-14 py-4 bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 outline-none rounded-[28px]"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-200
                  ${!inputValue.trim() || isLoading
                    ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'text-white bg-[#0b57d0] dark:bg-[#a8c7fa]/20 dark:text-white dark:hover:bg-[#a8c7fa] dark:hover:text-[#0b57d0] hover:bg-[#0b57d0]/90'
                  }`}
              >
                <Send size={20} className="transform rotate-45 mr-0.5 mt-0.5" />
              </button>
            </div>
            <div className="text-center mt-3">
              <p className="text-[11px] text-gray-500">
                답변은 참고용이며 전문 진단을 대체하지 않습니다.
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* Info Modal */}
      <InfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
    </div>
  );
}

export default App;