/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
/* App imports */
const style = require('./button.module.less')

const Button = ({ children, to, buttonStyle }: Props) => (
  <Link to={to} className={`${style.button} ${buttonStyle}`}>
    {children}
  </Link>
)

Button.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  buttonStyle: PropTypes.string,
}

Button.defaultProps = {
  buttonStyle: '',
}

interface Props {
  children: React.ReactNode
  to: string
  buttonStyle?: string
}

export default Button
