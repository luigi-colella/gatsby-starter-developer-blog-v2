/* Vendor imports */
import React from 'react'
import { shallow } from 'enzyme'
/* App imports */
import { PureSEO } from './seo'
import { ImageSharpFixed } from '../../../tests/mocks'

describe('SEO component', () => {
  test('matches snapshot with minimal props', () => {
    let wrapper = shallow(
      <PureSEO
        title={'Title of article'}
        description={'Description of article'}
        path={'/path-of-article'}
        queryData={{
          file: {
            childImageSharp: ImageSharpFixed,
          },
        }}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  test('matches snapshot with all props', () => {
    let wrapper = shallow(
      <PureSEO
        title={'Title of article'}
        description={'Description of article'}
        path={'/path-of-article'}
        lang={'it'}
        contentType={'article'}
        imageUrl={'image-of-article.jpg'}
        keywords={['tag1', 'tag2']}
        translations={[
          { hreflang: 'it', path: 'it/path-of-article' },
          { hreflang: 'en', path: 'en/path-of-article' },
        ]}
        queryData={{
          file: {
            childImageSharp: ImageSharpFixed,
          },
        }}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
