export type RangePickerProps = {
  step: number
  min: number
  max: number
  values: number[]
  label: React.ReactNode
  onChange: (years: number[]) => void
}
