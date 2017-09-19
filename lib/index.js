'use strict'

/**
 * Module Dependencies
 */
const React = require('react')
const inherits = require('inherits')
const is = require('prop-types')
const inject = require('inject-css')
const uuid = require('uuid')
const _proto = require('./prototype')



/**
 * inherits and expose module
 */
inherits(TextInput, React.Component)
module.exports = TextInput
inject(require('./css/index.scss'), {prepend: true})
var prototype = Object.assign(TextInput.prototype, _proto)

TextInput.defaultProps = {
  type: 'text',
  height: 80,
  validateOnComplete: true,
  value: null,
  message: '',
  onChange: nop,
  onEnterKey: nop,
  onBlur: nop,
  onFocus: nop,

  parentValidating: false
}

TextInput.propTypes = {
  type: is.oneOf(['text', 'password', 'datetime', 'datetime-local', 'date',
    'month', 'time', 'week', 'number', 'email', 'url', 'search']).isRequired,

  label: is.string.isRequired,
  value: is.oneOfType([is.string, is.number]),

  height: is.number,
  length: is.number,
  disabled: is.bool,
  message: is.string,
  validateOnComplete: is.bool,
  validator: is.func,
  onChange: is.func,
  onEnterKey: is.func,
  onBlur: is.func,
  onFocus: is.func,
  parentValidating: is.bool, // is parent in validating stage? ( submit clicked..)
  focusOnMounted: is.bool
}

/**
 * @constructor
 */
function TextInput(props) {
  React.Component.call(this, props)
  this.state = {
    focused: false,
    value: null,
    message: props.message,
    invalid: false // plan used in styles, not used yet
  }

  var id = uuid()

  Object.defineProperties(this, {
    id: { value: id },

    value: { get: _=> {
      let props = this.props
      if (props.value) {
        let value = String(props.value).trim()
        if (value) return value
      }
      return this.state.value.trim()
    }}
  })

  this.prepareStyles()
  this.subscribe()
}

/**
 * @public
 * @return {ReactElement}
 */
prototype.render = function() {

  // message element
  var message = (
    <div style={this.styles.message}>
      <div className={this.classes.message} style={this.styles.messageInner}>
        {this.state.message}
      </div>
    </div>)
  if (this.props.disabled) message = null

  return (
    <div className={this.classes.container} style={this.styles.container}>

      <label className={this.classes.label}
             style={this.styles.label}
             htmlFor={this.id}
             onClick={this.onLabelClick} >
        {this.props.label}
      </label>

      <input id={this.id}
             type={this.props.type}
             ref={this.catchInput}
             className={this.classes.input}
             style={this.styles.input}
             value={this.value}
             onFocus={this.onFocus}
             onBlur={this.onBlur}
             onChange={this.onChange}
             onKeyDown={this.onKeyDown}
             disabled={this.props.disabled}
             spellCheck={false}
             autoComplete="off"
             autoCorrect="off"
             autoCapitalize="off" />

      {message}

    </div>
  )
}

function nop() { }

if (process.env.NODE_ENV !== 'production') {
  TextInput.displayName = 'TextInput'
}
