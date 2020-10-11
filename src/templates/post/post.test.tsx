/* Vendor imports */
import React from 'react'
import { shallow } from 'enzyme'
/* App imports */
import Post from './index'
import { Props } from './post'
import { ImageSharpFluid } from '../../../tests/mocks'

describe('Post template', () => {
  const data: Props['data'] = {
    markdownRemark: {
      id: '65f08b56-df9b-5392-9dcf-894ea64c82be',
      html: '<div><h2>Sub title</h2><p>Article paragraph</p></div>',
      timeToRead: 6,
      fileAbsolutePath: 'C:/Documents/absolute-path-to-the-main-post',
      frontmatter: {
        title: 'main-post',
        date: '2019-07-23',
        tags: ['angular', 'javascript'],
        path: 'url-to-the-main-post',
        excerpt: 'excerpt for the main post',
        cover: {
          childImageSharp: ImageSharpFluid,
        },
      },
    },
    allMarkdownRemark: {
      edges: [
        // Article #1
        {
          node: {
            fileAbsolutePath: 'C:/Documents/path-to-the-article-1',
            frontmatter: {
              title: 'Title of article #1',
              path: 'path-to-the-article-1',
              tags: ['angular', 'javascript', 'laravel'],
              excerpt: 'an excertp for the article #1',
              cover: {
                childImageSharp: ImageSharpFluid,
              },
            },
          },
        },
        // Article #2
        {
          node: {
            fileAbsolutePath: 'C:/Documents/path-to-the-article-2',
            frontmatter: {
              title: 'Title of article #2',
              path: 'path-to-the-article-2',
              tags: ['nodejs', 'angular'],
              excerpt: 'an excertp for the article #2',
              cover: {
                childImageSharp: ImageSharpFluid,
              },
            },
          },
        },
      ],
    },
  }

  test('matches snapshot', () => {
    let wrapper = shallow(
      <Post
        data={data}
        pageContext={{
          translations: [
            { hreflang: 'it', path: '/it/version-of-main-post' },
            { hreflang: 'en', path: '/en/version-of-main-post' },
          ],
        }}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
