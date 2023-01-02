// Here lies a test case for button.js

import {render, screen, cleanup, fireEvent} from '@testing-library/react'

import Button from './button'

afterEach(cleanup)

const onClick = jest.fn()

function renderButton(onClick, disabled = false) {
  render(
    <Button
      onClick={onClick}
      disabled={disabled}
      text="button"
      data-testid="test-button"
    />,
  )
  return screen.getByTestId(/test-button/i)
}

test('Creating button', () => {
  const view = renderButton(onClick)

  expect(view).toBeInTheDocument()
  expect(view.textContent).toBe('button')
})

test('Button onClick event', () => {
  const view = renderButton(onClick)
  fireEvent.click(view)

  expect(onClick).toHaveBeenCalledTimes(1)
})
