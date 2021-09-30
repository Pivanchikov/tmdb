import React from 'react'
import { Hidden, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import main_logo from '../../assets/img/main_logo.svg'
import { LanguageSwitcher, BurgerMenu, MenuDropdown } from '../'
import classes from './Header.module.scss'
import { films, serials, people, another, burgerItems } from '../constants'
import { Search } from '../Search'

export const Header: React.FC = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const redirectToMain = () => history.push('')

  return (
    <header className={classes.header}>
      <section className={classes.header__content}>
        <Hidden mdUp>
          <BurgerMenu items={burgerItems} />
        </Hidden>
        <div className={classes.header__navigation}>
          <img
            src={main_logo}
            alt="TMDB"
            width="154px"
            height="24px"
            data-testid="logo"
            onClick={redirectToMain}
          />
          <Hidden smDown>
            <MenuDropdown name="movies" items={films} />
            <MenuDropdown name="tvShows" items={serials} />
            <MenuDropdown name="people" items={people} />
            <MenuDropdown name="more" items={another} />
          </Hidden>
        </div>
        <Hidden mdDown>
          <Search />
        </Hidden>
        <div className={classes.toolbar}>
          <LanguageSwitcher />
          <Hidden smDown>
            <Button className={classes.button}>{t('signIn')}</Button>
            <Button className={classes.button}>{t('signUp')}</Button>
          </Hidden>
          <Hidden lgUp>
            <Search />
          </Hidden>
        </div>
      </section>
    </header>
  )
}
