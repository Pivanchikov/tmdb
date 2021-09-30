import { render as testingLibraryRender } from '@testing-library/react'

import { Footer } from './Footer'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: jest.fn(value => value),
    i18n: {
      language: 'en',
      changeLanguage: jest.fn(),
    },
  }),
}))

describe('Footer', () => {
  const render = () => testingLibraryRender(<Footer />)

  it('renders correctly logo', () => {
    const { getByTestId } = render()

    expect(getByTestId('logo')).toBeInTheDocument
  })

  it('renders copyright', () => {
    const { getByTestId } = render()

    expect(getByTestId('copyright')).toBeInTheDocument
  })

  it('renders links', () => {
    const expectedLength = 2
    const { getAllByTestId } = render()

    expect(getAllByTestId('links')).toHaveLength(expectedLength)
  })
  it('matches snapshot', () => {
    const { asFragment } = render()

    expect(asFragment()).toMatchSnapshot()
  })
})
