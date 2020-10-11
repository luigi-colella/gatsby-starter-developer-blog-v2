/* Vendor imports */
import React from 'react'
import { shallow } from 'enzyme'
/* App imports */
import Share from './index'

describe('Post > Share component', () => {
  test('matches snapshot', () => {
    let wrapper = shallow(
      <Share
        pageCanonicalUrl={'/path/canonical-url'}
        title={'Title of the page'}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
