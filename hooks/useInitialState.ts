import { useState, useEffect } from 'react';
import { Pattern } from '@types';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useInitialState = () => {
  const [bag, setBag] = useState<Pattern[]>([]);
  const { data } = useSWR('http://localhost:1337/patterns', fetcher);

  const addToBag = (payload: Pattern) => {
    setBag([...bag, payload]);
  };

  const removeFromBag = (payload: Pattern) => {
    setBag([...bag.filter((item) => item.id !== payload.id)]);
  };

  useEffect(() => {
    if (data) {
      const updatedBag = [];
      for (const item of data) {
        if (window.localStorage.getItem(item.id) !== null) {
          updatedBag.push(item);
        }
      }
      setBag(updatedBag);
    }
  }, [data]);

  return {
    bag,
    addToBag,
    removeFromBag,
  };
};

export default useInitialState;
