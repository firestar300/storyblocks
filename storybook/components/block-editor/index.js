import PropTypes from 'prop-types'
import { getBlockFromExample, createBlock } from '@wordpress/blocks'
import BlockInfo from '../block-info'
import { Editor } from '../editor'

export default function BlockEditor({ block }) {
  return (
    <div className="sb-block">
      <BlockInfo block={block} />
      <Editor
        key={block.name}
        initialBlocks={[
          block.example
            ? getBlockFromExample(block.name, {
                attributes: block.example.attributes,
                innerBlocks: block.example.innerBlocks,
              })
            : createBlock(block.name),
        ]}
      />
    </div>
  )
}

BlockEditor.propTypes = {
  block: PropTypes.object.isRequired,
}
