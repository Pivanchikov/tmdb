import { MIN_YEAR, MAX_YEAR } from './constants'

interface RangePickerOption {
  value: number
  label: string
}

export const getYearsOptions = (start: number = MIN_YEAR, end: number = MAX_YEAR): RangePickerOption[] =>
  // eslint-disable-next-line no-magic-numbers
  new Array(end - start).fill(0).map((_, index) => {
    const year = start + index

    return { value: year, label: `${year}` }
  })
