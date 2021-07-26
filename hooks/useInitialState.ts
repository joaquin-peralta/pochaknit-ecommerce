import { useState, useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import { Pattern } from '@types';
import { currentPrice } from '@utils/maths';

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const useInitialState = () => {
  const [storage, setStorage, cleanStorage] = useLocalStorage<Pattern[]>('cart');
  const [cart, setCart] = useState<Pattern[]>(storage || []);
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = (payload: Pattern) => {
    if (!cart.includes(payload)) {
      setCart([...cart, payload]);
      setStorage([...cart, payload]);
    }
  };

  const removeFromCart = (payload: Pattern) => {
    setCart([...cart.filter((item) => item._id !== payload._id)]);
    setStorage([...cart.filter((item) => item._id !== payload._id)]);
  };

  const cleanCart = () => {
    setCart([]);
    cleanStorage();
  };

  useEffect(() => {
    if (cart.length === 0) {
      setTotalPrice(0);
    } else {
      setTotalPrice(cart.map((item) => currentPrice(item.price, item.discount)).reduce(reducer));
    }
  }, [cart]);

  return {
    cart,
    addToCart,
    removeFromCart,
    cleanCart,
    totalPrice,
  };
};

export default useInitialState;
