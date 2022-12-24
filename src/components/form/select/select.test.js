// Here lies a test case for select.js

import {render, screen, cleanup, fireEvent} from '@testing-library/react'

import Select from './select'

afterEach(cleanup)

const onChange = jest.fn()

function renderSelect(onChange) {
  render(
    <Select
      id="search"
      value="option-one"
      icon={<span />}
      secondaryIcon={<span />}
      onChange={onChange}
      data-testid="test-select"
      options={[
        {key: 'option-one'},
        {key: 'option-two'},
        {key: 'option-three', disabled: true},
      ]}
    />,
  )
  return screen.getByTestId(/test-select/i)
}

test('Creating select', () => {
  const view = renderSelect(onChange)

  expect(view).toBeInTheDocument()
  expect(view.value).toBe('option-one')
})

test('Select onchange event', () => {
  const view = renderSelect(onChange)
  fireEvent.change(view, {target: {value: 'option-two'}})

  expect(onChange).toHaveBeenCalledTimes(1)
})

test('Select disabled option', () => {
  const view = renderSelect(onChange)
  fireEvent.change(view, {target: {value: 'option-three'}})

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(view.value).toBe('option-one')
  expect(view.options[3]).toHaveAttribute('disabled')
})
