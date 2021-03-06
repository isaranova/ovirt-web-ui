import React from 'react'
import PropTypes from 'prop-types'
import { xor } from '_/propTypeExtras'
import style from './style.css'
import classnames from 'classnames'

class EllipsisValue extends React.Component {
  constructor (props) {
    super(props)
    this.ref = React.createRef()
    this.state = {
      isOverflow: false,
    }

    this.updateOverflow = this.updateOverflow.bind(this)
  }

  componentDidUpdate () {
    this.updateOverflow()
  }

  componentDidMount () {
    window.addEventListener('resize', this.updateOverflow)
    this.updateOverflow()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateOverflow)
  }

  updateOverflow () {
    if (!this.props.children) {
      return
    }

    const state = { isOverflow: false }
    if (this.ref.current.offsetWidth < this.ref.current.scrollWidth) {
      state.isOverflow = true
    }
    if (this.state.isOverflow !== state.isOverflow) {
      this.setState(state)
    }
  }

  render () {
    const { className, id, children, tooltip } = this.props

    if (children) {
      return <span
        className={classnames(style['field-value'], className)}
        id={id}
        title={this.state.isOverflow ? tooltip : ''}
        ref={this.ref}
      >
        {children}
      </span>
    }
    return null
  }
}

EllipsisValue.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  children: xor(PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]), 'tooltip'),
  tooltip: xor(PropTypes.string, 'children'),
}

export default EllipsisValue
