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