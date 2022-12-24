import {useState, createContext} from 'react'

/**
 * This function is a context for selecting table rows.
 */
const SelectRowContext = createContext([[], obj => obj])

function SelectRowProvider(props) {
  const selectedRows = useState({})

  return (
    <SelectRowContext.Provider value={selectedRows}>
      {props.children}
    </SelectRowContext.Provider>
  )
}

export {SelectRowProvider, SelectRowContext}
