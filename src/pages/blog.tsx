/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
/* App imports */
import { ChildImageSharpFluid, AvailableTag } from '../types'
import Layout from '../components/layout'
import SEO from '../components/seo'
import PostList from '../components/post-list'
import ArchivePagination from '../components/archive-pagination/archive-pagination'
import Config from '../../config'

const IndexPage = ({ data }: Props) => (
  <Layout>
    <SEO title='Blog' description={Config.siteDescription} path='' />
    <PostList posts={data.allMarkdownRemark.edges} />
    <ArchivePagination nextPage={2} />
  </Layout>
)

export const query = graphql`
  {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/index.md$/" } }
      limit: 5
    ) {
      edges {
        node {
          frontmatter {
            path
            title
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
  }
`

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    }).isRequired,
  }).isRequired,
}

interface Props {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
          frontmatter: {
            title: string
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
  }
}

export default IndexPage
