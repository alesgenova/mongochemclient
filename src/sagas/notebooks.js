import { put, call, takeEvery } from 'redux-saga/effects'
import { LOAD_NOTEBOOK, requestNotebook, receiveNotebook  } from '../redux/ducks/notebooks'
import { fetch } from '../rest/notebooks'

export function* loadNotebook(action) {
  try {
    const id = action.payload.id;
    yield put(requestNotebook());

    const html = yield call(fetch, id);

    yield put(receiveNotebook(id, html));
  }
  catch(error) {
    yield put(requestNotebook(error));
  }
}

export function* watchLoadNotebook() {
  yield takeEvery(LOAD_NOTEBOOK, loadNotebook);
}