/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
/* App imports */
import { ChildImageSharpFixed } from '../../types'
import Config from '../../../config'
import Utils from '../../utils'

export const PureSEO = ({
  queryData,
  title,
  description,
  path,
  lang,
  contentType,
  imageUrl,
  keywords,
  translations,
}: PropsForPure) => {
  let pageUrl = Utils.resolveUrl(Config.siteUrl, Config.pathPrefix, path)
  let metaImageUrl = Utils.resolveUrl(
    Config.siteUrl,
    Config.pathPrefix,
    imageUrl ? imageUrl : queryData.file.childImageSharp.fixed.src
  )

  return (
    <Helmet
      title={title}
      titleTemplate={`%s | ${Config.siteTitle}`}
      meta={[
        { name: 'description', content: description }, // Page description
        /* Open Graph */
        { property: 'og:title', content: title },
        { property: 'og:type', content: contentType || 'website' },
        { property: 'og:url', content: pageUrl },
        { property: 'og:description', content: description },
        { property: 'og:image', content: metaImageUrl },
        { property: 'og:image:alt', content: description },
        { property: 'og:site_name', content: Config.siteTitle },
        { property: 'og:locale', content: lang || 'en_US' },
        /* Twitter card */
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: metaImageUrl },
        { name: 'twitter:image:alt', content: description },
        { name: 'twitter:site', content: Config.author },
        { name: 'twitter:creator', content: Config.author },
      ].concat(
        keywords && keywords.length > 0
          ? { name: 'keywords', content: keywords.join(', ') }
          : []
      )}
      link={[{ rel: 'canonical', href: pageUrl }] // Canonical url
        // Translated versions of page
        .concat(
          translations
            ? translations.map(obj => ({
                rel: 'alternate',
                hreflang: obj.hreflang,
                href: Utils.resolveUrl(
                  Config.siteUrl,
                  Config.pathPrefix,
                  obj.path
                ),
              }))
            : []
        )}
    />
  )
}

PureSEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  lang: PropTypes.string,
  contentType: PropTypes.oneOf(['article', 'website']),
  imageUrl: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  translations: PropTypes.arrayOf(
    PropTypes.shape({
      hreflang: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
  queryData: PropTypes.shape({
    file: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fixed: PropTypes.shape({
          src: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}

PureSEO.defaultProps = {
  keywords: Config.siteKeywords,
}

export const SEO = (props: Props) => (
  <StaticQuery
    query={graphql`
      query {
        file(name: { eq: "facebook-logo" }) {
          childImageSharp {
            fixed(width: 500) {
              ...GatsbyImageSharpFixed_noBase64
            }
          }
        }
      }
    `}
    render={queryData => <PureSEO queryData={queryData} {...props} />}
  />
)

interface Props {
  title: string
  description: string
  path: string
  lang?: string
  contentType?: 'article' | 'website'
  imageUrl?: string
  keywords?: string[]
  translations?: Array<{
    hreflang: string
    path: string
  }>
}

interface PropsForPure extends Props {
  queryData: {
    file: {
      childImageSharp: ChildImageSharpFixed
    }
  }
}

export default SEO
