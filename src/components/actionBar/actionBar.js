import {useEffect, Suspense, useContext} from 'react'
import PropTypes from 'prop-types'

import {DataTableContext} from 'screens/dataTable/dataTableContext'
import {Input, Select, Clear} from 'components'

import style from './actionBar.module.scss'

/**
 *
 * @param {Object} props
 * @param {Function} props.fetchData
 * @param {Array} props.selectOptions
 * @param {Function} props.setFilter
 *
 * @returns {ReactElement}
 */
function ActionBar({fetchData, selectOptions, setFilter}) {
  const {typeState, dateState} = useContext(DataTableContext)
  const [type, setType] = typeState
  const [date, setDate] = dateState

  /**
   * This useEffect is responsible for executing type change with debouncing.
   */
  useEffect(() => {
    let timeout = undefined

    if (!timeout)
      setTimeout(() => {
        const data = fetchData()

        setFilter(data.filter(datum => type === datum.type))

        timeout = undefined
      }, 0)

    return () => clearTimeout(timeout)
  }, [fetchData, setFilter, type])

  /**
   * This useEffect is responsible for executing date change with debouncing.
   */
  useEffect(() => {
    let timeout = undefined

    if (!timeout)
      setTimeout(() => {
        const data = fetchData()

        setFilter(
          data.filter(
            datum => date >= datum.startDate && date <= datum.endDate,
          ),
        )

        timeout = undefined
      }, 0)

    return () => clearTimeout(timeout)
  }, [date, fetchData, setFilter])

  /**
   *
   * @param {String} state
   *
   * @returns {ReactElement}
   */
  function clearIcon(state) {
    return state ? (
      <Suspense fallback={<></>}>
        <Clear />
      </Suspense>
    ) : (
      <></>
    )
  }

  return (
    <div className={style.container}>
      <div className={style.first}>
        <Select
          value={type}
          id="type"
          name="type"
          options={selectOptions.map(option => ({
            key: option,
            value: option,
          }))}
          secondaryIcon={clearIcon(type)}
          secondaryIconOnClick={() => {
            setType('')
            setFilter([])
          }}
          onChange={e => setType(e.target.value)}
        />
        <Input
          value={date}
          type="date"
          name="date"
          id="date"
          placeholder="date"
          onChange={e => {
            const {value} = e.target

            if (!value) setFilter([])
            setDate(value)
          }}
        />
      </div>
    </div>
  )
}

export default ActionBar

ActionBar.propTypes = {
  data: PropTypes.func,
  selectOptions: PropTypes.array,
  setFilter: PropTypes.func,
}
