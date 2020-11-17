/* Vendor imports */
import React from 'react'
import { shallow } from 'enzyme'
/* App imports */
import Comments from './index'

describe('Post > Comments component', () => {
  test('matches snapshot', () => {
    let wrapper = shallow(
      <Comments
        url='url/of/the/post'
        id='123'
        title='Title of the post'
      />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
