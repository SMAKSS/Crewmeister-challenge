import {lazy} from 'react'

const ActionBar = lazy(() =>
  import('./actionBar' /* webpackChunkName: "action_bar" */),
)

export {ActionBar}
