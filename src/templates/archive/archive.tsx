/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
/* App imports */
import { AvailableTag, ChildImageSharpFluid } from '../../types'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import PostList from '../../components/post-list'
import ArchivePagination from '../../components/archive-pagination'
import Config from '../../../config'
import Lang from '../../i18n/default'

const Archive = ({ data, pageContext }: Props) => {
  const { archivePage, lastArchivePage } = pageContext
  const prevPage = archivePage > 1 ? archivePage - 1 : undefined
  const nextPage = archivePage < lastArchivePage ? archivePage + 1 : undefined

  return (
    <Layout title={Lang.templates.archive.title}>
      <SEO
        title={`${Lang.templates.archive.pageTitle} ${archivePage}`}
        description={Lang.templates.archive.description}
        path={Config.pages.archive}
      />
      <PostList posts={data.allMarkdownRemark.edges} />
      <ArchivePagination prevPage={prevPage} nextPage={nextPage} />
    </Layout>
  )
}

Archive.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    postIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    archivePage: PropTypes.number.isRequired,
    lastArchivePage: PropTypes.number.isRequired,
  }).isRequired,
}

export interface Props {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
          frontmatter: {
            title: string
            path: string
            tags: AvailableTag[]
            date: string
            excerpt: string
            cover: {
              childImageSharp: ChildImageSharpFluid
            }
          }
        }
      }>
    }
  }
  pageContext: {
    postIds: String[]
    archivePage: number
    lastArchivePage: number
  }
}

export const query = graphql`
  query($postIds: [String!]) {
    allMarkdownRemark(
      filter: {
        id: { in: $postIds }
        fileAbsolutePath: { regex: "/index.md$/" }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            path
            tags
            date(formatString: "YYYY-MM-DD")
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

export default Archive
