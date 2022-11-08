import { atom } from "recoil";
import { MatchType } from 'src/types';
import { persistAtom } from "src/atoms/PersistAtom";

export const matchState = atom<MatchType[]>({
  key: "match",
  default: [],
  effects_UNSTABLE: [persistAtom('match')],
});
