import { desktopWidth } from '../constants'
import { primaryMain, primaryLight, primaryLightHover, secondaryMain } from '../../theme/theme'

export const styles = theme => ({
  paper: {
    minHeight: 64,
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'baseline',
    // eslint-disable-next-line @typescript-eslint/prefer-as-const
    flexDirection: 'row' as 'row',
    padding: '10px 15px',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '25%',
  },
  iconButton: {
    color: theme.palette.secondary.main,
  },
})

export const select = {
  container: base => ({
    ...base,
    minWidth: 220,
    width: innerWidth < desktopWidth ? '80%' : '90%',
  }),

  control: (base, state) => ({
    ...base,
    borderColor: state.isFocused ? primaryLightHover : primaryLight,
    boxShadow: null,
    '&:hover': {
      borderColor: primaryLightHover,
    },
  }),

  menu: base => ({
    ...base,
    position: innerWidth < desktopWidth ? 'relative' : 'absolute',
  }),
  option: base => ({
    ...base,
    color: secondaryMain,
  }),
  dropdownIndicator: base => ({
    ...base,
    color: primaryMain,
    '&:hover': { color: primaryMain },
  }),
  placeholder: base => ({
    ...base,
    color: secondaryMain,
  }),
  indicatorSeparator: base => ({
    ...base,
    backgroundColor: primaryMain,
  }),
}

export const selectTheme = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: primaryLightHover,
    primary: primaryLight,
    neutral0: primaryMain,
    neutral80: secondaryMain,
  },
})
