import PropTypes from 'prop-types'
import { BlockIcon } from '@wordpress/block-editor'
import './style.css'

export default function BlockInfo({ block }) {
  return (
    <div className="sb-block-info">
      <h2 className="sb-block-title">
        <BlockIcon icon={block.icon} />
        {block.title}
      </h2>
      <p className="sb-block-description">{block.description}</p>
    </div>
  )
}

BlockInfo.propTypes = {
  block: PropTypes.object.isRequired,
}
