import { currentPrice } from '@utils/maths';

type Props = {
  price: number;
  discount: number;
};

const ProductPrice = ({ price, discount }: Props) => {
  if (discount > 0) {
    return (
      <>
        <small style={{ textDecoration: 'line-through' }}>$ {price}</small>
        <span className="ml-2" style={{ color: '#b13679' }}>{`${discount}% OFF`}</span>
        <p className="h3" style={{ color: '#b13679' }}>
          $ {currentPrice(price, discount)}
        </p>
      </>
    );
  }

  return <p className="h3">$ {price}</p>;
};

export default ProductPrice;
