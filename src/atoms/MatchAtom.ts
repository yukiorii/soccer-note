import { atom, selectorFamily } from "recoil";
import { MatchType } from 'src/types';
import { persistAtom } from "src/atoms/PersistAtom";
import { isSameMonth } from 'date-fns'

export const matchState = atom<MatchType[]>({
  key: "match",
  default: [],
  effects_UNSTABLE: [persistAtom('match')],
});

export const matchByTypeState = selectorFamily({
  key: 'matchByTypeState',
  get: (type: number) => ({ get }) => {
    return get(matchState).filter((x: MatchType) => {
      return x.type == type
    });
  },
});

export const sameMonthMatchState = selectorFamily({
  key: 'sameMonthMatch',
  get: (date: Date) => ({ get }) => {
    return get(matchState).filter((x: MatchType) => {
      return isSameMonth(new Date(x.targetDate), date)
    });
  },
});