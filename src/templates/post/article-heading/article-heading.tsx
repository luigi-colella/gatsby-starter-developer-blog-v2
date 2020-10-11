/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { FaRegCalendarAlt, FaRegClock } from 'react-icons/fa'
import { MdTranslate } from 'react-icons/md'
import { AvailableLanguage } from '../../../types'
import Lang from '../../../i18n/default'
/* App imports */
const style = require('./article-heading.module.less')

const ArticleHeading = ({ excerpt, date, time, translations }: Props) => (
  <div className={style.container}>
    <div className={style.excerpt}>
      <p>{excerpt}</p>
    </div>
    <label>
      <strong>
        <FaRegCalendarAlt /> {Lang.templates.post.headingDate}:{' '}
      </strong>
      <span>{date}</span>
    </label>
    <label>
      <strong>
        <FaRegClock /> {Lang.templates.post.headingTimeToRead}:{' '}
      </strong>
      <span>{time}m</span>
    </label>
    {translations ? (
      <label>
        <strong>
          <MdTranslate /> {Lang.templates.post.headingTranslations}:{' '}
        </strong>
        {translations
          .sort((translationA, translationB) =>
            translationA.hreflang < translationB.hreflang ? -1 : 1
          )
          .map(({ hreflang, path }, index) => (
            <span key={hreflang}>
              <Link to={path}>{hreflangMap[hreflang]}</Link>
              {index !== translations.length - 1 ? ', ' : null}
            </span>
          ))}
      </label>
    ) : null}
  </div>
)

ArticleHeading.propTypes = {
  excerpt: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  translations: PropTypes.arrayOf(
    PropTypes.shape({
      hreflang: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
}

interface Props {
  excerpt: string
  date: string
  time: number
  translations?: Array<{
    hreflang: AvailableLanguage
    path: string
  }>
}

// Languages code ISO 639-1 map
export const hreflangMap = {
  en: 'English',
  it: 'Italian',
  fr: 'French',
}

export default ArticleHeading
