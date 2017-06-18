'use strict';

const prototype = exports.prototype = {};

prototype.subscribe = function() {

  var input = null;
  Object.defineProperties(this, {
    input: { get: _=> input}
  });

  this.catchInput = ref=> input = ref;

  this.onLabelClick = this.onLabelClick();

  this.onFocus = this.onFocus();

  this.onBlur = this.onBlur();

  this.onChange = this.onChange();

  this.onKeyDown = this.onKeyDown();
};

prototype.onLabelClick = function() {
  return event=> {
    event.stopPropagation();
    if (this.state.focused || this.props.disabled) return;
    this.input.focus();
  }
};

prototype.onFocus = function() {
  return event=> {

    if (this.props.disabled) return;
    this.setState({focused: true});
    if (this.props.onFocus) this.props.onFocus(event);
  }
};

prototype.onBlur = function() {
  return event=> {

    this.setState({focused: false});
    if (this.props.validateOnComplete && this.props.validator) {
      this.setState({messageOnComplete: this.props.validator(this.value)});
    };

    if (this.props.onBlur) this.props.onBlur(event);
  }
};

prototype.onChange = function() {
  return event=> {

    if (!this.input) return;
    var text = this.input.value;

    if (this.props.length) text = text.substr(0, this.props.length);
    this.setState({value: text});

    if (this.props.onChange) this.props.onChange(text);
  }
};

prototype.onKeyDown = function() {
  return event=> {
    if (event.keyCode == 13 && this.props.validateOnComplete && this.props.validator) {
      this.setState({messageOnComplete: this.props.validator(this.value)})
    }

    if (event.keyCode == 13 && this.props.onEnterKey && !this.props.disabled) {
      this.props.onEnterKey(event);
    }
  }
};