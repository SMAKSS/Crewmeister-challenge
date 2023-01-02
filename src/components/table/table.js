import {useState, useEffect, useContext, useRef, useCallback} from 'react'
import PropTypes from 'prop-types'

import {SelectRowContext} from 'contexts'
import {Input} from 'components'
import {NO_RECORD, NUMBER} from 'utils'

import style from './table.module.scss'

/**
 *
 * @param {Array} headers - all of the table headers
 * @param {Array} rows - all of the table row data
 * @param {String} message - custom message in case of no record
 * @param {Boolean} loading - custom message in case of no record
 *
 * @returns {ReactElement} This function is responsible for the table creation
 */
function Table({
  headers = [],
  rows = [],
  message = NO_RECORD,
  loading = false,
}) {
  const [selectedRows, setSelectedRows] = useContext(SelectRowContext)

  const [state, setState] = useState({rows: [], odd: false})
  const [check, setCheck] = useState(false)

  const headerRef = useRef(null)
  const setSelectedRowsRef = useRef(setSelectedRows)

  /**
   *
   * @param {Object} e - event interface of table headers
   * This function is responsible for sorting data by columns (odd clicks ASC, even clicks DESC)
   */
  function sortHandler(e) {
    const target = e.target
    const column = target.dataset.name

    const allHeaders = headerRef.current.querySelectorAll('th > span')

    if (allHeaders.length) {
      allHeaders.forEach(header => (header.textContent = ''))

      const currentColumn = headerRef.current.querySelector(
        `th[data-name=${column}] > span[data-name=sort_${column}]`,
      )

      if (currentColumn) currentColumn.textContent = state.odd ? ' 🔽' : ' 🔼'
    }

    setState(prevState => ({
      ...prevState,
      odd: !prevState.odd,
      rows: rows.sort((a, b) =>
        prevState.odd
          ? a[column] > b[column]
            ? 1
            : -1
          : a[column] > b[column]
          ? -1
          : 1,
      ),
    }))
  }

  /**
   * @params {String|Number} id
   *
   * @returns {undefined} This function is responsible for handling check action and updating the context
   */
  const checkHandler = useCallback(
    id => {
      setSelectedRowsRef.current(prev => ({
        ...prev,
        [id]: rows.find(row => row.id === id),
      }))
    },
    [rows],
  )

  /**
   * @params {String|Number} id
   *
   * @returns {undefined} This function is responsible for handling uncheck action and updating the context
   */
  function uncheckHandler(id) {
    setSelectedRowsRef.current(prev => {
      const stringId = id.toString()

      if (Object.keys(prev).includes(stringId)) delete prev[stringId]

      return {...prev}
    })
  }

  /**
   *
   * @param {Object} e event interface of input checkbox related to each row
   *
   * @returns {undefined} This function is responsible for check and updating selectedRow context for deleting purposes.
   */
  function checkBoxHandler(e) {
    const {target} = e
    const id = Number(target.name)

    if (target.checked) {
      checkHandler(id)
    } else {
      uncheckHandler(id)
    }
  }

  /**
   * This useEffect is responsible for keeping the state.rows updated
   * whenever new data come from the parent.
   */
  useEffect(() => {
    setState(prev => ({...prev, rows: rows}))
  }, [rows])

  /**
   * This useEffect is responsible listening to select all checkbox event
   * and update the checkboxes accordingly
   */
  useEffect(() => {
    if (check && rows.length > 0) {
      rows.forEach(row => {
        checkHandler(row.id)
      })
    } else if (!check) {
      rows.forEach(row => {
        uncheckHandler(row.id)
      })
    }
  }, [check, checkHandler, rows])

  return (
    <main>
      <table className={style.container}>
        <thead className={style.head}>
          <tr ref={headerRef}>
            {headers.map((header, index) => (
              <th
                style={!header.name.includes('note') ? {width: '10rem'} : {}}
                key={`${header.name}-${index}`}
                data-name={header.name}
                onClick={
                  header.name !== NUMBER && !header.name.includes('note')
                    ? e => {
                        sortHandler(e)
                      }
                    : null
                }
              >
                {index === 0 ? (
                  <div className={style.no_cell}>
                    <Input
                      type="checkbox"
                      title=""
                      checked={check}
                      onChange={() => setCheck(prevState => !prevState)}
                    />
                    <span>{header.name}</span>
                  </div>
                ) : header.name !== NUMBER && !header.name.includes('note') ? (
                  <>
                    {header.name}
                    <span data-name={`sort_${header.name}`} />
                  </>
                ) : (
                  header.name
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={style.body}>
          {rows.length === 0 ? (
            <tr className={`${style.empty} unselectable`}>
              <td colSpan={headers.length}>{message}</td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={row.id}>
                <td>
                  <div className={style.no_cell}>
                    <Input
                      type="checkbox"
                      name={row.id}
                      id={row.id}
                      checked={selectedRows[row.id] ?? false}
                      onChange={e => checkBoxHandler(e)}
                    />
                    <span>{index + 1}</span>
                  </div>
                </td>
                <td>{row.name}</td>
                <td>{row.type}</td>
                <td>{row.period}</td>
                <td>{row.memberNote || '-'}</td>
                <td>{row.admitterNote || '-'}</td>
                <td>{row.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  )
}

export default Table

Table.propTypes = {
  headers: PropTypes.array,
  rows: PropTypes.array,
  message: PropTypes.string,
  loading: PropTypes.bool,
}
