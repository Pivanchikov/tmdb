import { useState, useEffect, useMemo } from 'react'
import { IconButton, Drawer, makeStyles } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import Select from 'react-select'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { debounce } from 'lodash'

import { desktopWidth, TIMEOUT_MS, QUERY_LENGTH_THRESHOLD } from '../constants'
import { APP_ROUTES } from '../../routes'
import { styles, select, selectTheme } from './Search.styles'
import { getMoviesItems, fetchMovies } from '../../state'

const useStyles = makeStyles(styles)

export const Search = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const classes = useStyles()
  const [redirectSearch, setRedirectSearch] = useState(false)
  const [selectedMovieId, setSelectedMovieId] = useState('')
  const [searchString, setSearchString] = useState('')
  const [opened, setOpened] = useState(false)

  const movies = useSelector(getMoviesItems)

  const options = useMemo(() => movies.map(item => ({ value: item.id, label: item.title })), [movies])

  const handleToggle = () => setOpened(state => !state)
  const openSearchPage = () => setRedirectSearch(state => !state)

  const handleChange = e => {
    handleToggle()
    setSelectedMovieId(`${e.value}-${e.label}`)
  }

  const handleInputChange = (value: string) => setSearchString(value)

  const doSearch = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(fetchMovies(value))
      }, TIMEOUT_MS),
    [dispatch]
  )

  useEffect(() => {
    if (searchString.length < QUERY_LENGTH_THRESHOLD) return
    doSearch(searchString)
  }, [searchString, doSearch])

  return innerWidth < desktopWidth ? (
    <>
      {selectedMovieId && <Redirect to={`/movie/${selectedMovieId}`} />}
      {redirectSearch && <Redirect to={APP_ROUTES.DISCOVER_PAGE} />}
      <IconButton onClick={handleToggle} data-testid="buttonSearch" className={classes.iconButton}>
        <SearchIcon fontSize="medium" />
      </IconButton>
      <Drawer anchor="top" open={opened} onClose={handleToggle} classes={{ paper: classes.paper }}>
        <IconButton onClick={openSearchPage} data-testid="buttonSearchPage" className={classes.iconButton}>
          <SearchIcon fontSize="medium" data-testid="searchIcon" />
        </IconButton>
        <Select
          options={options}
          theme={selectTheme}
          styles={select}
          placeholder={t('search')}
          onChange={handleChange}
          onInputChange={handleInputChange}
          data-testid="SearchMobile"
        />
        <IconButton onClick={handleToggle} data-testid="closeDrawer" className={classes.iconButton}>
          <CloseIcon fontSize="medium" />
        </IconButton>
      </Drawer>
    </>
  ) : (
    <>
      {selectedMovieId && <Redirect to={`/movie/${selectedMovieId}`} />}
      {redirectSearch && <Redirect to={APP_ROUTES.DISCOVER_PAGE} />}
      <div className={classes.searchContainer}>
        <Select
          options={options}
          theme={selectTheme}
          styles={select}
          placeholder={t('search')}
          onChange={handleChange}
          onInputChange={handleInputChange}
          name="Search"
        />
        <IconButton onClick={openSearchPage} data-testid="buttonSearch" className={classes.iconButton}>
          <SearchIcon fontSize="medium" data-testid="searchIcon" />
        </IconButton>
      </div>
    </>
  )
}
