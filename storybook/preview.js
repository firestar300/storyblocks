import { registerCoreBlocks } from '@wordpress/block-library'
import '@wordpress/components/build-style/style.css'
import '@wordpress/block-editor/build-style/style.css'
import '@wordpress/block-library/build-style/style.css'
import '@wordpress/block-library/build-style/theme.css'
import '@wordpress/block-library/build-style/editor.css'
import '@wordpress/format-library/build-style/style.css'
import './style.scss'

registerCoreBlocks()

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'fullscreen',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
