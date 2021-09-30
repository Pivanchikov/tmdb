import classes from './MainPage.module.scss'
import { PopularSection, NowPlayingSection, TrendingSection, UpcomingSection, TopRatedSection } from './'

export const MainPage = () => (
  <div className={classes.container}>
    <PopularSection />
    <TrendingSection />
    <NowPlayingSection />
    <UpcomingSection />
    <TopRatedSection />
  </div>
)
