import { render as testingLibraryRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { PopularSection } from './PopularSection'
import { initialState, movies } from '../../../__mocks__'

const mockStore = configureStore([thunk])

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: jest.fn(value => value),
    i18n: {
      language: 'en',
      changeLanguage: jest.fn(),
    },
  }),
}))

describe('render popular section', () => {
  const store = mockStore({
    movies: { ...initialState, popularMovie: movies },
  })

  const render = () =>
    testingLibraryRender(
      <Provider store={store}>
        <PopularSection />
      </Provider>
    )

  it('matches snapshot', () => {
    const { asFragment } = render()

    expect(asFragment()).toMatchSnapshot()
  })
})
