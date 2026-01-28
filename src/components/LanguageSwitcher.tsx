import { useLanguage } from '../i18n/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-switcher">
      <button
        className={`language-tab ${language === 'es' ? 'active' : ''}`}
        onClick={() => setLanguage('es')}
      >
        ES
      </button>
      <button
        className={`language-tab ${language === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
    </div>
  );
}