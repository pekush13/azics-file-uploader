import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './scss/main.scss';

const className = 'azics-file-uploader';

const UPLOADS = 'UPLOADS';
const SET_OPTIONS = 'SET_OPTIONS';

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

const Input = ({ selector, options }) => (
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

const Image = ({ src, options }) => (
  <div>
    <img src={src}></img>
  </div>
);

const App = ({ selector, options }) => {
  const state = store.getState();
  const { image } = state;
  return (
    <div className="afu__root">
      <div className="afu__wrap">
        {image ? (
          <Image src={image} options={options} />
        ) : (
          <Input selector={selector} options={options} />
        )}
      </div>
    </div>
  );
};

const defaultOptions = {
  caption: 'Drag&Drop files here <br /> or',
  btnTitle: 'Browse Files',
};

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
        <App selector={selector} options={options} />
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
