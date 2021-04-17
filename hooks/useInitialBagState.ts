import { useState } from 'react';
import { Pattern } from '@types';

const useInitialBagState = () => {
  const [bag, setBag] = useState<Pattern[]>([]);

  const addToBag = (payload: Pattern) => {
    setBag([...bag, payload]);
  };

  const removeFromBag = (payload: Pattern) => {
    setBag([...bag.filter((item) => item.id !== payload.id)]);
  };

  return {
    bag,
    addToBag,
    removeFromBag,
  };
};

export default useInitialBagState;
