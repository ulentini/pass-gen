import { useCallback, useEffect, useRef } from "react"

export function useKeyboardListener(callback: (event: KeyboardEvent) => void) {
  useEventListener(window, "keypress", callback)
}

type EventMap<T> = T extends Window
  ? WindowEventMap
  : T extends Document
  ? DocumentEventMap
  : { [key: string]: Event }

function useEventListener<
  T extends EventTarget,
  K extends keyof EventMap<T> & string
>(
  target: T,
  type: K,
  callback: (event: EventMap<T>[K]) => void,
  options?: AddEventListenerOptions,
): void {
  // Based on the implementation of `useInterval`
  const savedCallback = useEventCallback(callback)

  useEffect(() => managedEventListener(target, type, savedCallback, options), [
    options,
    savedCallback,
    target,
    type,
  ])
}

function managedEventListener<
  T extends EventTarget,
  K extends keyof EventMap<T> & string
>(
  target: T,
  type: K,
  callback: (event: EventMap<T>[K]) => void,
  options?: AddEventListenerOptions,
): () => void {
  target.addEventListener(type, callback as EventListener, options)
  return (): void => {
    target.removeEventListener(type, callback as EventListener, options)
  }
}

function useEventCallback<T extends Function>(
  callback: T,
): (...args: unknown[]) => T {
  // Source: https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = callback
  }, [callback])

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return useCallback((...args): T => ref.current!(...args), [ref])
}
