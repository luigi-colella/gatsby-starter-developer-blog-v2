/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
const Disqus = require('gatsby-plugin-disqus').Disqus

const Comments = ({ url, id, title }: Props) => (
  <Disqus
    config={{
      url: url,
      identifier: id,
      title: title
    }}
  />
)

Comments.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

interface Props {
  url: string
  id: string
  title: string
}

export default Comments
