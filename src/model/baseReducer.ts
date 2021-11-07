/** @module Model:base */

import {
  Reducer,
  combineReducers
} from 'redux';
import { isNil } from 'lodash';
import { BsPpModelState } from '../type';
import {
  BsPpModelBaseAction,
} from './baseAction';
import { hsmReducer } from './hsm';
import { presentationDataReducer } from './presentation';
import { playbackReducer } from './playback';

// -----------------------------------------------------------------------
// Defaults
// -----------------------------------------------------------------------

// none

// -----------------------------------------------------------------------
// Reducers
// -----------------------------------------------------------------------

export type BsUiReducer = Reducer<BsPpModelState>;
export const enableBatching = (
  reduce: (state: BsPpModelState, action: BsPpModelBaseAction) => BsPpModelState,
): BsUiReducer => {
  return function batchingReducer(
    state: BsPpModelState,
    action: BsPpModelBaseAction,
  ): BsPpModelState {
    switch (action.type) {
      default:
        return reduce(state, action);
    }
  };
};

export const bsPpReducer = enableBatching(combineReducers<BsPpModelState>({
  hsmState: hsmReducer,
  playback: playbackReducer,
  presentationData: presentationDataReducer,
}));

// -----------------------------------------------------------------------
// Validators
// -----------------------------------------------------------------------

/** @internal */
/** @private */
// TEDTODO - requires further development
export function isValidBsPpModelState(state: any): boolean {
  return !isNil(state);
}

/** @internal */
/** @private */
// TEDTODO - requires further development
export function isValidBsPpModelStateShallow(state: any): boolean {
  return !isNil(state);
}
