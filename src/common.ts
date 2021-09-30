export type Deferred<T> =
  | ['HAS_NOT_STARTED_YET']
  | ['IN_PROGRESS']
  | ['RESOLVED', T]

export function deferredMatch<T, Result>(
  d: Deferred<T>,
  hasNotStartedYet: () => void,
  inProgress: () => void,
  resolved: (result: T) => Result,
) {
  switch (d[0]) {
    case "RESOLVED": {
      return resolved(d[1])
    }
    case 'HAS_NOT_STARTED_YET':
      hasNotStartedYet()
      break
    case "IN_PROGRESS": {
      inProgress()
    }
  }
}

export function Call(props: {f: () => (JSX.Element | null)}) {
  return props.f()
}
