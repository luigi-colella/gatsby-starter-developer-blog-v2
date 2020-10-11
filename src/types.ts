/* Vendor imports */
import { FluidObject, FixedObject } from 'gatsby-image'
/* App imports */
import Lang from './i18n/default'
import { hreflangMap } from './templates/post/article-heading/article-heading'

export interface ChildImageSharpFluid {
  fluid: FluidObject
}

export interface ChildImageSharpFixed {
  fixed: FixedObject
}

export type AvailableTag = keyof typeof Lang['tags']

export type AvailableLanguage = keyof typeof hreflangMap
