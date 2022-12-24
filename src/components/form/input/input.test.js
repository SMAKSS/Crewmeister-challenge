// Here lies a test case for input.js

import {render, screen, cleanup, fireEvent} from '@testing-library/react'

import Input from './input'

afterEach(cleanup)

const onChange = jest.fn()

function renderInput(onChange) {
  render(
    <Input
      id="search"
      type="text"
      value="Mike"
      icon={<span />}
      secondaryIcon={<span />}
      onChange={onChange}
      data-testid="test-input"
    />,
  )
  return screen.getByTestId(/test-input/i)
}

test('Creating input', () => {
  const view = renderInput(onChange)

  expect(view).toBeInTheDocument()
  expect(view.value).toBe('Mike')
  expect(view.type).toBe('text')
})

test('Input onchange event', () => {
  const view = renderInput(onChange)
  fireEvent.change(view, {target: {value: 'Ines'}})

  expect(onChange).toHaveBeenCalledTimes(1)
})
