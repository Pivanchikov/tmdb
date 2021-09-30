import { getPosterPath } from './utils'
import { movieWithAllParam } from '../../../__mocks__'

describe('Found Movie component utils', () => {
  const fakePath = 'https://image.tmdb.org/t/p/w200/jDwZavHo99JtGsCyRzp4epeeBHx.jpg'
  it('testing getPosterPath', () => {
    expect(getPosterPath(null)).toBe('')
    expect(getPosterPath(movieWithAllParam)).toBe(fakePath)
  })
})
