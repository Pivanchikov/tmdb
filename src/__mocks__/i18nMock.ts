export default jest.mock('react-i18next', () => {
  return {
    useTranslation: () => {
      return {
        t: jest.fn(value => value),
        i18n: {
          language: 'en',
          changeLanguage: jest.fn(),
        },
      }
    },
  }
})
