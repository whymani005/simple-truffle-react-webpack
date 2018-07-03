var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App');
require('dotenv').config();

ReactDOM.render(
	<App/>,
	document.getElementById('app')
);