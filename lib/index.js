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
  savingText: 'saving...',
  onChange: nop,
  onEnterKey: nop,
  onBlur: nop,
  onFocus: nop,

  parentValidating: false
}

TextInput.propTypes = {
  type: is.oneOf(['text', 'password', 'datetime', 'datetime-local', 'date',
    'month', 'time', 'week', 'number', 'email', 'url', 'search']).isRequired,

  controlled: is.bool,
  label: is.string.isRequired,
  value: is.oneOfType([is.string, is.number]),
  saving: is.oneOfType([is.bool, is.number]),
  savingText: is.string,
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
  focusOnMounted: is.bool,

  fontSize: is.number, // for label and input text
  className: is.string,
  labelClass: is.string
}

/**
 * @constructor
 */
function TextInput(props) {
  React.Component.call(this, props)
  this.state = {
    focused: false,
    value: props.value || '',
    message: props.message,
    invalid: false // plan used in styles, not used yet
  }

  var id = uuid()

  Object.defineProperties(this, {
    id: { value: id },

    value: {
      get: _=> {
        let val = !this.props.controlled ? this.state.value : this.props.value
        val = val || val === 0 ? val : ''
        if (this.props.type == 'number') val = String(Number(val)) // avoid stupid `01`
        if (this.state.focused && (val === '0' || val === 0)) {
          return this.state.value // hack to avoid `0` bug, use this.state to show the current true value
        }

        // if (this.state.focused && !this.props.uncontrolled && this.props.value === 0) {
        //   return this.state.value // avoid controlled `0` bug
        // }
        //
        return val
      }
    }
    // value: { get: _=> {
    //   let props = this.props
    //   let state = this.state
    //   let value
    //   if (~['number', 'string'].indexOf(typeof props.value)) {
    //     value = String(props.value)
    //     if (value) return value
    //   }
    //
    //   // if (!state.value) return ''
    //   value = String(state.value)
    //   return value
    // }}
  })

  this.prepareStyles()
  this.subscribe()
}

/**
 * @public
 * @return {ReactElement}
 */
prototype.render = function() {

  return (
    <div className={this.classes.container} style={this.styles.container}>

      <label className={this.classes.label}
             style={this.styles.label}
             htmlFor={this.id}
             suppressHydrationWarning
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
             suppressHydrationWarning
             autoComplete="off"
             autoCorrect="off"
             autoCapitalize="off" />

      {(_=> {
        // message element
        var message = (
          <div style={this.styles.message}>
            <div className={this.classes.message} style={this.styles.messageInner}>
              {(_=> {
                if (!this.props.saving) return this.state.message
                return (
                  <div>
                    {this.props.savingText}
                    <span className="fa fa-refresh fa-spin fa-fw" />
                  </div>
                )
              })()}
            </div>
          </div>)

        if (this.props.disabled) message = null
        return message
      })()}

    </div>
  )
}

function nop() { }

if (process.env.NODE_ENV !== 'production') {
  TextInput.displayName = 'TextInput'
}
