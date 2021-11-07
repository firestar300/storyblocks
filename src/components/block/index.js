import PropTypes from 'prop-types'
import BlockExample from '../block-example'
import BlockInfo from '../block-info'
import { EditorStyles } from '../editor-styles'
import './style.css'

export default function Block({ block }) {
  return (
    <div className="sb-block">
      <EditorStyles />
      <BlockInfo block={block} />
      <BlockExample block={block} />
    </div>
  )
}

Block.propTypes = {
  block: PropTypes.object.isRequired,
}
