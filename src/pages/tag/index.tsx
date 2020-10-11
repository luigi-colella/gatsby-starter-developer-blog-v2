/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
/* App imports */
import { ChildImageSharpFluid, AvailableTag } from '../../types'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import Config from '../../../config'
import Utils from '../../utils'
import Lang from '../../i18n/default'
const style = require('./tag.module.less')

const Tag = ({ data }: Props) => {
  const rawTags = data.allMarkdownRemark.edges
    .map(edge => edge.node.frontmatter.tags)
    .reduce((prev, curr) => prev.concat(curr))
  const tags = rawTags
    .filter((tag, index) => index === rawTags.indexOf(tag))
    .sort() // Remove duplicates and sort values
  const tagPage = Config.pages.tag
  const tagImages = data.allFile.edges.reduce(
    (prevResult, currEdge) => {
      return Object.assign({}, prevResult, {
        [currEdge.node.name]: currEdge.node.childImageSharp.fluid,
      })
    },
    {} as any
  )

  return (
    <Layout title={Lang.pages.tag.title}>
      <SEO
        title={Lang.pages.tag.title}
        description={Lang.pages.tag.description}
        path={tagPage}
      />
      <div>
        {tags.map(tag => (
          <Link
            to={Utils.resolveUrl(tagPage, tag)}
            className={style.card}
            key={tag}
          >
            <div className={style.cover}>
              <Image fluid={tagImages[tag]} loading={'eager'} />
            </div>
            <div>
              <h3>{Lang.tags[tag].name || Utils.capitalize(tag)}</h3>
              <p>{Lang.tags[tag].description}</p>
              <label>
                {rawTags.filter(sTag => sTag === tag).length +
                  ' ' +
                  Lang.pages.tag.postsLabel}
              </label>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

Tag.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
            }).isRequired,
          }).isRequired,
        }).isRequired
      ).isRequired,
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
        }).isRequired
      ).isRequired,
    }).isRequired,
  }).isRequired,
}

interface Props {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
          frontmatter: {
            tags: AvailableTag[]
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
}

export const query = graphql`
  {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/index.md$/" } }) {
      edges {
        node {
          frontmatter {
            tags
          }
        }
      }
    }
    allFile(filter: { relativeDirectory: { eq: "tags" } }) {
      edges {
        node {
          name
          childImageSharp {
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
  }
`

export default Tag
