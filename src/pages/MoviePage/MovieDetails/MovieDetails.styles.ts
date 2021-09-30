export const styles = theme => ({
  container: {
    margin: 10,
    padding: 10,
    boxShadow: '0 2px 8px rgb(0 0 0 / 17%)',
    display: 'flex',
  },

  title: {
    color: theme.palette.primary.main,
  },

  vote: {
    width: 'auto',
    marginBottom: 5,
  },

  poster: {
    transition: '0.5s',
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: '#eeeeee',
  },
  movieInfo: {
    paddingLeft: 20,
    width: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  date: {
    color: theme.palette.primary.main,
    fontSize: '0.8rem',
  },
  overview: {
    color: theme.palette.primary.main,
    textAlign: 'justify' as const,
    marginTop: '1rem',
  },
  genre: {
    display: 'inline-block',
    border: `1px solid ${theme.palette.primary.main}`,
    padding: 5,
    margin: '5px 5px 5px 0',
  },
})
