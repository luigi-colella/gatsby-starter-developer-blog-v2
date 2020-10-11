/* Vendor imports */
import React from 'react'
import { mount } from 'enzyme'
/* App imports */
import ArticleHeading from './index'

describe('Post > Article Heading component', () => {
  test('matches snapshot with minimal props', () => {
    let wrapper = mount(
      <ArticleHeading
        date={'2019-03-20'}
        excerpt={'Excerpt of the article'}
        time={6}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  test('matches snapshot with all props', () => {
    let wrapper = mount(
      <ArticleHeading
        date={'2019-03-20'}
        excerpt={'Excerpt of the article'}
        time={6}
        translations={[
          { hreflang: 'it', path: 'it/alternative-version' },
          { hreflang: 'en', path: 'en/alternative-version' },
        ]}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
