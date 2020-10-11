/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
import 'prismjs/themes/prism-solarizedlight.css'
import './highlight-syntax.less'
/* App imports */
const style = require('./article.module.less')

const Article = ({ html }: Props) => (
  <div className={style.container}>
    <article dangerouslySetInnerHTML={{ __html: html }} />
  </div>
)

Article.propTypes = {
  html: PropTypes.string.isRequired,
}

interface Props {
  html: string
}

export default Article
