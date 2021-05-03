import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import imageStore from './sore';
import './scss/main.scss';
import { UPLOADS, DEFAULT_CLASS_NAME } from './const';
import { App } from './components';

const className = DEFAULT_CLASS_NAME;
const store = createStore(imageStore);
export const defaultOptions = {
  caption: 'Drag&Drop files here <br /> or',
  btnTitle: 'Browse Files',
};

function upload(input) {
  var reader = new FileReader();
  reader.readAsDataURL(input.files[0]);

  reader.onload = function () {
    store.dispatch({ type: UPLOADS, image: reader.result });
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

export function uploadFile(selector, options = defaultOptions) {
  const content = (
    <Provider store={store}>
      <App selector={selector} value={store.getState()} />
    </Provider>
  );

  if (selector.tagName !== 'INPUT' || selector.type !== 'file') {
    throw new Error('There must be a file type field');
  }

  const wrapper = document.createElement('DIV');
  wrapper.classList.add(className);
  selector.parentNode.insertBefore(wrapper, selector);
  const render = () => {
    ReactDOM.render(
      <Provider store={store}>
        <App selector={selector} value={store.getState()} options={options} />
      </Provider>,
      wrapper
    );
  };
  render();
  store.subscribe(render);
  wrapper.appendChild(selector);
  selector.setAttribute('accept', 'image/x-png,image/gif,image/jpeg');
  selector.addEventListener('change', (event) => upload(event.target));
}

uploadFile(document.getElementById('upload'));
