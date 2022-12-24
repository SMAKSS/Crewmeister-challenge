import {useRef} from 'react'
import PropTypes from 'prop-types'

import {background} from 'utils'

import style from '../formGroup.module.scss'

/**
 *
 * @param {Object} props
 * @param {HTMLElement} props.icon - main icon
 * @param {HTMLElement} props.secondaryIcon - secondary icon
 * @param {Function} props.secondaryIconOnClick - secondary icon handler
 * @param {String|Number} props.id - input id
 * @param {String} props.type - input type
 * @param {String} props.value - input value
 * @param {Function} props.onChange - input onchange handler
 *
 * @returns {ReactElement} This function is responsible for Input component.
 */
function Input({
  icon = null,
  secondaryIcon = null,
  secondaryIconOnClick = null,
  id = null,
  type = 'text',
  value = '',
  onChange = () => console.log(`Please add onchange event!`),
  ...props
}) {
  const labelRef = useRef(null)

  if (value && labelRef.current) {
    labelRef.current.style.cssText = `background-color: ${background};
  line-height: 1px;
  overflow: visible;
  font-size: 1.2rem;
  opacity: 1;
  visibility: inherit;
  top: 0;`
  } else if (labelRef.current) {
    labelRef.current.style.cssText = ''
  }

  return (
    <div className={style.form_group}>
      {icon && <span className={style.icon}>{icon}</span>}
      <input id={id} type={type} value={value} onChange={onChange} {...props} />
      {secondaryIcon && (
        <span
          className={style.secondary_icon}
          onClick={secondaryIconOnClick}
          style={
            value
              ? {opacity: 1, visibility: 'inherit', transition: 0.2}
              : {opacity: 0, visibility: 'hidden', transition: 0.2}
          }
        >
          {secondaryIcon}
        </span>
      )}
    </div>
  )
}

export default Input

Input.propTypes = {
  icon: PropTypes.node,
  secondaryIcon: PropTypes.node,
  secondaryIconOnClick: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}
