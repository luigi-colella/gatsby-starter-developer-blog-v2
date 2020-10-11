/* Vendor imports */
import React from 'react'
import { shallow } from 'enzyme'
/* App imports */
import Component from './index'
import { Props } from './post-list'
import { ImageSharpFluid } from '../../../tests/mocks'

describe('Post List component', () => {
  const mockPostList: Props['posts'] = [
    // Article #1
    {
      node: {
        frontmatter: {
          title: 'article #1',
          date: '2019-02-13',
          path: '/article-1-path',
          tags: ['javascript', 'nodejs', 'angular', 'react'],
          excerpt: 'excerpt of the article 1',
          cover: {
            childImageSharp: ImageSharpFluid,
          },
        },
      },
    },
    // Article #2
    {
      node: {
        frontmatter: {
          title: 'article #2',
          path: '/article-2-path',
          tags: ['javascript', 'laravel', 'nodejs', 'angular'],
          excerpt: 'excerpt of the article 2',
          cover: {
            childImageSharp: ImageSharpFluid,
          },
        },
      },
    },
  ]

  test('matches snapshot', () => {
    let wrapper = shallow(<Component posts={mockPostList} />)

    expect(wrapper).toMatchSnapshot()
  })
})
