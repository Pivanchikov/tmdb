import { render as testingLibraryRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { MainPage } from './MainPage'
import { initialState, movies } from '../../__mocks__'

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
  let store = mockStore({
    movies: initialState,
  })

  const render = () =>
    testingLibraryRender(
      <Provider store={store}>
        <MainPage />
      </Provider>
    )
  it('popular section', () => {
    store = mockStore({
      movies: { ...initialState, popularMovie: movies },
    })
  })
  it('matches snapshot', () => {
    const { asFragment } = render()

    expect(asFragment()).toMatchSnapshot()
  })
})
