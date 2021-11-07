import PropTypes from 'prop-types'
import { useState } from '@wordpress/element'
import { BlockEditorProvider, BlockList, BlockTools, WritingFlow, ObserveTyping } from '@wordpress/block-editor'
import { SlotFillProvider, Popover } from '@wordpress/components'

export function Editor({ initialBlocks }) {
  // console.log(initialBlocks)
  const [blocks, updateBlocks] = useState([initialBlocks])

  return (
    <div className="editor-styles-wrapper">
      <BlockEditorProvider
        value={blocks}
        onInput={(blocks) => updateBlocks(blocks)}
        onChange={(blocks) => updateBlocks(blocks)}
      >
        <SlotFillProvider>
          <BlockTools>
            <WritingFlow>
              <ObserveTyping>
                <BlockList />
              </ObserveTyping>
            </WritingFlow>
          </BlockTools>
          <Popover.Slot />
        </SlotFillProvider>
      </BlockEditorProvider>
    </div>
  )
}

Editor.propTypes = {
  initialBlocks: PropTypes.array.isRequired,
}
