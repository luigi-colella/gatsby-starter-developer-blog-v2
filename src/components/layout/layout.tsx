/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
/* App imports */
import Header from './header'
import '../../style/global.less'
const style = require('./layout.module.less')

const Layout = ({ children, title, className, showHeader }: Props) => (
  <>
    {showHeader ? <Header /> : null}
    <div className={[style.container, className].join(' ')}>
      {title ? (
        <div className={style.title}>
          <h1>{title}</h1>
        </div>
      ) : null}
      {children}
    </div>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  showHeader: PropTypes.bool,
}

Layout.defaultProps = {
  title: '',
  className: '',
  showHeader: true,
}

interface Props {
  children: React.ReactNode
  title?: string
  className?: string
  showHeader?: boolean
}

export default Layout
