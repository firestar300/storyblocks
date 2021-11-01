import { registerBlockType } from '../api'

const coreBlocks = [
  'core/archives',
  'core/audio',
  'core/buttons',
  'core/calendar',
  'core/categories',
  'core/code',
  'core/columns',
  'core/cover',
  'core/embed',
  'core/file',
  'core/gallery',
  'core/group',
  'core/heading',
  'core/html',
  'core/image',
  'core/latest-posts',
  'core/latestComments',
  'core/list',
  'core/media-text',
  'core/paragraph',
  'core/preformatted',
  'core/pullquote',
  'core/quote',
  'core/rss',
  'core/search',
  'core/separator',
  'core/shortcode',
  'core/social-links',
  'core/spacer',
  'core/table',
  'core/tag-cloud',
  'core/verse',
  'core/video',
]

coreBlocks.forEach((block) => registerBlockType(block))

export default coreBlocks
