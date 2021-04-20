import { useState, useEffect } from 'react';
import { Pattern } from '@types';
import populateBag from '@utils/localStorage';

const useInitialBagState = () => {
  const [bag, setBag] = useState<Pattern[]>([]);

  const addToBag = (payload: Pattern) => {
    setBag([...bag, payload]);
  };

  const removeFromBag = (payload: Pattern) => {
    setBag([...bag.filter((item) => item.id !== payload.id)]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const updatedBag = await populateBag();
      setBag(updatedBag);
    };
    fetchData();
  }, []);

  return {
    bag,
    addToBag,
    removeFromBag,
  };
};

export default useInitialBagState;
