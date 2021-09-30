import { render as testingLibraryRender, fireEvent } from '@testing-library/react'

import { BurgerMenu } from './BurgerMenu'
import { burgerItems } from '../constants'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: jest.fn(value => value),
    i18n: {
      language: 'en',
      changeLanguage: jest.fn(),
    },
  }),
}))

describe('BurgerMenu', () => {
  const render = () => testingLibraryRender(<BurgerMenu items={burgerItems} />)

  it('renders correctly initial document', () => {
    const { getByRole } = render()

    expect(getByRole('button')).toBeInTheDocument
  })

  it('click on menu button', () => {
    const { getAllByRole, getByRole, getByText } = render()
    const expectedLength = 8

    fireEvent.click(getByRole('button'))

    expect(getAllByRole('button')).toHaveLength(expectedLength)
    burgerItems.top.forEach(item => expect(getByText(item)).toBeInTheDocument)
    burgerItems.middle.forEach(item => expect(getByText(item)).toBeInTheDocument)
    burgerItems.bottom.forEach(item => expect(getByText(item)).toBeInTheDocument)
  })

  it('matches snapshot', () => {
    const { asFragment } = render()
    expect(asFragment()).toMatchSnapshot()
  })
})
