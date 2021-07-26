/* eslint-disable no-unused-vars */
import { createContext, ReactNode } from 'react';
import useInitialState from '@hooks/useInitialState';
import { Pattern } from '@types';

export type CartContextProps = {
  cart: Pattern[];
  addToCart: (payload: Pattern) => void;
  removeFromCart: (payload: Pattern) => void;
  cleanCart: () => void;
  totalPrice: number;
};

export const CartContext = createContext<CartContextProps>(null);

type Props = {
  children: ReactNode;
};

const CartProvider = ({ children }: Props) => {
  const initialState = useInitialState();
  return <CartContext.Provider value={initialState}>{children}</CartContext.Provider>;
};

export default CartProvider;
