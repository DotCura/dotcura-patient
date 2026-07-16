import i18next from 'i18next';
import { en, es } from '../translation';
import { initReactI18next } from 'react-i18next';
import { MmkvManager, storage } from '../../constants/utils/MmkvManager';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';

const resources = {
  en: { translation: en },
  es: { translation: es },
};

export const initI18n = async () => {
  const asyncLang = storage.getString(MmkvManager.Keys.appLanguage);
  // const deviceLang = RNLocalize.getLocales()[0].languageCode; // Change Language according to Device Language
  // const fallbackLang = asyncLang || deviceLang || 'en';
  const fallbackLang = asyncLang || 'es';

  await i18next.use(initReactI18next).init({
    debug: true,
    lng: fallbackLang,
    fallbackLng: 'es',
    resources,
  });
};

if (!i18next.isInitialized) {
  initI18n();
}

export const getTranslation = (key: string) => {
  const translation = i18next.t(key);
  return translation !== key ? translation : null;
};

export const changeAppLanguage = (langKey: string) => {
  i18next.changeLanguage(langKey);
  MmkvManager.setData(MmkvManager.Keys.appLanguage, langKey);
  I18nManager.forceRTL(langKey === 'ar');
  I18nManager.allowRTL(langKey === 'ar');
  RNRestart.restart();
};

export default i18next;
