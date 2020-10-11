const Config = require('../config')

const Utils = {
  /**
   * Join provided paths in a relative or absolute url.
   *
   * @param {...string} paths Provided paths. It doesn't matter if they have trailing slash.
   *
   * @return {string} Resolved url without trailing slash.
   */
  resolveUrl: (...paths) => {
    let isAbsoluteUrl =
      paths[0]
        .toString()
        .trim()
        .search('http[s]?://') !== -1

    let urlPaths = paths
      .map(path =>
        path
          .toString()
          .trim()
          .replace(/^\/|\/$/g, '')
      )
      .filter(path => !!path)

    let resolvedUrl = urlPaths.join('/')

    if (resolvedUrl === '' || resolvedUrl === '/') return '/'

    let prefix = !isAbsoluteUrl ? '/' : ''
    let isAbsoluteSiteUrl = resolvedUrl.includes(Config.siteUrl)
    let isFileLink =
      urlPaths.length && urlPaths[urlPaths.length - 1].includes('.')
    // If the url is an internal link, add a trailing slash to prevent 301 redirects due to Gatsby.js' folder structure.
    let suffix = (!isAbsoluteUrl || isAbsoluteSiteUrl) && !isFileLink ? '/' : ''

    return prefix + resolvedUrl + suffix
  },

  /**
   * Get an ordered list of suggested posts for a single post.
   *
   * @param {Object} selectedPost The post of which to find the related posts. It's the returned object from Graphql's query `markdownRemark`
   * @param {Array} postList The list where find related posts. It's the returned array from Graphql's query `allMarkdownRemark`
   * @param {number} limit The maximum number of suggested posts to get
   *
   * @return {Array} The `postList` object sorted according to the best match with the `post` object
   */
  getSuggestedPosts: (selectedPost, postList, limit) => {
    return postList.edges
      .filter(edge => {
        let isNotInTheSameFolder =
          edge.node.fileAbsolutePath.split('/').slice(-2, -1)[0] !==
          selectedPost.fileAbsolutePath.split('/').slice(-2, -1)[0]
        let isInTheSameLanguage =
          edge.node.fileAbsolutePath.slice(-5, -3) ===
          selectedPost.fileAbsolutePath.slice(-5, -3)
        return isNotInTheSameFolder && isInTheSameLanguage
      })
      .sort(
        (edgeA, edgeB) =>
          Utils.getPostScore(edgeB.node, selectedPost) -
          Utils.getPostScore(edgeA.node, selectedPost)
      )
      .slice(0, limit)
  },

  /**
   * Get the score of a post according to the affinity with the target one
   *
   * @param {Object} post The post of which to calculate the score
   * @param {Object} targetPost The target post considered to calculate the score
   *
   * @return {number} The affinity score between the passed post and the target post
   */
  getPostScore: (post, targetPost) => {
    // A post with same tags of target post has an higher score
    let commonTags = 0
    post.frontmatter.tags.forEach(tag => {
      commonTags += targetPost.frontmatter.tags.indexOf(tag) !== -1 ? 1 : 0
    })

    // A post with similar title has an higher score
    let titleScore = 0
    let postTitleLetters = post.frontmatter.title.split('')
    let targetPostTitleLetters = targetPost.frontmatter.title.split('')
    for (let position = 0; position < postTitleLetters.length; position++) {
      let letter = postTitleLetters[position]
      let targetLetter = targetPostTitleLetters[position]
      // Check if the letter in post's title is the same
      // and if it is at the same position in the target post's title
      if (targetLetter === letter) {
        titleScore += 1
        continue
      }
      // If we have a target post like `post-2` and three posts like `post-1`, `post-3`, `post-4`,
      // we assign the higher score to `post-3`, followed by `post-4` and finally by `post-1`
      if (letter > 0 && targetLetter > 0) {
        let delta =
          letter > targetLetter ? letter - targetLetter : targetLetter + letter
        titleScore += 1 / delta
      }
      // Exit from the loop because from this letter the title of the post
      // and that of target post are different
      break
    }

    return commonTags + titleScore * 10
  },

  /**
   * Pass a post and retrieve a list of related translations.
   *
   * @param {Object} post The post of which retrieve its translations. It accepts a `node` object from Graphql's query `allMarkdownRemark`
   * @param {Object} postList The list of posts where search translations. It accepts a `edges` array from Graphql's query `allMarkdownRemark`
   *
   * @return {Object} An array of objects with languages as keys (ISO 639-1) and translated post's paths as values.
   */
  getRelatedTranslations: (post, postList) => {
    return postList
      .filter(({ node }) => {
        // Get posts in the same folder of provided post
        return (
          node.fileAbsolutePath.split('/').slice(-2, -1)[0] ===
          post.fileAbsolutePath.split('/').slice(-2, -1)[0]
        )
      })
      .map(({ node }) => {
        let lang = node.fileAbsolutePath.split('.').slice(-2, -1)[0]
        return {
          hreflang: lang.slice(-5) !== 'index' ? lang : Config.defaultLanguage,
          path: Utils.resolveUrl(node.frontmatter.path),
        }
      })
  },

  /**
   * Capitalize passed string
   *
   * @param {string} str string to capitalize
   *
   * @return {string} string with first letter to uppercase
   */
  capitalize: str => str[0].toUpperCase() + str.slice(1),

  /**
   * Split an array in chunks of given length
   *
   * @param {Array} array array to split
   * @param {number} length length of chunks
   *
   * @return {Array} array composed by splitted chunks
   */
  chunk: (array, length) => {
    let result = []

    for (let i = 0; i < length; i++) {
      let chunk = array.slice(i * length, i * length + length)
      if (chunk.length) {
        result.push(chunk)
      } else {
        break
      }
    }

    return result
  },
}

module.exports = Utils
