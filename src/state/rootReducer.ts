import { combineReducers } from 'redux'
import { moviesSlice } from './movies'

export const rootReducer = combineReducers({ movies: moviesSlice.reducer })
