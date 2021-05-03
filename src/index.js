import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';

const className = 'azics-file-uploader';

const upload = () => <div className={className}>1234</div>;

console.log(upload());

ReactDOM.render(upload(), document.getElementById('upload'));
