/* Vendor imports */
import React from 'react'
import { shallow } from 'enzyme'
const Chance = require('chance')()
/* App imports */
import Layout from './index'
import Header from './header'

describe('Layout component', () => {
  const childElement = (
    <div>
      <h2>Hello</h2>
      <p>
        I am a <b>child</b> element
      </p>
    </div>
  )

  test('renders passed element with header', () => {
    let wrapper = shallow(<Layout>{childElement}</Layout>)

    expect(
      wrapper
        .childAt(1)
        .childAt(0)
        .html()
    ).toBe('<div><h2>Hello</h2><p>I am a <b>child</b> element</p></div>')
    expect(wrapper.find(Header)).toHaveLength(1)
  })

  test('renders passed element with title', () => {
    let title = Chance.sentence()
    let wrapper = shallow(<Layout title={title}>{childElement}</Layout>)

    expect(
      wrapper
        .childAt(1)
        .childAt(1)
        .html()
    ).toBe('<div><h2>Hello</h2><p>I am a <b>child</b> element</p></div>')
    expect(wrapper.find('h1').text()).toBe(title)
  })

  test('is rendered without header', () => {
    let wrapper = shallow(<Layout showHeader={false}>{childElement}</Layout>)

    expect(wrapper.contains(<Header />)).toBe(false)
  })
})
