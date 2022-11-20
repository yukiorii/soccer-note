import { atom, selectorFamily } from "recoil";
import { MatchType } from 'src/types';
import { persistAtom } from "src/atoms/PersistAtom";
import { isSameMonth } from 'date-fns'

export const matchState = atom<MatchType[]>({
  key: "match",
  default: [],
  effects_UNSTABLE: [persistAtom('match')],
});

export const sameMonthMatchState = selectorFamily({
  key: 'sameMonthMatch',
  get: (date: Date) => ({ get }) => {
    return get(matchState).filter((x: MatchType) => {
      return isSameMonth(new Date(x.targetDate), date)
    });
  },
});