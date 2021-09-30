import { render as testingLibraryRender } from '@testing-library/react'
import { enGenresSelectMock, emptyGenre } from '../../__mocks__'

import { Dropdown } from './Dropdown'
import { DropdownProps } from './types'

describe('movie dropdown', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const render = (props?: { [key: string]: any }) => {
    const spyOnChange = jest.fn()
    const requiredProps: DropdownProps = { options: enGenresSelectMock, onChange: spyOnChange }

    return testingLibraryRender(<Dropdown {...requiredProps} {...props} />)
  }

  it('render with default value', () => {
    const { getByText } = render({ emptyValue: emptyGenre, defaultValue: '', testId: 'select' })
    const placeholder = getByText('Any genre')
    expect(placeholder).toBeTruthy()
  })

  it('matches snapshot', () => {
    const { asFragment } = render()
    expect(asFragment()).toMatchSnapshot()
  })
})
