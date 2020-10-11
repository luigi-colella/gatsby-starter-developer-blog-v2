/* Vendor imports */
import React from 'react'
import { mount } from 'enzyme'
import { Link } from 'gatsby'
/* App imports */
import TagList from './index'

describe('Tag List component', () => {
  test('matches snapshot', () => {
    let wrapper = mount(
      <TagList
        // Use duplicated and not sorted tags to test that component properly handles them
        tags={['nodejs', 'angular', 'laravel', 'electron', 'nodejs']}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  test('properly filters, sorts and maps the passed tags', () => {
    let wrapper = mount(
      <TagList tags={['nodejs', 'angular', 'laravel', 'angular', 'nodejs']} />
    )

    expect(
      wrapper.find(Link).map(wrapperElement => wrapperElement.text())
    ).toEqual(['Angular', 'Laravel', 'Node.js'])
  })
})
