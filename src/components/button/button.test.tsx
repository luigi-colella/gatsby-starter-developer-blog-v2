/* Vendor imports */
import React from 'react'
import { mount } from 'enzyme'
const Chance = require('chance')()
/* App imports */
import Button from './index'

describe('Button component', () => {
  test('renders an anchor element wich have link and children element', () => {
    let link = Chance.url()
    let childElement = <span>Link</span>
    let wrapper = mount(<Button to={link}>{childElement}</Button>).getDOMNode()

    expect(wrapper.tagName).toBe('A')
    expect(wrapper.getAttribute('href')).toBe(link)
    expect(wrapper.innerHTML).toBe('<span>Link</span>')
  })
})
