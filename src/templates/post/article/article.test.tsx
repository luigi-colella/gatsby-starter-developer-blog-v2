/* Vendor imports */
import React from 'react'
import { mount } from 'enzyme'
/* App imports */
import Article from './index'

describe('Post > Article component', () => {
  test('matches snapshot', () => {
    let wrapper = mount(
      <Article html={'<div><h2>Sub title</h2><p>Text paragraph</p></div>'} />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
