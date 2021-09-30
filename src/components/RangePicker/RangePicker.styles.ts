export const styles = theme => ({
  trackContainer: {
    height: 36,
    display: 'flex',
    width: '100%',
  },
  track: {
    height: 5,
    width: '100%',
    borderRadius: 4,
    alignSelf: 'center',
  },
  thumb: {
    height: 25,
    width: 25,
    borderRadius: 4,
    backgroundColor: theme.palette.secondary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: `0 2px 6px ${theme.palette.secondary.dark}`,
  },
  thumbSquare: {
    height: 10,
    width: 5,
  },
  label: {
    color: theme.palette.primary.main,
    // eslint-disable-next-line @typescript-eslint/prefer-as-const
    textAlign: 'center' as 'center',
  },
})
