import { useState, useRef } from 'react'
import {
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  makeStyles,
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { styles, transform } from './MenuDropdown.styles'

interface Props {
  name: string
  items: Array<string>
}

const useStyles = makeStyles(styles)

export const MenuDropdown = ({ name, items }: Props) => {
  const classes = useStyles()
  const [opened, setOpened] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)
  const { t } = useTranslation()

  const handleToggle = () => setOpened(state => !state)

  return (
    <div className={classes.root}>
      <>
        <Button ref={anchorRef} onClick={handleToggle} className={classes.button}>
          {t(name)}
        </Button>
        <Popper open={opened} anchorEl={anchorRef.current} transition onMouseLeave={handleToggle}>
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} style={transform}>
              <Paper>
                <ClickAwayListener onClickAway={handleToggle}>
                  <MenuList>
                    {items.map((item, index) => (
                      <MenuItem onClick={handleToggle} className={classes.item} key={index}>
                        {t(item)}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    </div>
  )
}
