import { useEffect, useState } from 'react'

export function usePersistentState<T>(load: () => T, save: (value: T) => void) {
  const [value, setValue] = useState<T>(load)
  useEffect(() => save(value), [save, value])
  return [value, setValue] as const
}
