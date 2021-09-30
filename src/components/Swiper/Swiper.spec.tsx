import { render as testingLibraryRender } from '@testing-library/react'
import { movies } from '../../__mocks__'

import { Swiper } from './Swiper'

jest.mock('swiper/react', () => ({
  Swiper() {
    return <div>Swiper</div>
  },
  SwiperSlide() {
    return <div>SwiperSlide</div>
  },
}))

describe('MenuDropdown', () => {
  const render = () => testingLibraryRender(<Swiper items={movies} />)

  it('renders correctly initial document', () => {
    const { getByText } = render()

    expect(getByText('Swiper')).toBeInTheDocument
  })

  it('matches snapshot', () => {
    const { asFragment } = render()

    expect(asFragment()).toMatchSnapshot()
  })
})
