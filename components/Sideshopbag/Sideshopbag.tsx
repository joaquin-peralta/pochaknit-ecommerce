import { AiOutlineClose } from 'react-icons/ai';
import { colors } from '@utils/themes';

const Sideshopbag = () => (
  <>
    <div className="sideshopbag">
      <button className="close-btn" type="button">
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

export default Sideshopbag;
