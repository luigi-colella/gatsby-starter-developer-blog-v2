/* Vendor imports */
import React from 'react'
import { Link } from 'gatsby'
/* App imports */
import Layout from '../components/layout'
import SEO from '../components/seo'
import Config from '../../config'
import Lang from '../i18n/default'
import Utils from '../utils'
import { FaGithub, FaLinkedin, FaPenNib, FaRegUser } from 'react-icons/fa'
const style = require('./index.module.less')

export default () => (
  <Layout showHeader={false}>
    <SEO title='Home' description={Config.siteDescription} path='' />
    <div className={[style.container, style.heading].join(' ')}>
      <ul>
        <li>
          <a
            target='_blank'
            rel='nofollow noopener noreferrer'
            href={Config.social.github}
          >
            <FaGithub size='30' />
            <span>Github</span>
          </a>
        </li>
        <li>
          <a
            target='_blank'
            rel='nofollow noopener noreferrer'
            href={Config.social.linkedin}
          >
            <FaLinkedin size='30' />
            <span>LinkedIn</span>
          </a>
        </li>
        <li>
          <Link to={Utils.resolveUrl(Config.pages.blog)}>
            <FaPenNib size='30' />
            <span>Blog</span>
          </Link>
        </li>
        <li>
          <Link to={Utils.resolveUrl(Config.pages.about)}>
            <FaRegUser size='30' />
            <span>{Lang.pages.about.pageTitle}</span>
          </Link>
        </li>
      </ul>
      <h1>Vincent van Gogh</h1>
      <h2>Fullstack developer</h2>
    </div>
  </Layout>
)
