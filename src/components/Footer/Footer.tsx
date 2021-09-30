import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, IconButton } from '@material-ui/core'
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'

import main_logo from '../../assets/img/main_logo.svg'
import classes from './Footer.module.scss'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { linkName, copyright } from './constants'

export const Footer: React.FC = () => {
  const { t } = useTranslation()

  return (
    <footer className={classes.footer}>
      <section className={classes.footer__content}>
        <div className={classes.footer__width}>
          <div className={classes.footer__nav}>
            <span data-testid="copyright">{copyright}</span>
            {linkName.map((item, key) => (
              <Fragment key={key}>
                <span className={classes.footer__dot}>.</span>
                <Link href="#" color="secondary" data-testid="links">
                  {t(item)}
                </Link>
              </Fragment>
            ))}
          </div>
        </div>
        <img src={main_logo} alt="TMDB" width="154px" height="24px" data-testid="logo" />
        <div className={classes.footer__width}>
          <div className={classes.footer__toolbar}>
            <LanguageSwitcher />
            <IconButton size="small" className={classes.socialButton}>
              <FacebookIcon />
            </IconButton>
            <IconButton size="small" className={classes.socialButton}>
              <TwitterIcon />
            </IconButton>
            <IconButton size="small" className={classes.socialButton}>
              <InstagramIcon />
            </IconButton>
          </div>
        </div>
      </section>
    </footer>
  )
}
