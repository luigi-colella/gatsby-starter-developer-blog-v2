/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Image, { FluidObject } from 'gatsby-image'
/* App imports */
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import Button from '../../components/button'
import Config from '../../../config'
import Utils from '../../utils'
import Lang from '../../i18n/default'
const style = require('./404.module.less')

const NotFoundPage = ({ data }: Props) => (
  <Layout>
    <SEO
      title={Lang.pages.notFound.title}
      description={Config.siteDescription}
      path='404'
    />
    <div className={style.container}>
      <div className={style.image}>
        <Image fluid={data.file.childImageSharp.fluid} />
      </div>
      <div className={style.message}>
        <h1>{Lang.pages.notFound.title}</h1>
        <Button to={Utils.resolveUrl(Config.pages.home)}>
          {Lang.pages.notFound.button}
        </Button>
      </div>
    </div>
  </Layout>
)

NotFoundPage.propTypes = {
  data: PropTypes.shape({
    file: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}

interface Props {
  data: {
    file: {
      childImageSharp: {
        fluid: FluidObject
      }
    }
  }
}

export const query = graphql`
  {
    file(base: { eq: "404.png" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`
export default NotFoundPage
