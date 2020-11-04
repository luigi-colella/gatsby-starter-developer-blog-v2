/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import {
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaSass,
  FaJs,
  FaAngular,
  FaReact,
  FaVuejs,
  FaNodeJs,
  FaPhp,
  FaLaravel,
  FaPython,
  FaDocker,
  FaGit,
  FaJenkins,
  FaWordpress,
  FaLinux,
  FaGoogle,
  FaBullhorn,
  FaMemory,
  FaGuitar,
  FaBrain,
  FaHourglassHalf,
  FaBook,
  FaFilm,
} from 'react-icons/fa'
import { DiJqueryLogo, DiJavascript1, DiMysql } from 'react-icons/di'
/* App imports */
import { ChildImageSharpFluid } from '../../types'
import Chip from '../../components/chip'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import Config from '../../../config'
import Lang from '../../i18n/default'
const style = require('./index.module.less')

const About = ({ data: { profilePhoto } }: AboutProps) => {
  return (
    <Layout>
      <SEO
        title={Lang.pages.about.pageTitle}
        description={Lang.pages.about.pageDescription}
        path='about'
      />
      <div className={style.container}>
        <div className={style.container}>
          <div className={style.col_summary}>
            <h1>{Lang.pages.about.summaryHeading}</h1>
            <p>{Lang.pages.about.summaryParagraph1}</p>
            <p>{Lang.pages.about.summaryParagraph2}</p>
          </div>
          <div className={style.col_photo}>
            <Img fluid={profilePhoto.childImageSharp.fluid} />
          </div>
        </div>
        <div className={style.container}>
          <div className={style.col_left}>
            <h2>{Lang.pages.about.skillsSectionHeading}</h2>
          </div>
          <div className={style.col_right}>
            <div>
              <Chip className={style.chip}>
                <FaHtml5 />
                HTML
              </Chip>
              <Chip className={style.chip}>
                <FaCss3Alt />
                CSS
              </Chip>
              <Chip className={style.chip}>
                <FaBootstrap />
                Bootstrap
              </Chip>
              <Chip className={style.chip}>
                <FaSass />
                Sass
              </Chip>
              <Chip className={style.chip}>
                <DiJavascript1 />
                Javascript
              </Chip>
              <Chip className={style.chip}>
                <FaAngular />
                Angular
              </Chip>
              <Chip className={style.chip}>
                <FaReact />
                React
              </Chip>
              <Chip className={style.chip}>
                <FaVuejs />
                Vue
              </Chip>
              <Chip className={style.chip}>
                <DiJqueryLogo />
                JQuery
              </Chip>
              <Chip className={style.chip}>
                <FaJs />
                Typescript
              </Chip>
              <Chip className={style.chip}>
                <FaNodeJs />
                Node.js
              </Chip>
              <Chip className={style.chip}>
                <FaNodeJs />
                ExpressJS
              </Chip>
              <Chip className={style.chip}>
                <FaNodeJs />
                ElectronJS
              </Chip>
              <Chip className={style.chip}>
                <FaPhp />
                PHP
              </Chip>
              <Chip className={style.chip}>
                <FaLaravel />
                Laravel
              </Chip>
              <Chip className={style.chip}>
                <FaPython />
                Python
              </Chip>
              <Chip className={style.chip}>
                <DiMysql />
                MySQL
              </Chip>
              <Chip className={style.chip}>
                <FaDocker />
                Docker
              </Chip>
              <Chip className={style.chip}>
                <FaGit />
                Git
              </Chip>
              <Chip className={style.chip}>
                <FaJenkins />
                Jenkins
              </Chip>
              <Chip className={style.chip}>
                <FaWordpress />
                Wordpress
              </Chip>
              <Chip className={style.chip}>
                <FaLinux />
                Linux
              </Chip>
            </div>
          </div>
        </div>
        <div className={style.container}>
          <div className={style.col_left}>
            <h2>{Lang.pages.about.interestsSectionHeading}</h2>
          </div>
          <div className={style.col_right}>
            <div>
              <Chip className={style.chip}>
                <FaGoogle />
                {Lang.pages.about.interestsSectionLabel1}
              </Chip>
              <Chip className={style.chip}>
                <FaBullhorn />
                {Lang.pages.about.interestsSectionLabel2}
              </Chip>
              <Chip className={style.chip}>
                <FaMemory />
                {Lang.pages.about.interestsSectionLabel3}
              </Chip>
              <Chip className={style.chip}>
                <FaGuitar />
                {Lang.pages.about.interestsSectionLabel4}
              </Chip>
              <Chip className={style.chip}>
                <FaBrain />
                {Lang.pages.about.interestsSectionLabel5}
              </Chip>
              <Chip className={style.chip}>
                <FaHourglassHalf />
                {Lang.pages.about.interestsSectionLabel6}
              </Chip>
              <Chip className={style.chip}>
                <FaBook />
                {Lang.pages.about.interestsSectionLabel7}
              </Chip>
              <Chip className={style.chip}>
                <FaFilm />
                {Lang.pages.about.interestsSectionLabel8}
              </Chip>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

About.propTypes = {
  data: PropTypes.shape({
    profilePhoto: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired,
  }),
}

interface AboutProps {
  data: {
    profilePhoto: {
      childImageSharp: ChildImageSharpFluid
    }
  }
}

export const query = graphql`
  {
    profilePhoto: file(name: { eq: "profile-photo" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

export default About
