'use strict'

const prototype = exports.prototype = {}

prototype.subscribe = function() {

  var input = null
  Object.defineProperties(this, {
    input: { get: _=> input}
  })

  this.catchInput = ref=> {
    if (!ref) return
    input = ref
    if (this.props.focusOnMounted === true) input.focus()
  }

  this.onLabelClick = this.onLabelClick()

  this.onFocus = this.onFocus()

  this.onBlur = this.onBlur()

  this.onChange = this.onChange()

  this.onKeyDown = this.onKeyDown()
}

prototype.componentDidMount = prototype.componentDidUpdate = function() {
  if (this.props.parentValidating) {
    this.updateMessage()
  }
}

prototype.onLabelClick = function() {
  return event=> {
    event.stopPropagation()
    if (this.state.focused || this.props.disabled) return
    this.input.focus()
  }
}

prototype.onFocus = function() {
  return event=> {

    if (this.props.disabled) return
    this.setState({focused: true})
    if (this.props.onFocus) this.props.onFocus(event)
  }
}

prototype.onBlur = function() {
  return event=> {

    if (this.props.disabled) return

    this.setState({focused: false})
    if (this.value) this.updateMessage()
    this.props.onBlur(event)
  }
}

prototype.onChange = function() {
  return event=> { // eslint-disable-line no-unused-vars

    if (!this.input || this.props.disabled) return

    var text = this.input.value
    if (this.props.length) text = text.substr(0, this.props.length)

    this.props.onChange(text)
    this.setState({value: text}) // store it to know the actual text, even it is controlled mode
  }
}

prototype.onKeyDown = function() {
  return event=> {

    if (this.props.disabled) return

    if (event.keyCode == 13) {
      this.props.onEnterKey(event)
      this.updateMessage()
    }
    else {
      if (!this.props.validateOnComplete) this.updateMessage()
    }
  }
}
