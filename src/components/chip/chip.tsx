/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
/* App imports */
const style = require('./chip.module.less')

const Chip = ({ children, hoverEffect, className }: Props) => (
  <label
    className={[
      hoverEffect ? style.chip_with_hover : style.chip,
      className || '',
    ].join(' ')}
  >
    {children}
  </label>
)

Chip.propTypes = {
  children: PropTypes.node.isRequired,
  hoverEffect: PropTypes.bool,
  className: PropTypes.string,
}

interface Props {
  children: React.ReactNode
  hoverEffect?: boolean
  className?: string
}

export default Chip
