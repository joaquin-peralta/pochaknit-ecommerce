import { useContext } from 'react';
import SideshopbagContext from '@context/SideshopbagContext';
import { AiOutlineClose } from 'react-icons/ai';
import { colors } from '@utils/themes';

const Sideshopbag = () => {
  const [shopVisibility, setShopVisibility] = useContext(SideshopbagContext);

  const hideShopMenu = () => {
    setShopVisibility(false);
  };

  const shopMenuTranslation = shopVisibility
    ? 'translate3d(0)'
    : 'translate3d(100%, 0, 0)';

  return (
    <>
      <div className="sideshopbag">
        <button className="close-btn" type="button" onClick={hideShopMenu}>
          <AiOutlineClose
            style={{ color: `${colors.analogous500}`, fontSize: '24px' }}
          />
        </button>
        <hr className="divisor" />
        <p className="shopbag-text-info">La bolsa está vacía</p>

        <style jsx>{`
          .sideshopbag {
            width: 304px;
            height: 100vh;
            position: fixed;
            top: 0;
            right: 0;
            z-index: 1003;
            background-color: ${colors.background};
            transition-duration: 0.4s;
            transform: ${shopMenuTranslation};
          }

          .close-btn {
            width: 72px;
            height: 72px;
            border: 0;
            background-color: ${colors.background};
            position: absolute;
            top: 0;
            right: 0;
          }

          .divisor {
            position: absolute;
            top: 72px;
            left: 24px;
            right: 24px;
            color: ${colors.analogous500};
            margin-top: 0;
            margin-bottom: 0;
          }

          .shopbag-text-info {
            font-style: italic;
            position: absolute;
            top: 88px;
            left: 76px;
          }
        `}</style>
      </div>
    </>
  );
};

export default Sideshopbag;
