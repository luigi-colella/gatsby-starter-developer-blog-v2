/* App imports */
import Config from '../config'
import Utils from './utils'

describe('Utils', () => {
  test('resolveUrl() joins paths correctly', () => {
    expect(Utils.resolveUrl('a', 'b', 'c')).toBe('/a/b/c/')
    expect(Utils.resolveUrl('a  ', 'b', ' c')).toBe('/a/b/c/')
    expect(Utils.resolveUrl('', 'b', ' c')).toBe('/b/c/')
    expect(Utils.resolveUrl('/a  ', '/b/', ' c/')).toBe('/a/b/c/')
    expect(Utils.resolveUrl('/a  ', '/b/', ' c.jpg ')).toBe('/a/b/c.jpg')
    expect(Utils.resolveUrl('https://  ', '/b/', ' c/')).toBe('https://b/c')
    expect(Utils.resolveUrl(' https://a  ', '/b/', ' c/')).toBe('https://a/b/c')
    expect(Utils.resolveUrl(Config.siteUrl, '', '/a')).toBe(
      Config.siteUrl + '/a/'
    )
    expect(Utils.resolveUrl(Config.siteUrl, '', 'a.jpg')).toBe(
      Config.siteUrl + '/a.jpg'
    )
    expect(Utils.resolveUrl('/')).toBe('/')
    expect(Utils.resolveUrl('', ' /', '/ ')).toBe('/')
    expect(Utils.resolveUrl('', ' /', '/', 'a ', '/ ')).toBe('/a/')
  })

  test('getPostScore() works correctly', () => {
    let posts = [
      { frontmatter: { title: 'post n. 4', tags: ['javascript', 'angular'] } },
      { frontmatter: { title: 'post n. 1', tags: ['javascript', 'angular'] } },
      { frontmatter: { title: 'post n. 5', tags: ['javascript', 'angular'] } },
      {
        frontmatter: { title: 'another post', tags: ['javascript', 'angular'] },
      },
      { frontmatter: { title: 'amazing post', tags: ['express'] } },
      { frontmatter: { title: 'fantastic post', tags: ['javascript'] } },
      { frontmatter: { title: 'post n. 2', tags: ['javascript', 'angular'] } },
      {
        frontmatter: { title: 'amazing post', tags: ['javascript', 'express'] },
      },
    ]
    let targetPost = {
      frontmatter: { title: 'post n. 3', tags: ['javascript', 'angular'] },
    }

    let postsSortedByScore = posts
      .slice(0)
      .sort(
        (postA, postB) =>
          Utils.getPostScore(postB, targetPost) -
          Utils.getPostScore(postA, targetPost)
      )

    expect(postsSortedByScore).toStrictEqual([
      { frontmatter: { title: 'post n. 4', tags: ['javascript', 'angular'] } },
      { frontmatter: { title: 'post n. 5', tags: ['javascript', 'angular'] } },
      { frontmatter: { title: 'post n. 1', tags: ['javascript', 'angular'] } },
      { frontmatter: { title: 'post n. 2', tags: ['javascript', 'angular'] } },
      {
        frontmatter: { title: 'another post', tags: ['javascript', 'angular'] },
      },
      { frontmatter: { title: 'fantastic post', tags: ['javascript'] } },
      {
        frontmatter: { title: 'amazing post', tags: ['javascript', 'express'] },
      },
      { frontmatter: { title: 'amazing post', tags: ['express'] } },
    ])
  })

  test('getRelatedTranslations() works correctly', () => {
    let post = { fileAbsolutePath: 'c/absolute/path/to/post/index.md' }

    let postList = [
      {
        node: {
          fileAbsolutePath: 'c/absolute/path/to/post2/index.en.md',
          frontmatter: { path: '/a/sb/c' },
        },
      },
      {
        node: {
          fileAbsolutePath: 'c/absolute/path/to/post2/index.it.md',
          frontmatter: { path: 're' },
        },
      },
      {
        node: {
          fileAbsolutePath: 'c/absolute/path/to/post/index.it.md',
          frontmatter: { path: '/a/b/c' },
        },
      },
      {
        node: {
          fileAbsolutePath: 'c/absolute/path/to/post3/index.en.md',
          frontmatter: { path: '/gh/t/' },
        },
      },
      {
        node: {
          fileAbsolutePath: 'c/absolute/path/to/post4/index.it.md',
          frontmatter: { path: '/a/sb/c' },
        },
      },
      {
        node: {
          fileAbsolutePath: 'c/absolute/path/to/post/index.en.md',
          frontmatter: { path: '/a/dy/a' },
        },
      },
    ]

    expect(Utils.getRelatedTranslations(post, postList)).toStrictEqual([
      { hreflang: 'it', path: '/a/b/c/' },
      { hreflang: 'en', path: '/a/dy/a/' },
    ])
  })

  test('capitalize() works correctly', () => {
    expect(Utils.capitalize('foo')).toBe('Foo')
  })

  test('chunk() works correctly', () => {
    expect(Utils.chunk([], 3)).toStrictEqual([])
    expect(Utils.chunk([1], 3)).toStrictEqual([[1]])
    expect(Utils.chunk([1, 2, 3, 4, 5, 6, 7, 8], 3)).toStrictEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8],
    ])
  })
})
