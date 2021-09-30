import { render as testingLibraryRender, fireEvent } from '@testing-library/react'

import { LanguageSwitcher } from './LanguageSwitcher'
import { languages } from '../constants'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: jest.fn(value => value),
    i18n: {
      language: 'en',
      changeLanguage: jest.fn(),
    },
  }),
}))

describe('LanguageSwitcher', () => {
  const render = () => testingLibraryRender(<LanguageSwitcher />)

  it('renders correctly initial document', () => {
    const { getByRole, getAllByTestId } = render()

    fireEvent.click(getByRole('button'))

    expect(getAllByTestId('lang')).toHaveLength(languages.length)
  })

  it('changing language', () => {
    const { getByRole, getAllByTestId } = render()

    fireEvent.click(getByRole('button'))
    const [item] = getAllByTestId('lang')

    fireEvent.click(item)
    expect(jest.fn()).toHaveBeenCalled
  })

  it('matches snapshot', () => {
    const { asFragment } = render()

    expect(asFragment()).toMatchSnapshot()
  })
})
