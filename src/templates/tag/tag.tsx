/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
/* App imports */
import { ChildImageSharpFluid, AvailableTag } from '../../types'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import PostList from '../../components/post-list'
import Config from '../../../config'
import Utils from '../../utils'
import Lang from '../../i18n/default'
const style = require('./tag.module.less')

const TagPage = ({ data, pageContext }: Props) => {
  const tag = pageContext.tag
  const tagName = Lang.tags[tag].name || Utils.capitalize(tag)
  const tagImage = (() => {
    let edge = data.allFile.edges.find(edge => edge.node.name === tag)
    if (edge) {
      return edge.node.childImageSharp.fluid
    } else {
      throw 'Not image file found for tag: ' + tag
    }
  })()

  return (
    <Layout>
      <SEO
        title={tagName}
        description={`${Lang.templates.tag.pageTitle} ${tagName}`}
        path={Utils.resolveUrl(Config.pages.tag, tag)}
        keywords={[tagName]}
      />
      <div className={style.heading}>
        <div>
          <h1>{tagName}</h1>
        </div>
        <div className={style.cover}>
          <Img fluid={tagImage} loading={'eager'} />
        </div>
      </div>
      <PostList posts={data.allMarkdownRemark.edges} />
    </Layout>
  )
}

TagPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    allFile: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            name: PropTypes.string.isRequired,
            childImageSharp: PropTypes.shape({
              fluid: PropTypes.object.isRequired,
            }).isRequired,
          }).isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }).isRequired,
}

export interface Props {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
          frontmatter: {
            title: string
            date: string
            path: string
            tags: AvailableTag[]
            excerpt: string
            cover: {
              childImageSharp: ChildImageSharpFluid
            }
          }
        }
      }>
    }
    allFile: {
      edges: Array<{
        node: {
          name: AvailableTag
          childImageSharp: ChildImageSharpFluid
        }
      }>
    }
  }
  pageContext: {
    tag: AvailableTag
  }
}

export const pageQuery = graphql`
  query($tag: String!) {
    allMarkdownRemark(
      filter: {
        frontmatter: { tags: { in: [$tag] } }
        fileAbsolutePath: { regex: "/index.md$/" }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            path
            tags
            excerpt
            cover {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
    allFile(filter: { name: { eq: $tag }, dir: { regex: "/tags$/" } }) {
      edges {
        node {
          name
          childImageSharp {
            fluid(maxHeight: 200) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
  }
`

export default TagPage
