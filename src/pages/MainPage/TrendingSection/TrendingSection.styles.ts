export const styles = theme => ({
  title: {
    padding: 10,
    color: theme.palette.primary.main,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  switchContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  track: { backgroundColor: theme.palette.primary.main },
  thumb: { backgroundColor: theme.palette.primary.light },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    margin: '1rem',
    minHeight: 435,
  },
})
