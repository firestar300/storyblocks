import PropTypes from 'prop-types'
import { BlockIcon } from '@wordpress/block-editor'
import './style.css'

export default function BlockInfo({ block }) {
  return (
    <div className="sb-block-info">
      <div className="sb-block-meta">
        <BlockIcon icon={block.icon} />
        <span>{block.name}</span>
      </div>
      <h2 className="sb-block-title">{block.title}</h2>
      <p className="sb-block-description">{block.description}</p>
    </div>
  )
}

BlockInfo.propTypes = {
  block: PropTypes.object.isRequired,
}
