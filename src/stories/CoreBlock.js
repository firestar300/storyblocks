import { storiesOf } from '@storybook/react'
import { getBlockType } from '@wordpress/blocks'
import Block from '../components/block'
import BlockEditor from '../components/block-editor'
import coreBlocks from '../coreBlocks'

coreBlocks.forEach((blockSlug) => {
  const blockType = getBlockType(blockSlug)

  if (typeof blockType !== 'undefined') {
    const stories = storiesOf(`Core/${blockType.title}`, module)

    if (typeof blockType.example !== 'undefined') {
      if (typeof blockType.styles !== 'undefined' && blockType.styles.length > 0) {
        stories.addParameters({ backgrounds: { values: [{ name: 'red', value: '#f00' }] } })
        blockType.styles.forEach((style) => {
          stories.add(style.label, () => <Block block={blockType} />)
        })
      } else {
        stories.add('Default', () => <Block block={blockType} />)
      }
    }
  }
})
