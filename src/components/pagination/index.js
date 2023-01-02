import {lazy} from 'react'

const Pagination = lazy(() =>
  import('./pagination' /* webpackChunkName: "pagination" */),
)

export {Pagination}
