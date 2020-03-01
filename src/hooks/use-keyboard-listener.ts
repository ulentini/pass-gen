import { useEventListener } from "web-api-hooks"

export function useKeyboardListener(callback: (event: KeyboardEvent) => void) {
  useEventListener(window, "keypress", callback)
}
