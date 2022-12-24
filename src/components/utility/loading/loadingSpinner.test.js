// Here lies the test case for loadingSpinner.js

import {render, screen, cleanup} from '@testing-library/react'

import LoadingSpinner from './loadingSpinner'

afterEach(cleanup)

function renderLoadingSpinner() {
  render(
    <LoadingSpinner
      parentDiv={true}
      display="d-none"
      data-testid="test-spinner"
    />,
  )

  return screen.getByTestId(/test-spinner/i)
}

test('Create a loading spinner', () => {
  const view = renderLoadingSpinner()

  expect(view).toBeInTheDocument()
  expect(view.classList[1]).toBe('d-none')
})
