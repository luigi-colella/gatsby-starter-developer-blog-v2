/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
/* App imports */
import Button from '../../components/button'
import Config from '../../../config'
import Utils from '../../utils'
import Lang from '../../i18n/default'
const style = require('./archive-pagination.module.less')

const ArchivePagination = ({
  prevPage,
  nextPage,
}: {
  prevPage?: number
  nextPage?: number
}) => (
  <div className={style.container}>
    {prevPage ? (
      <Button
        to={Utils.resolveUrl(Config.pages.archive, prevPage.toString())}
        buttonStyle={style.buttonLeft}
      >
        <FaArrowLeft />
        <span>{Lang.components.archivePagination.newerPostsButton}</span>
      </Button>
    ) : null}
    {nextPage ? (
      <Button
        to={Utils.resolveUrl(Config.pages.archive, nextPage.toString())}
        buttonStyle={style.buttonRight}
      >
        <span>{Lang.components.archivePagination.olderPostsButton}</span>
        <FaArrowRight />
      </Button>
    ) : null}
  </div>
)

ArchivePagination.propTypes = {
  prevPage: PropTypes.number,
  nextPage: PropTypes.number,
}

export default ArchivePagination
