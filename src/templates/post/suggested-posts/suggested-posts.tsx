/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
/* App imports */
import PostList from '../../../components/post-list'
import { ChildImageSharpFluid, AvailableTag } from '../../../types'
const style = require('./suggested-posts.module.less')

const SuggestedPosts = ({ posts }: Props) => (
  <div>
    <PostList posts={posts} contentClassName={style.content} />
  </div>
)

SuggestedPosts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      edge: PropTypes.shape({
        node: PropTypes.object,
      }),
    })
  ).isRequired,
}

export interface Props {
  posts: Array<{
    node: {
      fileAbsolutePath: string
      frontmatter: {
        path: string
        title: string
        tags: AvailableTag[]
        excerpt: string
        cover: {
          childImageSharp: ChildImageSharpFluid
        }
      }
    }
  }>
}

export default SuggestedPosts
