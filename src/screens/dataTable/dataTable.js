import {useContext, useEffect, useState, useMemo} from 'react'

import {DataTableContext} from './dataTableContext'

import {Table, LoadingSpinner, ActionBar, Pagination} from 'components'
import {
  get,
  MEMBERS,
  ABSENCES,
  REQUESTED,
  CONFIRMED,
  REJECTED,
  MINIMUM_PERIOD,
  DAY_IN_MS,
  MEMBER,
  TYPE,
  PERIOD,
  MEMBER_NOTE,
  ADMITTER_NOTE,
  STATUS,
  NUMBER,
  NO_RECORD,
  API_ERROR,
  RECORDS_PER_PAGE,
} from 'utils'

/**
 * This is the main view of the app which contains all of forms, assets and tables.
 */
function DataTable() {
  const {typeState, dateState} = useContext(DataTableContext)
  const [type] = typeState
  const [date] = dateState

  const [allData, setAllData] = useState([])
  const [selectOptions, setSelectOptions] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(NO_RECORD)
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastRecord = currentPage * RECORDS_PER_PAGE
  const indexOfFirstRecord = indexOfLastRecord - RECORDS_PER_PAGE

  /**
   * Indicates records in pages
   */
  const currentRecords = useMemo(
    () =>
      type || date
        ? filteredData.slice(indexOfFirstRecord, indexOfLastRecord)
        : allData.slice(indexOfFirstRecord, indexOfLastRecord),
    [allData, date, filteredData, indexOfFirstRecord, indexOfLastRecord, type],
  )

  /**
   * Indicates number of pages
   */
  const nPages = useMemo(
    () =>
      Math.ceil(
        type || date
          ? filteredData.length / RECORDS_PER_PAGE
          : allData.length / RECORDS_PER_PAGE,
      ),
    [allData.length, date, filteredData.length, type],
  )

  /**
   * This useEffect is responsible for getting data from JSON files.
   */
  useEffect(() => {
    const abortController = new AbortController()

    setLoading(true)

    Promise.all([
      get({endpoint: MEMBERS, abortController}),
      get({endpoint: ABSENCES, abortController}),
    ])
      .then(res => {
        const absences = [...res[1].payload]
        const types = []

        for (let i = 0; i < absences.length; i++) {
          const member = res[0].payload.find(
            member => absences[i].userId === member.userId,
          )

          if (absences[i].type && !types.includes(absences[i].type))
            types.push(absences[i].type)

          if (member) {
            const {
              startDate,
              endDate,
              rejectedAt,
              confirmedAt,
              ...absencesRest
            } = absences[i]

            const diffInMs = new Date(endDate) - new Date(startDate)
            const diffInDays = diffInMs / DAY_IN_MS
            const period = diffInDays === 0 ? MINIMUM_PERIOD : diffInDays

            const status = rejectedAt
              ? REJECTED
              : confirmedAt
              ? CONFIRMED
              : REQUESTED

            absences[i] = {
              startDate,
              endDate,
              ...absencesRest,
              period,
              status,
              ...{name: member.name, img: member.image},
            }
            continue
          }
        }

        setAllData(absences)
        setSelectOptions(types)
        setErrorMessage(NO_RECORD)

        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        setErrorMessage(API_ERROR)

        throw new Error(err)
      })

    return () => abortController.abort()
  }, [])

  /**
   * If accessing to firebase database face a problem
   * or being in progress the loading spinner will replace the main page.
   */
  if (loading) {
    return <LoadingSpinner parentDiv={true} stroke={'other'} />
  } else {
    return (
      <>
        <ActionBar
          fetchData={allData}
          setFilter={setFilteredData}
          selectOptions={selectOptions}
        />
        <Table
          headers={[
            {name: NUMBER},
            {name: MEMBER},
            {name: TYPE},
            {name: PERIOD},
            {name: MEMBER_NOTE},
            {name: ADMITTER_NOTE},
            {name: STATUS},
          ]}
          rows={currentRecords}
          message={errorMessage}
        />
        <div>{`Total number of absences: ${allData.length}`}</div>
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </>
    )
  }
}

export default DataTable
