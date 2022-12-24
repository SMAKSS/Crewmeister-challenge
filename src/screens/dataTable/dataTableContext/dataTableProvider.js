import {useState, createContext} from 'react'

/**
 * This function is a context for data table.
 */
const DataTableContext = createContext()

function DataTableProvider(props) {
  const [type, setType] = useState('')
  const [date, setDate] = useState('')

  return (
    <DataTableContext.Provider
      value={{typeState: [type, setType], dateState: [date, setDate]}}
    >
      {props.children}
    </DataTableContext.Provider>
  )
}

export {DataTableProvider, DataTableContext}
