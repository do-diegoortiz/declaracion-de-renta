import * as actions from '../actions/actionTypes';

const initialState = {
  example: 'Hello world'
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    default: return state;
  }
}
export default reducer;
