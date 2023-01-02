import PropTypes from 'prop-types'

import style from './button.module.scss'

/**
 *
 * @param {Object} props
 * @param {String} props.text - button text
 * @param {Function} props.onClick - button onclick handler
 *
 * @returns {ReactElement}
 */
function Button({
  text = 'button',
  onClick = () => console.log('Please add onclick event!'),
  ...rest
}) {
  return (
    <button className={style.button} onClick={onClick} {...rest}>
      <span className={style.label}>{text}</span>
    </button>
  )
}

export default Button

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
}
