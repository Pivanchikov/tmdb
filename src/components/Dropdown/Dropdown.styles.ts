import { primaryMain, secondaryMain, secondaryDark, primarySelect, primary25Select } from '../../theme/theme'

export const styles = theme => ({
  root: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
  },
  formRoot: {
    minWidth: 320,
    color: theme.palette.primary.main,
    margin: theme.spacing(2),
  },
})

export const select = {
  option: base => ({
    ...base,
    color: primaryMain,
  }),
  control: (base, state) => ({
    ...base,
    minWidth: 320,
    height: 56,
    borderRadius: 4,
    borderColor: state.isFocused ? 'black' : secondaryDark,
    boxShadow: null,
    '&:hover': {
      borderColor: 'black',
    },
  }),
  indicatorSeparator: base => ({
    ...base,
    backgroundColor: secondaryMain,
  }),
  dropdownIndicator: base => ({
    ...base,
    color: secondaryMain,
    '&:hover': { color: secondaryMain },
  }),
  menuPortal: base => ({
    ...base,
    color: primaryMain,
  }),
}

export const theme = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: primary25Select,
    primary: primarySelect,
    neutral80: primaryMain,
  },
})
