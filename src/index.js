import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './scss/main.scss';

const className = 'azics-file-uploader';

const UPLOADS = 'UPLOADS';

const defaultState = {
  image: false,
};

function imageStore(state = defaultState, action) {
  console.log(action);
  switch (action.type) {
    case UPLOADS:
      return { ...state, image: action.image };
    default:
      return state;
  }
}

const store = createStore(imageStore);

function upload(input) {
  var reader = new FileReader();
  reader.readAsDataURL(input.files[0]);

  reader.onload = function () {
    store.dispatch({ type: UPLOADS, image: reader.result });
    // console.log(reader.result); //base64encoded string
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

const Input = ({ selector }) => (
  <div className="afu__work-area">
    <i className="afu__icon"></i>
    <div className="afu__text">
      <p>Drag&Drop files here</p>
      <p>or</p>
    </div>
    <button className="afu__button" onClick={() => selector.click()}>
      Browse Files
    </button>
  </div>
);

const Image = ({ src }) => (
  <div>
    <img src={src}></img>
  </div>
);

const App = ({ selector, value }) => {
  console.log(1);
  const state = value;
  const { image } = state;
  return (
    <div className="afu__root">
      <div className="afu__wrap">
        {image ? <Image src={image} /> : <Input selector={selector} />}
      </div>
    </div>
  );
};

function render(wrapper, selector) {
  ReactDOM.render(
    <Provider store={store}>
      <App selector={selector} value={store.getState()} />
    </Provider>,
    wrapper
  );
}

export function uploadFile(selector) {
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

  render(wrapper, selector);
  store.subscribe(() => render(wrapper, selector));
  wrapper.appendChild(selector);
  selector.setAttribute('accept', 'image/x-png,image/gif,image/jpeg');
  selector.addEventListener('change', (event) => upload(event.target));
}

uploadFile(document.getElementById('upload'));
