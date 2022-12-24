import {SelectRowProvider} from 'contexts'
import {DataTable} from 'screens'

import './app.scss'

/**
 * This module is a main wrapper for whole app.
 */
function App() {
  return (
    <SelectRowProvider>
      <DataTable />
    </SelectRowProvider>
  )
}

export default App
