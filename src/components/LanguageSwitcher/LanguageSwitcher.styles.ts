export const styles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    width: 360,
  },
  languageSwitcher: {
    minWidth: 28,
    height: 26,
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: 3,
    padding: 1,
    fontSize: '0.8rem',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    cursor: 'pointer',
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
  },
  label: {
    color: 'inherit',
  },
  closeIcon: {
    fill: theme.palette.primary.main,
    cursor: 'pointer',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: theme.palette.primary.main,
  },
  item: {
    color: theme.palette.primary.main,
    width: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginRight: {
    marginRight: 10,
  },
  container: {
    display: 'flex',
    marginTop: 20,
    justifyContent: 'space-around',
  },
})
