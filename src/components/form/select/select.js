import PropTypes from 'prop-types'

import style from '../formGroup.module.scss'

/**
 *
 * @param {Object} props
 * @param {HTMLElement} props.icon - main icon
 * @param {HTMLElement} props.secondaryIcon - secondary icon
 * @param {Function} props.secondaryIconOnClick - secondary icon handler
 * @param {String} props.placeholder - select placeholder
 * @param {String} props.id - select id
 * @param {String} props.name name - select name
 * @param {Array} props.options - select options
 * @param {String} props.value - select value
 * @param {Function} props.onChange - select onchange handler
 *
 * @returns {ReactElement} This function is responsible for select component.
 */
function Select({
  icon = null,
  secondaryIcon = null,
  secondaryIconOnClick = null,
  placeholder = null,
  id = null,
  name = null,
  options = [],
  value = '',
  onChange = () => console.log('Please add onchange event!'),
  ...props
}) {
  return (
    <div className={style.form_group}>
      {icon && <span>{icon}</span>}
      <select
        placeholder={placeholder}
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        {...props}
      >
        <option value="" disabled={true}>
          {`Choose a ${name}`}
        </option>
        {options.map(option => (
          <option
            key={option.key}
            value={option.key}
            disabled={option.disabled ? true : false}
          >
            {option.value}
          </option>
        ))}
      </select>
      {secondaryIcon && (
        <span
          className={`${style.secondary_icon} ${style.arrow}`}
          onClick={secondaryIconOnClick}
        >
          {secondaryIcon}
        </span>
      )}
    </div>
  )
}

export default Select

Select.propTypes = {
  icon: PropTypes.node,
  secondaryIcon: PropTypes.node,
  secondaryIconOnClick: PropTypes.func,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
}
