/* Vendor imports */
import React from 'react'
import { shallow } from 'enzyme'
/* App imports */
import Archive from './index'
import { Props } from './archive'
import ArchivePagination from '../../components/archive-pagination'
import { ImageSharpFluid } from '../../../tests/mocks'

describe('Archive template', () => {
  const postLists: Props['data'] = {
    allMarkdownRemark: {
      edges: [
        // Article #1
        {
          node: {
            frontmatter: {
              title: 'Title of article #1',
              path: 'path-to-the-article-1',
              tags: ['laravel', 'javascript', 'angular'],
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
  }

  test('matches snapshot', () => {
    let wrapper = shallow(
      <Archive
        data={postLists}
        pageContext={{
          archivePage: 3,
          lastArchivePage: 12,
          postIds: ['1', '2'],
        }}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  test('properly handles the pagination', () => {
    let wrapper = shallow(
      <Archive
        data={postLists}
        pageContext={{
          archivePage: 1,
          lastArchivePage: 1,
          postIds: ['1', '2'],
        }}
      />
    )

    // The archive has only one page
    expect(wrapper.find(ArchivePagination).prop('prevPage')).toBe(undefined)
    expect(wrapper.find(ArchivePagination).prop('nextPage')).toBe(undefined)
    // The archive has several pages and we are in the first one
    wrapper.setProps({
      pageContext: { archivePage: 1, lastArchivePage: 7, postIds: ['1', '2'] },
    })
    expect(wrapper.find(ArchivePagination).prop('prevPage')).toBe(undefined)
    expect(wrapper.find(ArchivePagination).prop('nextPage')).toBe(2)
    // The archive has several pages and we are in the middle
    wrapper.setProps({
      pageContext: { archivePage: 3, lastArchivePage: 7, postIds: ['1', '2'] },
    })
    expect(wrapper.find(ArchivePagination).prop('prevPage')).toBe(2)
    expect(wrapper.find(ArchivePagination).prop('nextPage')).toBe(4)
    // The archive has several pages and we are in the last one
    wrapper.setProps({
      pageContext: { archivePage: 7, lastArchivePage: 7, postIds: ['1', '2'] },
    })
    expect(wrapper.find(ArchivePagination).prop('prevPage')).toBe(6)
    expect(wrapper.find(ArchivePagination).prop('nextPage')).toBe(undefined)
  })
})
