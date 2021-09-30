import { render as testingLibraryRender } from '@testing-library/react'

import { RangePicker } from './RangePicker'
import { RangePickerProps } from './types'

describe('movie dropdown', () => {
  const requiredProps: RangePickerProps = {
    step: 1,
    min: 1,
    max: 20,
    label: 'production year',
    onChange: jest.fn(),
    // eslint-disable-next-line no-magic-numbers
    values: [1],
  }
  const render = () => testingLibraryRender(<RangePicker {...requiredProps} />)

  it('matches snapshot', () => {
    const { asFragment } = render()
    expect(asFragment()).toMatchSnapshot()
  })
})
