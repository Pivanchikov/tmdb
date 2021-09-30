import { render } from '@testing-library/react'

import { NotFoundPage } from './NotFoundPage'

describe('render Not Found Page', () => {
  const setup = () => render(<NotFoundPage />)

  it('matches snapshot', () => {
    const { asFragment } = setup()

    expect(asFragment()).toMatchSnapshot()
  })
})
