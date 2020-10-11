/* Vendor imports */
import React, { Component } from 'react'
import { Link } from 'gatsby'
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaRss } from 'react-icons/fa'
/* App imports */
import Config from '../../../../config'
import Utils from '../../../utils'
import Lang from '../../../i18n/default'
const style = require('./header.module.less')

class Header extends Component<Props, State> {
  animationInProgress: boolean = false

  constructor(props: Props) {
    super(props)
    this.state = {
      lastScrollY: 0,
      fixedHeader: false,
      collapsedMenu: true,
    }
    this.toggleFixedHeader = this.toggleFixedHeader.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.toggleFixedHeader)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.toggleFixedHeader)
  }

  toggleFixedHeader() {
    if (!this.animationInProgress) {
      this.animationInProgress = true
      setTimeout(() => {
        this.setState(
          {
            lastScrollY: window.scrollY,
            fixedHeader:
              window.scrollY > 100 && this.state.lastScrollY < window.scrollY,
          },
          () => (this.animationInProgress = false)
        )
      }, 200)
    }
  }

  toggleMenu() {
    this.setState({
      collapsedMenu: !this.state.collapsedMenu,
    })
  }

  render = () => (
    <div
      className={[
        style.container,
        this.state.fixedHeader ? style.hiddenContainer : style.visibleContainer,
      ].join(' ')}
    >
      <div className={style.innerContainer}>
        <div className={style.title}>
          <Link to={Utils.resolveUrl(Config.pages.home)}>
            <h3>{Config.siteTitle}</h3>
          </Link>
          <button>
            {this.state.collapsedMenu ? (
              <FaBars size='30' onClick={this.toggleMenu} />
            ) : (
              <FaTimes size='30' onClick={this.toggleMenu} />
            )}
          </button>
        </div>

        <div
          className={[
            style.pages,
            this.state.collapsedMenu ? style.collapsedMenu : style.expandedMenu,
          ].join(' ')}
        >
          <ul>
            <li>
              <Link to={Utils.resolveUrl(Config.pages.blog)}>
                {Lang.components.layout.headerPageBlogLink}
              </Link>
            </li>
            <li>
              <Link to={Utils.resolveUrl(Config.pages.tag)}>
                {Lang.components.layout.headerPageTagLink}
              </Link>
            </li>
            <li>
              <Link to={Utils.resolveUrl(Config.pages.about)}>
                {Lang.components.layout.headerPageAboutLink}
              </Link>
            </li>
          </ul>
        </div>

        <div
          className={[
            style.social,
            this.state.collapsedMenu ? style.collapsedMenu : style.expandedMenu,
          ].join(' ')}
        >
          <ul>
            <li>
              <a
                target='_blank'
                rel='nofollow noopener noreferrer'
                href={Config.social.github}
              >
                <FaGithub size='30' />
              </a>
            </li>
            <li>
              <a
                target='_blank'
                rel='nofollow noopener noreferrer'
                href={Config.social.linkedin}
              >
                <FaLinkedin size='30' />
              </a>
            </li>
            <li>
              <a
                target='_blank'
                rel='nofollow noopener noreferrer'
                href={Config.social.rss}
              >
                <FaRss size='30' />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

interface Props {}

interface State {
  lastScrollY: number
  fixedHeader: boolean
  collapsedMenu: boolean
}

export default Header
