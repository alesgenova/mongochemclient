import { createAction, handleActions } from 'redux-actions';

// Actions
export const LOAD_NOTEBOOK   = 'LOAD_NOTEBOOK';
export const REQUEST_NOTEBOOK   = 'REQUEST_NOTEBOOK';
export const RECEIVE_NOTEBOOK   = 'RECEIVE_NOTEBOOK';


export const initialState = {
  htmlById: {}
};

// Reducer
const reducer = handleActions({
  REQUEST_NOTEBOOK: (state, action) => {
    if (action.error) {
      return {...state, error: action.payload.error};
    }
    else {
      return {...state,  error:null };
    }
  },
  RECEIVE_NOTEBOOK: (state, action) => {
    const {id, html}  = action.payload;
    const current = state.htmlById;
    const htmlById = { ...current, [id]: html}
    return {...state,  htmlById };
  },
  throw: (state, action) => state
}, initialState);

// Action Creators
export const loadNotebook = createAction(LOAD_NOTEBOOK, (id) => ({ id }));
export const requestNotebook = createAction(REQUEST_NOTEBOOK);
export const receiveNotebook = createAction(RECEIVE_NOTEBOOK, (id, html) => ({ id, html }));

export default reducer;
