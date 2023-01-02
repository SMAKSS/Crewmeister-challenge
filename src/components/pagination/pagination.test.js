// Here lies a test case for pagination.js

import {render, screen, cleanup} from '@testing-library/react'

import Pagination from './pagination'

afterEach(cleanup)

const setCurrentPage = jest.fn()

function renderPagination(setCurrentPage) {
  render(
    <Pagination
      nPages={5}
      currentPage={3}
      setCurrentPage={setCurrentPage}
      data-testid="test-pagination"
    />,
  )
  return screen.getByTestId(/test-pagination/i)
}

test('Creating pagination', () => {
  const view = renderPagination(setCurrentPage)

  expect(view).toBeInTheDocument()
})

test('Pagination onchange event', () => {
  setCurrentPage(2)

  expect(setCurrentPage).toHaveBeenCalledTimes(1)
})
