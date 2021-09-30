import { useState, useEffect, useMemo, useCallback } from 'react'
import { Button, makeStyles, Hidden, CircularProgress } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { getGenresItems, fetchGenres, fetchSingleMovie, getIsLoading, getIsFoundMovie } from '../../state'
import { RangePicker, Dropdown } from '../../components'
import { FoundMovie } from './FoundMovie/FoundMovie'
import { styles } from './DiscoverPage.styles'
import { MIN_YEAR, MAX_YEAR, STEP } from './constants'
import { getYearsOptions } from './utils'

const useStyles = makeStyles(styles)

export const DiscoverPage = () => {
  const isFoundMovie = useSelector(getIsFoundMovie)

  const { t } = useTranslation()
  const genres = useSelector(getGenresItems)
  const isLoading = useSelector(getIsLoading)
  const countries = useMemo(
    () => [
      { value: 'AT', label: t('austria') },
      { value: 'BE', label: t('belgium') },
      { value: 'CA', label: t('сanada') },
      { value: 'CN', label: t('сhina') },
      { value: 'DK', label: t('denmark') },
      { value: 'FR', label: t('france') },
      { value: 'DE', label: t('germany') },
      { value: 'HK', label: t('hongKong') },
      { value: 'IE', label: t('ireland') },
      { value: 'IT', label: t('italy') },
      { value: 'JP', label: t('japan') },
      { value: 'KR', label: t('koreaSouth') },
      { value: 'MX', label: t('mexico') },
      { value: 'RU', label: t('russia') },
      { value: 'ES', label: t('spain') },
      { value: 'SE', label: t('sweden') },
      { value: 'GB', label: t('unitedKingdom') },
      { value: 'US', label: t('usa') },
    ],
    [t]
  )

  const years = useMemo(getYearsOptions, [])
  const classes = useStyles()
  const dispatch = useDispatch()
  const [genre, setGenre] = useState('')
  const [country, setCountry] = useState('')
  const [year, setYear] = useState('')

  const label = `${t('productionYear')}: ${year || t('any')}`

  const handleGenreChange = useCallback(genre => setGenre(genre.value), [])
  const handleCountryChange = useCallback(country => setCountry(country.value), [])
  const handleYearsChange = useCallback(years => {
    if (Array.isArray(years)) {
      const [value] = years
      setYear(value)
    } else {
      setYear(years.value)
    }
  }, [])

  const search = () => {
    dispatch(fetchSingleMovie({ genre, country, year }))
  }

  const rangePickerValue = year ? [+year] : [MIN_YEAR]

  useEffect(() => {
    dispatch(fetchGenres())
  }, [dispatch, t])

  return (
    <section className={classes.container}>
      <div className={classes.center}>
        <Dropdown
          options={genres}
          onChange={handleGenreChange}
          emptyValue={{ value: '', label: `${t('anyGenre')}` }}
          testId="selectGenres"
        />
        <Dropdown
          options={countries}
          onChange={handleCountryChange}
          emptyValue={{ value: '', label: `${t('anyCountry')}` }}
          testId="selectCountry"
        />
      </div>
      <div className={classes.year}>
        <Hidden smDown>
          <RangePicker
            step={STEP}
            min={MIN_YEAR}
            max={MAX_YEAR}
            values={rangePickerValue}
            onChange={handleYearsChange}
            label={label}
          />
        </Hidden>
        <Hidden mdUp>
          <Dropdown
            options={years}
            defaultValue={year}
            onChange={handleYearsChange}
            emptyValue={{ value: '', label: `${t('anyYear')}` }}
            testId="selectYear"
          />
        </Hidden>
      </div>
      <Button onClick={search} className={classes.button} data-testid={'buttonFind'}>
        {t('find')}
      </Button>
      {isLoading && (
        <div className={classes.loader}>
          <CircularProgress color="primary" className={classes.loader} />
        </div>
      )}
      {isFoundMovie && (
        <>
          <FoundMovie />
          <div className={classes.linksContainer}>
            <Button className={classes.button} data-testid={'popularLink'}>
              {t('popular')}
            </Button>
            <Button className={classes.button} data-testid={'topRatedLink'}>
              {t('topRated')}
            </Button>
          </div>
        </>
      )}
    </section>
  )
}
