/* eslint-disable no-unused-vars */
import { createContext } from 'react';
import { Pattern } from '@types';

type GlobalBagContent = {
  bag: Pattern[];
  addToBag: (payload: Pattern) => void;
  removeFromBag: (payload: Pattern) => void;
  cleanBag: () => void;
  totalPrice: number;
};

const BagContext = createContext<GlobalBagContent>(null);

export default BagContext;
