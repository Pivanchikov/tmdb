export const styles = theme => ({
  container: {
    width: 202,
    // eslint-disable-next-line @typescript-eslint/prefer-as-const
    textAlign: 'center' as 'center',
    padding: 10,
    boxShadow: '0 2px 8px rgb(0 0 0 / 17%)',
    height: 383,
  },

  title: {
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },

  vote: {
    width: 'auto',
    marginBottom: 5,
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
})
