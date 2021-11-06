/** @module Types:base */

import { BaContextModelState } from '@brightsign/ba-context-model';
import { DmState } from '@brightsign/bsdatamodel';

import { PresentationDataState } from './presentation';

export class RuntimeEnvironment {
  static BrightSign = 'BrightSign';
  static BaconPreview = 'BaconPreview';
  static Dev = 'Dev';
}
Object.freeze(RuntimeEnvironment);

/** @internal */
/** @private */
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export interface FileLUT { [fileName: string]: string; }

export interface BsPpState {
  bsdm: DmState;
  bacdm: BaContextModelState;
  bsPlayer: BsPpModelState;
}

export interface BsPpModelState {
  // hsmState: HsmState;
  presentationData: PresentationDataState;
  // playback: PlaybackState;
  // arDataFeeds: ArDataFeedMap;
}

export const bsPpStateFromState = (state: any): BsPpState => {
  if (state.hasOwnProperty('bspp')) {
    const bsPpModelState: BsPpModelState = (state as any).bspp;
    const bsPpState: BsPpState = {
      bsdm: state.bsdm,
      bacdm: state.bacdm,
      bsPlayer: {
        // playback: bsPpModelState.playback,
        presentationData: bsPpModelState.presentationData,
        // hsmState: bsPpModelState.hsmState,
        // arDataFeeds: bsPpModelState.arDataFeeds,
      }
    };
    return bsPpState;
  } else if (state.hasOwnProperty('bsPlayer')) {
    return state;
  } else {
    debugger;
    return state;
  }
};

