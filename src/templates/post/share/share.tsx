/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
  EmailShareButton,
} from 'react-share'
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaRedditAlien,
  FaEnvelope,
} from 'react-icons/fa'
/* App imports */
import Chip from '../../../components/chip'
const style = require('./share.module.less')

const Share = ({ pageCanonicalUrl, title }: Props) => (
  <div>
    <div className={style.container}>
      <FacebookShareButton url={pageCanonicalUrl}>
        <Chip hoverEffect={true} className={style.chip}>
          <span>
            <FaFacebookF className={style.icon} />
            Facebook
          </span>
        </Chip>
      </FacebookShareButton>
      <TwitterShareButton url={pageCanonicalUrl} title={title}>
        <Chip hoverEffect={true} className={style.chip}>
          <span>
            <FaTwitter className={style.icon} />
            Twitter
          </span>
        </Chip>
      </TwitterShareButton>
      <LinkedinShareButton url={pageCanonicalUrl}>
        <Chip hoverEffect={true} className={style.chip}>
          <span>
            <FaLinkedinIn className={style.icon} />
            LinkedIn
          </span>
        </Chip>
      </LinkedinShareButton>
      <RedditShareButton url={pageCanonicalUrl} title={title}>
        <Chip hoverEffect={true} className={style.chip}>
          <span>
            <FaRedditAlien className={style.icon} />
            Reddit
          </span>
        </Chip>
      </RedditShareButton>
      <EmailShareButton url={pageCanonicalUrl} subject={title}>
        <Chip hoverEffect={true} className={style.chip}>
          <span>
            <FaEnvelope className={style.icon} />
            Email
          </span>
        </Chip>
      </EmailShareButton>
    </div>
  </div>
)

Share.propTypes = {
  pageCanonicalUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

interface Props {
  pageCanonicalUrl: string
  title: string
}

export default Share
