import { useState } from 'react'
import { IconButton, List, makeStyles, SwipeableDrawer, ListItem, ListItemText } from '@material-ui/core'
import MenuTwoToneIcon from '@material-ui/icons/MenuTwoTone'
import { useTranslation } from 'react-i18next'

import { styles } from './BurgerMenu.styles'
import { MenuProps } from './types'

const useStyles = makeStyles(styles)

export const BurgerMenu = ({ items }: MenuProps) => {
  const classes = useStyles()
  const [opened, setOpened] = useState(false)
  const { t } = useTranslation()

  const toggleDrawer = () => setOpened(state => !state)

  return (
    <>
      <IconButton onClick={toggleDrawer} className={classes.icon}>
        <MenuTwoToneIcon fontSize="large" />
      </IconButton>
      <SwipeableDrawer
        anchor={'left'}
        open={opened}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
        classes={{ paper: classes.root }}
      >
        <List>
          {items.top.map(text => (
            <ListItem button key={text}>
              <ListItemText primary={t(text)} classes={{ primary: classes.list }} />
            </ListItem>
          ))}
        </List>
        <List>
          {items.middle.map(text => (
            <ListItem button key={text}>
              <ListItemText primary={t(text)} classes={{ primary: classes.item }} />
            </ListItem>
          ))}
        </List>
        <List>
          {items.bottom.map(text => (
            <ListItem button key={text}>
              <ListItemText primary={t(text)} classes={{ primary: classes.item }} />
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
    </>
  )
}
