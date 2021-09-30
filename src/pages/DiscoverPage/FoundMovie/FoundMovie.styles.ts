/* eslint-disable @typescript-eslint/prefer-as-const */
export const styles = theme => ({
  container: {
    width: 720,
    margin: '30px auto',
    padding: 20,
    display: 'flex',
    boxShadow: `0 0 0.4em ${theme.palette.primary.main}`,
  },
  movieInfo: {
    paddingLeft: 20,
    width: '100%',
  },
  poster: {
    transition: '0.5s',
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: '#eeeeee',
    '&:hover': {
      transform: 'scale(1.05)',
      cursor: 'pointer',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  title: {
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  vote: {
    backgroundColor: theme.palette.primary.main,
    width: 60,
    textAlign: 'center' as 'center',
    color: theme.palette.secondary.main,
  },
  date: {
    color: theme.palette.primary.main,
    fontSize: '0.8rem',
  },
  overview: {
    color: theme.palette.primary.main,
    textAlign: 'justify' as 'justify',
    marginTop: '1rem',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    margin: '0 5px',
    fontSize: '0.7rem',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  movieNotFound: {
    color: theme.palette.primary.main,
    margin: '0 auto',
  },

  '@media screen and (max-width: 959px)': {
    container: {
      width: 360,
      flexDirection: 'column' as 'column',
      textAlign: 'center' as 'center',
    },
    movieInfo: {
      padding: '10px 0',
    },
    header: {
      padding: '10px 0',
      maxWidth: 400,
      justifyContent: 'space-around',
      margin: '0 auto',
    },
  },
  '@media screen and (max-width: 370px)': {
    container: {
      width: 320,
    },
  },
})
