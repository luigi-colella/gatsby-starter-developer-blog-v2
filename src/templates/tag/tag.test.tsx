/* Vendor imports */
import React from 'react'
import { shallow } from 'enzyme'
const Chance = require('chance')()
/* App imports */
import TagPage from './index'
import { Props } from './tag'
import PostList from '../../components/post-list'
import Lang from '../../i18n/default'
import { ImageSharpFluid } from '../../../tests/mocks'

describe('Tag template', () => {
  const TagProps: Props = {
    data: {
      allMarkdownRemark: {
        edges: [
          // Article #1
          {
            node: {
              frontmatter: {
                title: 'Title of article #1',
                path: 'path-to-the-article-1',
                tags: ['javascript', 'express'],
                date: '2019-05-14',
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
              frontmatter: {
                title: 'Title of article #2',
                path: 'path-to-the-article-2',
                tags: ['nodejs', 'angular'],
                date: '2018-12-15',
                excerpt: 'an excertp for the article #2',
                cover: {
                  childImageSharp: ImageSharpFluid,
                },
              },
            },
          },
        ],
      },
      allFile: {
        edges: [
          {
            node: {
              name: 'javascript',
              childImageSharp: ImageSharpFluid,
            },
          },
          {
            node: {
              name: 'angular',
              childImageSharp: ImageSharpFluid,
            },
          },
        ],
      },
    },
    pageContext: {
      tag: 'angular',
    },
  }

  test('matches snapshot', () => {
    let wrapper = shallow(<TagPage {...TagProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  test('shows only posts with the passed tag', () => {
    let tagName = Chance.string()
    let componentProps = Object.assign({}, TagProps)

    for (let i = 0; i < 5; i++) {
      componentProps.data.allMarkdownRemark.edges.push({
        node: {
          frontmatter: {
            title: Chance.string(),
            path: Chance.url(),
            tags: Chance.pickset(Object.keys(Lang.tags).push(tagName)),
            date: Chance.date({ string: true }),
            excerpt: Chance.sentence(),
            cover: {
              childImageSharp: ImageSharpFluid,
            },
          },
        },
      })
    }

    let wrapper = shallow(<TagPage {...componentProps} />)
    let posts = wrapper.find(PostList).prop('posts')

    expect(componentProps.data.allMarkdownRemark.edges).toEqual(posts)
  })
})
