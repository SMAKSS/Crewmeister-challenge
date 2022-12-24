import {lazy} from 'react'

import {DataTableProvider} from './dataTableContext'

const DataTableComponent = lazy(() =>
  import('./dataTable' /* webpackChunkName: "data_table" */),
)

function DataTable(props) {
  return (
    <DataTableProvider>
      <DataTableComponent {...props} />
    </DataTableProvider>
  )
}

export {DataTable}
