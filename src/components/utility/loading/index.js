import {lazy} from 'react'

const LoadingSpinner = lazy(() =>
  import('./loadingSpinner' /* webpackChunkName: "loading_spinner" */),
)

export {LoadingSpinner}
