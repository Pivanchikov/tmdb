import { Range, getTrackBackground } from 'react-range'
import { makeStyles, Typography } from '@material-ui/core'

import { styles } from './RangePicker.styles'
import { primaryMain, secondaryDark } from '../../theme/theme'
import { RangePickerProps } from './types'
import { ClassNameMap } from '@material-ui/styles'

const useStyles = makeStyles(styles)

type renderTrackProps = {
  props: {
    style: React.CSSProperties
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref: React.RefObject<any>
    onMouseDown: (e: React.MouseEvent) => void
    onTouchStart: (e: React.TouchEvent) => void
  }
  children: React.ReactNode
  classes: ClassNameMap
  values: number[]
  min: number
  max: number
}

type renderThumbProps = {
  props: {
    key: number
    style: React.CSSProperties
    tabIndex?: number
    'aria-valuemax': number
    'aria-valuemin': number
    'aria-valuenow': number
    draggable: boolean
    role: string
    onKeyDown: (e: React.KeyboardEvent) => void
    onKeyUp: (e: React.KeyboardEvent) => void
  }
  isDragged: boolean
  classes: ClassNameMap
}

const renderTrack = ({ props, children, classes, values, min, max }: renderTrackProps) => {
  const rangeStyles = {
    background: getTrackBackground({
      values,
      colors: [secondaryDark, primaryMain],
      min,
      max,
    }),
  }

  return (
    <div className={classes.trackContainer}>
      <div ref={props.ref} style={rangeStyles} className={classes.track}>
        {children}
      </div>
    </div>
  )
}

const renderThumb = ({ props, isDragged, classes }: renderThumbProps) => (
  <div {...props} className={classes.thumb}>
    <div
      style={{
        backgroundColor: isDragged ? primaryMain : secondaryDark,
      }}
      className={classes.thumbSquare}
    />
  </div>
)

export const RangePicker = ({ step, min, max, values, onChange, label }: RangePickerProps) => {
  const classes = useStyles()

  return (
    <>
      <Range
        values={values}
        step={step}
        min={min}
        max={max}
        onChange={onChange}
        renderTrack={({ props, children }) => renderTrack({ props, children, classes, values, min, max })}
        renderThumb={({ props, isDragged }) => renderThumb({ props, isDragged, classes })}
      />
      <Typography className={classes.label}>{label}</Typography>
    </>
  )
}
