import { useState, useRef } from 'react'
import { MenuItem, makeStyles, Button, Modal, Backdrop, Typography } from '@material-ui/core'
import { languages } from '../constants'
import { useTranslation } from 'react-i18next'
import ReactCountryFlag from 'react-country-flag'
import CloseIcon from '@material-ui/icons/Close'

import { styles } from './LanguageSwitcher.styles'

const useStyles = makeStyles(styles)

export const LanguageSwitcher = () => {
  const classes = useStyles()
  const [opened, setOpened] = useState(false)
  const { t, i18n } = useTranslation()

  const anchorRef = useRef<HTMLButtonElement>(null)

  const handleToggle = () => setOpened(state => !state)
  const closeMenu = () => setOpened(false)
  const changeLanguage = e => {
    i18n.changeLanguage(e.target.id)
    closeMenu()
  }

  return (
    <>
      <Button
        ref={anchorRef}
        onClick={handleToggle}
        classes={{ root: classes.languageSwitcher, label: classes.label }}
      >
        {i18n.language}
      </Button>
      <Modal
        className={classes.modal}
        open={opened}
        onClose={handleToggle}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper}>
          <header className={classes.header}>
            <Typography variant="h5" className={classes.title}>
              {t('selectLanguage')}
            </Typography>
            <CloseIcon
              fontSize="medium"
              classes={{ root: classes.closeIcon }}
              onClick={handleToggle}
              data-testid="closeModal"
            />
          </header>
          <section className={classes.container}>
            {languages.map((item, index) => {
              const [flag, languageCode] = item

              return (
                <MenuItem
                  className={classes.item}
                  key={index}
                  id={languageCode}
                  onClick={changeLanguage}
                  data-testid="lang"
                >
                  <ReactCountryFlag countryCode={flag} svg className={classes.marginRight} />
                  {t(languageCode)}
                </MenuItem>
              )
            })}
          </section>
        </div>
      </Modal>
    </>
  )
}
