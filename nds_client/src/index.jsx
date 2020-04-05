import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

console.log('LOG PROCESS.ENV: ');
console.log(process.env);

ReactDOM.render(<App />, document.getElementById('root'));
