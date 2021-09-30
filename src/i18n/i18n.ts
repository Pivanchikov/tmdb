import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import engb from './en-gb.json'
import ruru from './ru-ru.json'

export const RU = 'ru'

export const initI18n = () => {
  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: engb,
      },
      ru: {
        translation: ruru,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  })
}

export { i18n }
