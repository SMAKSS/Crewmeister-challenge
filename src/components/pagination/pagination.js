import {useEffect} from 'react'
import PropTypes from 'prop-types'

import style from './pagination.module.scss'

/**
 *
 * @param {Object} props
 * @param {Number} props.nPages
 * @param {Number} props.currentPage
 * @param {Function} props.setCurrentPage
 *
 * @returns {ReactElement}
 */
function Pagination({nPages, currentPage, setCurrentPage, ...rest}) {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1)
  }

  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1)
  }

  useEffect(() => {
    if (currentPage > nPages) setCurrentPage(nPages + 1)
  }, [currentPage, nPages, setCurrentPage])

  return (
    <footer {...rest}>
      <ul className={style.list}>
        <li className={style.item}>
          <span className={style.link} onClick={prevPage}>
            {'Previous'}
          </span>
        </li>
        {pageNumbers.map(pgNumber => (
          <li
            key={pgNumber}
            className={`${style.item} ${
              currentPage === pgNumber ? style.active : ''
            } `}
          >
            <span
              onClick={() => setCurrentPage(pgNumber)}
              className={style.link}
            >
              {pgNumber}
            </span>
          </li>
        ))}
        <li className={style.item}>
          <span className={style.link} onClick={nextPage}>
            {'Next'}
          </span>
        </li>
      </ul>
    </footer>
  )
}

export default Pagination

Pagination.propTypes = {
  nPages: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
}
