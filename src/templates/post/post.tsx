/* Vendor imports */
import React from 'react'
import { graphql } from 'gatsby'
/* App imports */
import {
  AvailableTag,
  ChildImageSharpFluid,
  AvailableLanguage,
} from '../../types'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import Heading from './heading'
import ArticleHeading from './article-heading'
import Article from './article'
import Share from './share'
import SuggestedPosts from './suggested-posts'
import Config from '../../../config'
import Utils from '../../utils'
import Comments from './comments'
const style = require('./post.module.less')

const Post = ({ data, pageContext }: Props) => {
  const { id, html, frontmatter, timeToRead } = data.markdownRemark
  const { title, date, tags, cover, path, excerpt } = frontmatter
  const translations =
    pageContext.translations.length > 1 ? pageContext.translations : undefined
  const img = cover.childImageSharp.fluid
  const canonicalUrl = Utils.resolveUrl(Config.siteUrl, Config.pathPrefix, path)
  const suggestedPosts = Utils.getSuggestedPosts(
    data.markdownRemark,
    data.allMarkdownRemark as any,
    3
  )

  return (
    <Layout className={style.layout}>
      <SEO
        title={title}
        description={excerpt}
        path={path}
        contentType='article'
        imageUrl={img.src}
        keywords={tags}
        translations={translations}
      />
      <Heading title={title} tags={tags} cover={img} coverTitle={excerpt} />
      <div className={style.content}>
        <ArticleHeading
          excerpt={excerpt}
          date={date}
          time={timeToRead}
          translations={translations}
        />
        <Article html={html} />
        <Share pageCanonicalUrl={canonicalUrl} title={title} />
        <Comments url={canonicalUrl} id={id} title={title} />
        <SuggestedPosts posts={suggestedPosts} />
      </div>
    </Layout>
  )
}

export interface Props {
  data: {
    markdownRemark: {
      id: string
      html: string
      timeToRead: number
      fileAbsolutePath: string
      frontmatter: {
        title: string
        date: string
        tags: AvailableTag[]
        path: string
        excerpt: string
        cover: {
          childImageSharp: ChildImageSharpFluid
        }
      }
    }
    allMarkdownRemark: {
      edges: Array<{
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
  }
  pageContext: {
    translations: Array<{
      hreflang: AvailableLanguage
      path: string
    }>
  }
}

export const pageQuery = graphql`
  query($postId: String!) {
    markdownRemark(id: { eq: $postId }) {
      id
      html
      timeToRead
      fileAbsolutePath
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        tags
        path
        excerpt
        cover {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
    allMarkdownRemark {
      edges {
        node {
          fileAbsolutePath
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
export default Post
