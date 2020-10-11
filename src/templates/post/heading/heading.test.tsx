/* Vendor imports */
import React from 'react'
import { shallow } from 'enzyme'
/* App imports */
import Heading from './index'
import { ImageSharpFluid } from '../../../../tests/mocks'

describe('Post > Heading component', () => {
  test('matches snapshot', () => {
    let wrapper = shallow(
      <Heading
        title={'Title of the post'}
        tags={['angular', 'electron', 'nodejs']}
        cover={ImageSharpFluid['fluid']}
        coverTitle={'Title of the cover'}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
