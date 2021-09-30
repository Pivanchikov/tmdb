export type DropdownProps = {
  options: { value: string | number; label: string }[]
  onChange?: (e: React.SyntheticEvent<EventTarget>) => void
  emptyValue?: { value: string | number; label: string }
  defaultValue?: string
  testId?: string
}
