'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const TextInput = require('./lib/');



/*jshint ignore:start */
var test = (
  <div>
    <div>
      <TextInput label="Email address"
                 message="we will email you a link to sign in"
                 type="email"
                 onChange={onChange}
                 validator={validator}
        />
    </div>
    <p></p>
    <p></p>
  </div>
);

var mountnode = document.getElementById('mountnode');
if (mountnode) {
  ReactDOM.render(
    test,
    mountnode);
}


function onChange(email) {
  console.log(email);
}

function validator(text) {
  if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(text)) {
    return 'it looks not like an invalid email';
  }
}