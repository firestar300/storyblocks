import PropTypes from 'prop-types'
import { getBlockFromExample } from '@wordpress/blocks'
import { BlockPreview } from '@wordpress/block-editor'
import { EditorStyles } from '../editor-styles'
// import './style.css';

export default function BlockExample({ block }) {
  return (
    <div className="sb-block-example">
      <EditorStyles />
      <BlockPreview
        viewportWidth={1000}
        blocks={getBlockFromExample(block.name, {
          attributes: block.example.attributes,
          innerBlocks: block.example.innerBlocks,
        })}
      />
    </div>
  )
}

BlockExample.propTypes = {
  block: PropTypes.object.isRequired,
}
