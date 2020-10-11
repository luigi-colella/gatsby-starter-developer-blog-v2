/* Vendor imports */
import React from 'react'
import { shallow } from 'enzyme'
/* App imports */
import SuggestedPosts from './index'
import { Props } from './suggested-posts'
import { ImageSharpFluid } from '../../../../tests/mocks'

describe('Post > Suggsted Posts component', () => {
  const posts: Props['posts'] = [
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
  ]

  test('matches snapshot', () => {
    let wrapper = shallow(<SuggestedPosts posts={posts} />)

    expect(wrapper).toMatchSnapshot()
  })
})
