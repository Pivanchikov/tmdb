/* eslint-disable react/prop-types */
/* eslint-disable no-global-assign */
/* eslint-disable react/display-name */

import { render as testingLibraryRender, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import React from 'react'
import configureStore from 'redux-mock-store'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import { Search } from './Search'
import { movies, transformMovies } from '../../__mocks__/mockMovies'

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

jest.mock('react-select', () => ({ options, value, onChange }) => {
  function handleChange(event) {
    const option = options.find(option => {
      return option.value == event.currentTarget.value
    })

    onChange(option)
  }

  return (
    <select id="uc" data-testid="select" value={value} onChange={event => handleChange(event)}>
      {options?.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
})

describe('SearchDecstop', () => {
  let store

  beforeEach(() => {
    jest.resetModules()
    store = mockStore({
      movies: { items: movies, byId: transformMovies },
    })
  })

  const render = () =>
    testingLibraryRender(
      <Router history={createMemoryHistory()}>
        <Provider store={store}>
          <Search />
        </Provider>
      </Router>
    )

  it('renders correctly initial document (desktop version)', () => {
    window = Object.assign(window, { innerWidth: 1500 })
    const { getByTestId } = render()
    expect(getByTestId('select')).toBeInTheDocument
  })

  it('renders correctly initial document (mobile version)', () => {
    window = Object.assign(window, { innerWidth: 500 })
    const { getByTestId } = render()

    expect(getByTestId('buttonSearch')).toBeInTheDocument

    fireEvent.click(getByTestId('buttonSearch'))

    expect(getByTestId('searchIcon')).toBeInTheDocument
    expect(getByTestId('select')).toBeInTheDocument

    expect(getByTestId('closeDrawer')).toBeInTheDocument

    fireEvent.click(getByTestId('closeDrawer'))

    expect(getByTestId('searchIcon')).not.toBeInTheDocument
    expect(getByTestId('select')).toBeInTheDocument
    expect(getByTestId('closeDrawer')).not.toBeInTheDocument
  })

  it('renders correctly redirect to search page from mobile page', () => {
    const { getByTestId } = render()

    expect(getByTestId('buttonSearch')).toBeInTheDocument

    fireEvent.click(getByTestId('buttonSearch'))

    fireEvent.click(getByTestId('searchIcon'))
  })

  it('renders correctly redirect to search page from desktop page', () => {
    window = Object.assign(window, { innerWidth: 1500 })
    const { getByTestId } = render()

    expect(getByTestId('buttonSearch')).toBeInTheDocument

    fireEvent.click(getByTestId('buttonSearch'))
  })

  it('checking redirect to  movie page', () => {
    window = Object.assign(window, { innerWidth: 500 })
    React.useState = jest.fn().mockReturnValue([true, {}])
    render()

    window = Object.assign(window, { innerWidth: 1500 })
    render()
  })

  it('matches snapshot', () => {
    const { asFragment } = render()
    expect(asFragment()).toMatchSnapshot()
  })
})
