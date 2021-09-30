/* eslint-disable react/prop-types */
import SwiperCore, { Navigation } from 'swiper'
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react'
import { makeStyles } from '@material-ui/core'

import { MovieCard, PeopleCard } from '../'
import { Movie } from '../../state/types'
import { People } from '../../components/PeopleCard/types'
import { styles } from './Swiper.styles'

import 'swiper/swiper-bundle.css'
import './Swiper.css'

type SwiperProps = {
  items: Movie[] | People[]
  people?: boolean
}

SwiperCore.use([Navigation])

const useStyles = makeStyles(styles)

const breakpoints = {
  250: {
    slidesPerView: 1,
  },
  520: {
    slidesPerView: 2,
  },
  750: {
    slidesPerView: 3,
  },
  1030: {
    slidesPerView: 4,
  },
  1300: {
    slidesPerView: 5,
  },
}

export const Swiper = ({ items, people = false }: SwiperProps) => {
  const classes = useStyles()

  return (
    <SwiperReact
      spaceBetween={20}
      slidesPerView={5}
      loop={true}
      breakpoints={breakpoints}
      navigation
      className={classes.swiper}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index} className={classes.slider}>
          {people ? <PeopleCard people={item} /> : <MovieCard movie={item} />}
        </SwiperSlide>
      ))}
    </SwiperReact>
  )
}
