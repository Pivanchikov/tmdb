import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { DiscoverPage } from './DiscoverPage'
import { initialState } from '../../__mocks__'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

type DropdownProps = {
  onChange: (option: { value: string; label: string } | undefined) => void
  testId: string
  options: { value: string; label: string }[]
  value: string | number | readonly string[]
}

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: jest.fn(value => value),
    i18n: {
      language: 'en',
      changeLanguage: jest.fn(),
    },
  }),
}))

jest.mock('../../components', () => ({
  Dropdown({ options, value, onChange, testId }: DropdownProps) {
    function handleChange(event) {
      const option = options.find(option => {
        return option.value == event.currentTarget.value
      })

      onChange(option)
    }

    return (
      <select data-testid={testId} value={value} onChange={event => handleChange(event)}>
        {options?.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    )
  },
  RangePicker() {
    return <div>RangePicker</div>
  },
}))

describe('Search page', () => {
  const store = mockStore({
    movies: initialState,
  })

  const setup = () =>
    render(
      <Provider store={store}>
        <DiscoverPage />
      </Provider>
    )

  it('render foundMovie component', () => {
    const { getByTestId } = setup()

    fireEvent.click(getByTestId('buttonFind'))
  })
  it('change value for select', () => {
    const { getByTestId } = setup()

    fireEvent.change(getByTestId('selectCountry'), { value: '', label: 'test' })
  })
  it('matches snapshot', () => {
    const { asFragment } = setup()

    expect(asFragment()).toMatchSnapshot()
  })
})
