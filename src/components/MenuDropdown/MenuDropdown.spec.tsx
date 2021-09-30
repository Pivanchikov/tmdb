import { render as testingLibraryRender, fireEvent } from '@testing-library/react'

import { MenuDropdown } from './MenuDropdown'
import { films } from '../constants'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: jest.fn(value => value),
    i18n: {
      language: 'en',
      changeLanguage: jest.fn(),
    },
  }),
}))

describe('MenuDropdown', () => {
  const render = () => testingLibraryRender(<MenuDropdown name="MOVIES" items={films} />)

  it('renders correctly initial document', () => {
    const { getByRole, queryByText } = render()

    expect(getByRole('button')).toBeInTheDocument
    expect(queryByText(/Movies/i)).toBeInTheDocument
  })

  it('click on menu button', () => {
    const expectedLength = 4

    const { getByRole, getByText, queryAllByRole } = render()

    fireEvent.click(getByRole('button'))

    expect(queryAllByRole('menuitem')).toHaveLength(expectedLength)
    films.forEach(item => expect(getByText(item)).toBeInTheDocument)

    fireEvent.click(getByRole('button'))
    films.forEach(item => expect(getByText(item)).not.toBeInTheDocument)
  })
  it('matches snapshot', () => {
    const { asFragment } = render()

    expect(asFragment()).toMatchSnapshot()
  })
})
