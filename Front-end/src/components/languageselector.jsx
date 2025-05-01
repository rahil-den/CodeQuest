import React from 'react';
import { Globe } from 'lucide-react';

const LanguageSelector = ({ 
  currentLanguage, 
  isMenuOpen, 
  setIsMenuOpen, 
  languageOptions, 
  onChangeLanguage 
}) => {
  // Get selected language info
  const selectedLanguage = languageOptions.find(lang => lang.value === currentLanguage);

  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        {/* Language selection button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center text-sm px-3 py-1 rounded-md border hover:bg-muted"
        >
          <Globe className="w-4 h-4 mr-1" />
          {selectedLanguage?.label || 'Select Language'}
        </button>

        {/* Language dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 mt-1 bg-background rounded-md shadow-lg border z-10 w-40">
            {languageOptions.map(lang => (
              <button
                key={lang.value}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-muted"
                onClick={() => {
                  onChangeLanguage(lang.value);
                  setIsMenuOpen(false);
                }}
              >
                {lang.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Show file extension */}
      <div className="text-sm font-medium">
        solution{selectedLanguage?.extension || '.py'}
      </div>
    </div>
  );
};

export default LanguageSelector;
