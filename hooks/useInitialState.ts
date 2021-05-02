import { useState, useEffect } from 'react';
import { Pattern } from '@types';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useInitialState = () => {
  const [bag, setBag] = useState<Pattern[]>([]);
  const { data: patterns } = useSWR('http://localhost:1337/patterns', fetcher);

  const addToBag = (payload: Pattern) => {
    setBag([...bag, payload]);
  };

  const removeFromBag = (payload: Pattern) => {
    setBag([...bag.filter((item) => item.id !== payload.id)]);
  };

  const cleanBag = () => {
    window.localStorage.clear();
    setBag([]);
  };

  useEffect(() => {
    if (patterns) {
      const updatedBag = [];
      for (const pattern of patterns) {
        if (window.localStorage.getItem(pattern.id) !== null) {
          updatedBag.push(pattern);
        }
      }
      setBag(updatedBag);
    }
  }, [patterns]);

  return {
    bag,
    addToBag,
    removeFromBag,
    cleanBag,
  };
};

export default useInitialState;
