/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
/* App imports */
import { ChildImageSharpFluid, AvailableTag } from '../../types'
import TagList from '../tag-list'
import Utils from '../../utils'
const style = require('./post-list.module.less')

const PostList = ({ posts, contentClassName }: Props) => (
  <div className={style.container}>
    {posts.map((post, index) => {
      const { title, date, path, tags, cover, excerpt } = post.node.frontmatter
      return (
        <div key={title} className={style.post}>
          <div className={style.cover}>
            <Link to={Utils.resolveUrl(path)}>
              <Img
                fluid={cover.childImageSharp.fluid}
                title={title}
                alt={title}
              />
            </Link>
          </div>
          <div className={[style.content, contentClassName].join(' ')}>
            <Link to={Utils.resolveUrl(path)}>
              {date ? <label>{date}</label> : null}
              <h3>{title}</h3>
              <p>{excerpt}</p>
            </Link>
            <TagList tags={tags} />
          </div>
        </div>
      )
    })}
  </div>
)

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        frontmatter: PropTypes.shape({
          title: PropTypes.string.isRequired,
          date: PropTypes.string,
          path: PropTypes.string.isRequired,
          tags: PropTypes.arrayOf(PropTypes.string).isRequired,
          excerpt: PropTypes.string.isRequired,
          cover: PropTypes.shape({
            childImageSharp: PropTypes.shape({
              fluid: PropTypes.object.isRequired,
            }).isRequired,
          }).isRequired,
        }),
      }),
    })
  ),
  contentClassName: PropTypes.string,
}

PostList.defaultProps = {
  contentClassName: '',
}

export interface Props {
  posts: Array<{
    node: {
      frontmatter: {
        title: string
        date?: string
        path: string
        tags: AvailableTag[]
        excerpt: string
        cover: {
          childImageSharp: ChildImageSharpFluid
        }
      }
    }
  }>
  contentClassName?: string
}

export default PostList
