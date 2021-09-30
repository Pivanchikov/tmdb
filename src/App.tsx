import React from 'react'
import { Route, Switch, HashRouter as Router } from 'react-router-dom'

import { Header, Footer } from './components'
import { MainPage, MoviePage, NotFoundPage, DiscoverPage } from './pages'
import { APP_ROUTES } from './routes'
import classes from './App.module.scss'

export const App: React.FC = () => (
  <div className={classes.app}>
    <Router>
      <Header />
      <Switch>
        <Route path={APP_ROUTES.ROOT} exact component={MainPage} />
        <Route path={APP_ROUTES.MOVIE_PAGE} component={MoviePage} />
        <Route path={APP_ROUTES.DISCOVER_PAGE} exact component={DiscoverPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </Router>
  </div>
)
