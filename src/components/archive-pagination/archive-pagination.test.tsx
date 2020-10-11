/* Vendor imports */
import React from 'react'
import { shallow } from 'enzyme'
const Chance = require('chance')()
/* App imports */
import ArchivePagination from './index'
import Button from '../../components/button'
import Config from '../../../config'
import Utils from '../../utils'

describe('ArchivePagination component', () => {
  test('shows any buttons if neither the next page nor the prev page', () => {
    let wrapper = shallow(<ArchivePagination />)

    expect(wrapper.find(Button)).toHaveLength(0)
  })

  test('shows 2 buttons if previous and next pages are provided', () => {
    let prevPageNumber = Chance.integer()
    let nextPageNumber = Chance.integer()
    let wrapper = shallow(
      <ArchivePagination prevPage={prevPageNumber} nextPage={nextPageNumber} />
    )

    let buttons = wrapper.find(Button)
    expect(buttons).toHaveLength(2)
    let expectedPrevPage = Utils.resolveUrl(
      Config.pages.archive,
      prevPageNumber
    )
    expect(buttons.at(0).prop('to')).toBe(expectedPrevPage)
    expect(
      buttons
        .at(0)
        .find('span')
        .text()
        .trim()
    ).toBeTruthy()
    let expectedNextPage = Utils.resolveUrl(
      Config.pages.archive,
      nextPageNumber
    )
    expect(buttons.at(1).prop('to')).toBe(expectedNextPage)
    expect(
      buttons
        .at(1)
        .find('span')
        .text()
        .trim()
    ).toBeTruthy()
  })

  test('shows 1 button if only previous page is provided', () => {
    let prevPageNumber = Chance.integer()
    let wrapper = shallow(<ArchivePagination prevPage={prevPageNumber} />)

    let buttons = wrapper.find(Button)
    expect(buttons).toHaveLength(1)
    const expectedPrevPage = Utils.resolveUrl(
      Config.pages.archive,
      prevPageNumber
    )
    expect(buttons.at(0).prop('to')).toBe(Utils.resolveUrl(expectedPrevPage))
    expect(
      buttons
        .at(0)
        .find('span')
        .text()
        .trim()
    ).toBeTruthy()
  })

  test('shows 1 button if only next page is provided', () => {
    let nextPageNumber = Chance.integer()
    let wrapper = shallow(<ArchivePagination nextPage={nextPageNumber} />)

    let buttons = wrapper.find(Button)
    expect(buttons).toHaveLength(1)
    const expectedNextPage = Utils.resolveUrl(
      Config.pages.archive,
      nextPageNumber
    )
    expect(buttons.at(0).prop('to')).toBe(Utils.resolveUrl(expectedNextPage))
    expect(
      buttons
        .at(0)
        .find('span')
        .text()
        .trim()
    ).toBeTruthy()
  })
})
