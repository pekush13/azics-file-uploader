import { UPLOADS } from './const';

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

export default imageStore;
