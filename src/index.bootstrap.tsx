import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { bsDmReducer } from '@brightsign/bsdatamodel';
import { baCmReducer } from '@brightsign/ba-context-model';

import { BsPpState } from './type/base';
import { bsPpReducer } from './model';
// import { BsUiModelState } from './type';
import './asset/bootstrap.css';
import 'normalize.css/normalize.css';
import 'flexboxgrid/dist/flexboxgrid.min.css';
import reportWebVitals from './reportWebVitals';
import { BsPp } from './component/BsPp';

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const reducers = combineReducers<BsPpState>({
  bacdm: baCmReducer,
  bsdm: bsDmReducer,
  bsPlayer: bsPpReducer,
});

// const store = createStore(bsPpReducer, composeWithDevTools(applyMiddleware(thunk)));
const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(
      thunk,
    ),
  ));

ReactDOM.render(
  <Provider store={store}>
    <BsPp />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
