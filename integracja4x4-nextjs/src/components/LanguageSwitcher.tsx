"use client";

import { useLanguage } from '@/hooks/use-language';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: 'pl' | 'en') => {
    changeLanguage(newLanguage);
  };

  return (
    <div className="flex items-center">
      {/* PL Button */}
                  <button
                    onClick={() => handleLanguageChange('pl')}
                    className={`px-3 py-1.5 text-sm font-montserrat font-medium transition-colors ${
                      language === 'pl'
                        ? 'bg-gray-800 text-white border border-accent'
                        : 'text-foreground hover:text-foreground/80'
                    }`}
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
                    }}
                  >
                    PL
                  </button>
      
      {/* Separator */}
      <div className="w-px h-4 bg-foreground/20"></div>
      
      {/* EN Button */}
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`px-3 py-1.5 text-sm font-montserrat font-medium transition-colors ${
                      language === 'en'
                        ? 'bg-gray-800 text-white border border-accent'
                        : 'text-foreground hover:text-foreground/80'
                    }`}
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
                    }}
                  >
                    EN
                  </button>
    </div>
  );
};

export default LanguageSwitcher;
