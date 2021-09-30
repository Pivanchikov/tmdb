import { render as testingLibraryRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { MoviePage } from './MoviePage'
import { initialState } from '../../__mocks__'

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

describe('render single movie page', () => {
  const store = mockStore({
    movies: initialState,
  })

  const render = () =>
    testingLibraryRender(
      <Provider store={store}>
        <MoviePage />
      </Provider>
    )
  it('matches snapshot', () => {
    const { asFragment } = render()

    expect(asFragment()).toMatchSnapshot()
  })
})
