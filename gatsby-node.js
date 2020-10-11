/* Vendor imports */
const path = require('path');
/* App imports */
const config = require('./config');
const utils = require('./src/utils');

exports.createPages = ({ actions, graphql }) => {

  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
        edges {
          node {
            id
            frontmatter {
              path
              tags
            }
            fileAbsolutePath
          }
        }
      }
    }    
  `).then(result => {
    if (result.errors) return Promise.reject(result.errors);

    const { site, allMarkdownRemark } = result.data

    /* Post pages */
    allMarkdownRemark.edges.forEach(({ node }) => {
      validatePostPath(node.frontmatter.path)
      createPage({
        path: node.frontmatter.path,
        component: path.resolve('src/templates/post/post.tsx'),
        context: {
          postId: node.id,
          translations: utils.getRelatedTranslations(node, allMarkdownRemark.edges)
        }
      })
    })

    const regexForIndex = /index\.md$/
    // Posts in default language, excluded the translated versions
    const defaultPosts = allMarkdownRemark.edges.filter(({ node: { fileAbsolutePath } }) => fileAbsolutePath.match(regexForIndex))

    /* Tag pages */
    const allTags = [];
    defaultPosts.forEach(({ node }) => {
      node.frontmatter.tags.forEach(tag => {
        if (allTags.indexOf(tag) === -1) allTags.push(tag)
      })
    })

    allTags
    .forEach(tag => {
      createPage({
        path: utils.resolveUrl(config.pages.tag, tag),
        component: path.resolve('src/templates/tag/tag.tsx'),
        context: {
          tag: tag
        }
      })
    })

    /* Archive pages */
    utils
      .chunk(defaultPosts, config.postsForArchivePage)
      .forEach((posts, index, chunkedPosts) => {
        let pageNumber = index + 1;
        createPage({
          path: utils.resolveUrl(config.pages.archive, pageNumber),
          component: path.resolve('src/templates/archive/archive.tsx'),
          context: {
            postIds: posts.map(edge => edge.node.id),
            archivePage: pageNumber,
            lastArchivePage: chunkedPosts.length
          }
        })
      })

  })

}

/**
 * Check that the passed path can be valid url for a post page
 * 
 * @param {string} path
 * 
 * @throws Will throw an error if the path is invalid
 */
const validatePostPath = (path) => {
  if (path.split('/').indexOf(config.pages.blog) === -1) {
    throw `Missing or invalid path prefix: ${path}\nCheck that the prefix "${config.pages.blog}" is in the right place`
  }
}
