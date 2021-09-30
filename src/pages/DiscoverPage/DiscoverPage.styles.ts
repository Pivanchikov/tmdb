export const styles = theme => ({
  container: {
    minHeight: 'calc(100vh - 128px)',
  },

  linksContainer: {
    display: 'flex',
    width: 370,
    margin: '0 auto',
  },

  button: {
    width: 150,
    backgroundColor: theme.palette.primary.main,
    display: 'block',
    color: theme.palette.secondary.main,
    margin: '20px auto',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },

  center: {
    paddingTop: '1.5rem',
    margin: '0 auto',
    width: 740,
  },

  year: {
    margin: '0 auto',
    width: 740,
  },

  loader: {
    display: 'flex',
    justifyContent: 'center',
    margin: '1rem',
  },

  '@media screen and (max-width: 745px)': {
    container: {
      minHeight: 'calc(100vh - 176px)',
    },
  },

  '@media screen and (max-width: 959px)': {
    center: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 'auto',
      justifyContent: 'center',
    },
    year: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 'auto',
      justifyContent: 'center',
    },
  },
})
