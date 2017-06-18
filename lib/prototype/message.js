'use strict';

const prototype = exports.prototype = {};

/*
prototype.prepareMessage = function() {

  Object.defineProperties(this, {
    message: {get: _=> {

      let message;

      if (this.props.validator) {
        message  = this.props.validateOnComplete ? this.state.messageOnComplete :
          this.props.validator(this.value)
      }

      if (!message && typeof this.props.message == 'string') {

        if (this.props.validator) {
          message = this.props.validator(this.value) && !this.state.value ?
            this.props.message : '';
        }
        else {
          message = this.props.message;
        }

      }

      return message;
    }}
  })

};*/

prototype.updateMessage = function() {

  if (this.props.validator) {

    let invalid = true;
    let message = this.props.validator(this.value);

    if (!message) {
      message = this.props.message;
      invalid = false;
    }

    this.setState({message, invalid});
  }
  
};