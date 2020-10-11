/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
/* App imports */
import { ChildImageSharpFluid, AvailableTag } from '../../../types'
import TagList from '../../../components/tag-list'
const style = require('./heading.module.less')

const Heading = ({ title, tags, cover, coverTitle }: Props) => (
  <div className={style.container}>
    <Img fluid={cover} title={coverTitle} alt={title} />
    <div className={style.title}>
      <h1>{title}</h1>
      <TagList tags={tags} />
    </div>
  </div>
)

Heading.propTypes = {
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  cover: PropTypes.object.isRequired,
  coverTitle: PropTypes.string,
}

interface Props {
  title: string
  tags: AvailableTag[]
  cover: ChildImageSharpFluid['fluid']
  coverTitle: string
}

export default Heading
