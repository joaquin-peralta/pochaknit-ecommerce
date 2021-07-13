import { useState, useEffect } from 'react';
import { Pattern } from '@types';
import useSWR from 'swr';
import { currentPrice } from '@utils/maths';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

const useInitialState = () => {
  const [bag, setBag] = useState<Pattern[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { data: patterns } = useSWR(`${API_URL}/patterns`, fetcher);

  const addToBag = (payload: Pattern) => {
    setBag([...bag, payload]);
  };

  const removeFromBag = (payload: Pattern) => {
    setBag([...bag.filter((item) => item._id !== payload._id)]);
  };

  const cleanBag = () => {
    window.localStorage.clear();
    setBag([]);
  };

  const totalCount = (products: Pattern[]) => {
    let sum = 0;
    for (const item of products) {
      sum += currentPrice(item.price, item.discount);
    }
    setTotalPrice(sum);
  };

  useEffect(() => {
    if (bag.length > 0) {
      totalCount(bag);
    }
  }, [bag]);

  useEffect(() => {
    if (patterns) {
      const updatedBag = [];
      for (const pattern of patterns) {
        if (window.localStorage.getItem(pattern._id) !== null) {
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
    totalPrice,
  };
};

export default useInitialState;
