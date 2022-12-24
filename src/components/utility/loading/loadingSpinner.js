import PropTypes from 'prop-types'

import styles from './loadingSpinner.module.scss'

/**
 *
 * @param {Object} props
 * @param {Boolean} props.parentDiv if its true, the spinner will wrapped within the parent div
 * @param {String} props.display the customized display class like d-none class
 * @param {String} props.stroke  color of stroke
 *
 * @returns {ReactElement} It will return a loading spinner with the desired colored passed by stroke
 *
 */
function LoadingSpinner({
  parentDiv = false,
  display = '',
  stroke = 'other',
  ...props
}) {
  return (
    <div
      className={`${
        parentDiv ? `${styles.custom_loader_container}` : ''
      } ${display}`}
      {...props}
    >
      <svg
        className={styles.spinner}
        width="35px"
        height="35px"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={`${styles.path} ${
            styles[
              stroke === 'other'
                ? 'path-animation-stroke-other'
                : 'path-animation-stroke-white'
            ]
          }`}
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="30"
        />
      </svg>
    </div>
  )
}

export default LoadingSpinner

LoadingSpinner.propTypes = {
  parentDiv: PropTypes.bool,
  display: PropTypes.string,
  stroke: PropTypes.string,
}
