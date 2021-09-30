import { render as testingLibraryRender, fireEvent } from '@testing-library/react'

import { Header } from './Header'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: jest.fn(value => value),
    i18n: {
      language: 'en',
      changeLanguage: jest.fn(),
    },
  }),
}))

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}))

describe('Header', () => {
  const render = () => testingLibraryRender(<Header />)

  it('renders correctly logo', () => {
    const { getByTestId } = render()

    expect(getByTestId('logo')).toBeInTheDocument

    fireEvent.click(getByTestId('logo'))
  })

  it('matches snapshot', () => {
    const { asFragment } = render()

    expect(asFragment()).toMatchSnapshot()
  })
})
