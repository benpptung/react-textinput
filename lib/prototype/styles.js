'use strict'

const prefix = require('react-style-prefix')
const prototype = exports.prototype = {}
const HASH = 'e063802d'

prototype.prepareStyles = function() {

  var height = this.props.height

  // container
  var container = prefix({
    boxSizing: 'border-box',
    position: 'relative',
    display: 'block',
    width: '100%',
    height,
    paddingTop: height * .25,
    paddingBottom: height * 0.025,
    paddingRight: height * 0.025,
    paddingLeft: height * 0.025
  })

  // label
  var label = { normal: prefix({
    position: 'absolute',
    display: 'block',
    width: '100%',
    //fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    WebkitFontSmoothing: 'antialiased',
    cursor: 'text',

    zIndex: 1,
    top: height * 0.25,
    left: 0,
    height: height * 0.425,
    fontSize: height * 0.3,
    lineHeight: (height * 0.425) + 'px',
    paddingLeft: height * 0.025,
    /*transitionDuration: '0.25s',
    transitionProperty: 'top, font-size',
    transitionTimingFunction: 'ease-in',*/
    marginBottom: 0, // resist bootstrap styling

    transition: 'all 0.45s',
    transform: 'scale(1) translate(0, 0)',
    transformOrigin: 'left top 0px',

    // resist css framework
    maxWidth: 'none',
    fontWeight: 'normal'
  })}

  label.focused = Object.assign({}, label.normal, prefix({
    //zIndex: 'auto',
    //top: height * 0.07,
    //height: height * 0.15,
    //fontSize: height * 0.15,
    //lineHeight: (height * 0.15) + 'px',
    cursor: 'default',

    //transform: `scale(.5) translate(0, -${label.normal.fontSize * 1.3}px)`
    transform: `scale(.5) translate(0, -${label.normal.height}px)`

  }))

  label.disabled = Object.assign({}, label.normal, prefix({
    cursor: 'default'
  }))

  // input
  var input = prefix({
    width: '100%',
    display: 'block',
    outlineColor: 'rgba(0, 0, 0, 0)',
    outlineStyle: 'none',
    outlineWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    height: height * 0.425,
    fontSize: height * 0.3,
    lineHeight: (height * 0.425) + 'px',
    paddingTop: height * 0.025,
    paddingRight: height * 0.025,
    paddingBottom: height * 0.025,
    paddingLeft: height * 0.025,

    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  })

  // message
  var message = prefix({
    overflow: 'hidden',
    position: 'relative',
    display: 'block',
    width: '100%',
    height: height - container.paddingTop - input.height - container.paddingBottom
  })

  // messageInner
  var messageInner = { normal: prefix({
    position: 'absolute',
    display: 'block',
    width: '100%',
    // stick on a font-familly first
    //fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    transitionProperty: 'top',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'ease-in-out',
    top: '-100%',
    left: 0,
    fontSize: height * 0.15,
    lineHeight: ( height * 0.3 ) + 'px'
  })}
  messageInner.active = Object.assign({}, messageInner.normal, {top: 0})


  var styles = Object.defineProperties({}, {
    container: { get: _=> container},

    label: { get: _=> {
      if (this.props.disabled) return label.disabled
      if (this.state.focused || this.state.value) return label.focused
      return label.normal
    }},

    input: { get: _=> input },

    message: { get: _=> message },

    messageInner:  { get: _=> {
      return this.state.message ? messageInner.active : messageInner.normal
    }}
  })

  var classes = Object.defineProperties({}, {

    container: { get: _=> {
      let names = 'react-textinput-' + HASH
      if (this.state.focused || this.state.value) {
        names += ' floating'
      }
      if (this.state.value) {
        names += ' title'
      }
      if (this.props.disabled) {
        names += ' disabed'
      }
      return names
    }},

    message: {
      get: _=> this.state.invalid ? 'message warn' : 'message'
    },

    input: { get: _=> 'input-' + HASH},
    label: { get: _=> 'label-' + HASH}

  })

  Object.defineProperties(this, {
    styles: { get: _=> styles },

    classes: { get: _=> classes }
  })

}