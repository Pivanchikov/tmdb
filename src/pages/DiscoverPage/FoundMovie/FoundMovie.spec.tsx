import { render as testingLibraryRender, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import { movieWithAllParam, movieWithOutAllParam } from '../../../__mocks__'
import { FoundMovie } from './FoundMovie'

const mockStore = configureStore([])

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: jest.fn(value => value),
    i18n: {
      language: 'en',
      changeLanguage: jest.fn(),
    },
  }),
}))

describe('Found Movie component', () => {
  let store

  const render = () =>
    testingLibraryRender(
      <Router history={createMemoryHistory()}>
        <Provider store={store}>
          <FoundMovie />
        </Provider>
      </Router>
    )
  it('render with all keys', () => {
    store = mockStore({
      movies: { items: [], byId: {}, selectedMovie: movieWithAllParam },
    })

    const { getByText } = render()

    expect(getByText(movieWithAllParam.vote_average)).toBeInTheDocument
    expect(getByText(movieWithAllParam.title)).toBeInTheDocument
  })

  it('render without all keys', () => {
    store = mockStore({
      movies: { items: [], byId: {}, selectedMovie: movieWithOutAllParam },
    })

    const { getByText } = render()

    expect(getByText('8.0')).toBeInTheDocument
    expect(getByText(movieWithOutAllParam.title)).toBeInTheDocument
    expect(getByText('overview')).toBeInTheDocument
  })

  it('click on label for redirect', () => {
    store = mockStore({
      movies: { items: [], byId: {}, selectedMovie: movieWithAllParam },
    })

    const { getByTestId } = render()

    fireEvent.click(getByTestId('title'))
  })

  it('matches snapshot', () => {
    const { asFragment } = render()

    expect(asFragment()).toMatchSnapshot()
  })
})
