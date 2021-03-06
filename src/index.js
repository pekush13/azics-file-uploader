import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import imageStore from './sore';
import './scss/main.scss';
import { UPLOADS, DEFAULT_CLASS_NAME } from './const';
import { App } from './components';
import { highlight, unHighlight } from './upload';

const className = DEFAULT_CLASS_NAME;
const store = createStore(imageStore);
export const defaultOptions = {
  caption: 'Drag&Drop files here <br /> or',
  btnTitle: 'Browse Files',
};

export function uploadFile(files) {
  var reader = new FileReader();
  reader.readAsDataURL(files[0]);

  reader.onload = function () {
    store.dispatch({ type: UPLOADS, image: reader.result });
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

export function init(selector, options = defaultOptions) {
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
  selector.addEventListener('change', (event) =>
    uploadFile(event.target.files)
  );

  document.addEventListener('drop', (ev) => ev.preventDefault());
  document.addEventListener('dragleave', (ev) => ev.preventDefault());
  document.addEventListener('dragenter', (ev) => ev.preventDefault());
  document.addEventListener('dragover', (ev) => ev.preventDefault());

  const workArea = wrapper.querySelector('.afu__work-area');

  workArea.addEventListener('dragenter', () => highlight(wrapper));
  workArea.addEventListener('dragover', () => highlight(wrapper));
  workArea.addEventListener('dragleave', (ev) => unHighlight(ev, wrapper));
  workArea.addEventListener('drop', (ev) => unHighlight(ev, wrapper));
}
