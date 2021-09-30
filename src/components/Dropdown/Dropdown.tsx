import { useMemo } from 'react'
import { FormControl, makeStyles } from '@material-ui/core'
import Select from 'react-select'

import { styles, select, theme } from './Dropdown.styles'
import { DropdownProps } from './types'

const useStyles = makeStyles(styles)

export const Dropdown = ({ options, defaultValue = '', onChange, emptyValue, testId }: DropdownProps) => {
  const classes = useStyles()
  const opts = useMemo(() => (emptyValue ? [emptyValue, ...options] : options), [options, emptyValue])
  const defaultVal = opts.filter(item => item.value === defaultValue)

  return (
    <FormControl variant="outlined" classes={{ root: classes.formRoot }} data-testid={testId}>
      <Select defaultValue={defaultVal} options={opts} styles={select} theme={theme} onChange={onChange} />
    </FormControl>
  )
}
