import React from 'react';
import { defaultOptions } from './index';

export const Input = ({ selector, options }) => (
  <div className="afu__work-area">
    <i className="afu__icon"></i>
    <div className="afu__text">
      <p
        dangerouslySetInnerHTML={{
          __html: options.caption || defaultOptions.caption,
        }}
      ></p>
    </div>
    <button className="afu__button" onClick={() => selector.click()}>
      {options.btnTitle || defaultOptions.btnTitle}
    </button>
  </div>
);

export const Image = ({ src, options }) => (
  <div>
    <img src={src} style={{ ...options }}></img>
  </div>
);

export const App = ({ selector, value, options }) => {
  const state = value;
  const { image } = state;
  return (
    <div className="afu__root">
      <div className={image ? 'afu__wrap-upload' : 'afu__wrap'}>
        {image ? (
          <Image src={image} options={options} />
        ) : (
          <Input selector={selector} options={options} />
        )}
      </div>
    </div>
  );
};
