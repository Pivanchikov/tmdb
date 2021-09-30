import { render as testingLibraryRender, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import { MovieCard } from './MovieCard'
import { initialState, movies, movieWithAllParam } from '../../__mocks__'

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

describe('render main page', () => {
  const store = mockStore({
    movies: { ...initialState, popularMovie: movies },
  })

  const render = () =>
    testingLibraryRender(
      <Router history={createMemoryHistory()}>
        <Provider store={store}>
          <MovieCard movie={movieWithAllParam} />
        </Provider>
      </Router>
    )

  it('click on poster', () => {
    const { getByTestId } = render()

    fireEvent.click(getByTestId('poster'))
  })

  it('matches snapshot', () => {
    const { asFragment } = render()

    expect(asFragment()).toMatchSnapshot()
  })
})
