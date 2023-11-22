import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

// Step 1: Saga imports
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import App from './App';

const plantList = (state = [], action) => {
  switch (action.type) {
    case 'SET_PLANTS':
      return action.payload;
    default:
      return state;
  }
};

function* fetchPlants() {

  try {
    const response = yield axios.get('/api/plant');
    const action = { type: 'SET_PLANTS', payload: response.data };
    yield put(action);
  } catch (error) {
    console.error('Error fetching plants', error);
    alert('Something went wrong.');
  }

}

function* postPlant(action) {

  try {
    console.log('hello!', action.payload)
    yield axios.post('/api/plant', action.payload);
    yield put({ type: 'FETCH_PLANTS' });
  } catch (error) {
    console.error('Error posting plant', error);
    alert('Something went wrong.');
    throw error;
  }

}

function* removePlant(action) {

  try {
    yield axios.delete(`/api/plant/${action.payload}`);
    yield put({ type: 'FETCH_PLANTS' });
  } catch (error) {
    console.error('Error posting plant', error);
    alert('Something went wrong.');
    throw error;
  }

}

function* rootSaga() {
  yield takeEvery('FETCH_PLANTS', fetchPlants);
  yield takeEvery('ADD_PLANT', postPlant);
  yield takeEvery('REMOVE_PLANT', removePlant);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ plantList }),
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);