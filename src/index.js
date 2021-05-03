import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';

import imageUpload from './images/upload.svg';

const className = 'azics-file-uploader';

const upload = () => (
  <div className={className}>
    <div className="afu__wrap">
      <div className="afu__work-area">
        <i className="afu__icon"></i>
        <div className="afu__text">
          <p>Drag&Drop files here</p>
          <p>or</p>
        </div>
        <button className="afu__button">Browse Files</button>
      </div>
    </div>
  </div>
);

console.log(upload());

ReactDOM.render(upload(), document.getElementById('upload'));
