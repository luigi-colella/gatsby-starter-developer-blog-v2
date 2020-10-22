/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
/* App imports */
import { AvailableTag } from '../../types'
import Chip from '../chip'
import Config from '../../../config'
import Utils from '../../utils'
import Lang from '../../i18n/default'
const style = require('./tag-list.module.less')

const TagList = ({ tags }: Props) => (
  <div className={style.tags}>
    {tags
      .filter((tag, index) => index === tags.indexOf(tag)) // Remove duplicate values
      .sort()
      .map(tag => {
        return (
          <Link to={Utils.resolveUrl(Config.pages.tag, tag)} key={tag}>
            <Chip hoverEffect={true}>
              {Lang.tags[tag].name || Utils.capitalize(tag)}
            </Chip>
          </Link>
        )
      })
    }
  </div>
)

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
}

interface Props {
  tags: AvailableTag[]
}

export default TagList
