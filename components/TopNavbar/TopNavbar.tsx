import Image from 'next/image';
import { IconContext } from 'react-icons';
import { AiOutlineMenu, AiOutlineShopping } from 'react-icons/ai';
import { colors } from '@utils/themes';

const TopNavbar = () => (
  <header className="header">
    <IconContext.Provider value={{ color: '#fff', size: '24px' }}>
      <button type="button" className="header-btn">
        <AiOutlineMenu />
      </button>
      <div className="brand">
        <Image src="/square-logo.png" alt="logo" width={64} height={64} />
      </div>
      <button type="button" className="header-btn">
        <AiOutlineShopping />
      </button>
    </IconContext.Provider>

    <style jsx>{`
      .header {
        width: 100%;
        height: 72px;
        background-color: ${colors.primary};
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        top: 0;
      }

      .header-btn {
        width: 72px;
        height: 72px;
        border: 0;
        background-color: ${colors.primary};
      }

      .brand {
        width: 64px;
        height: 64px;
      }
    `}</style>
  </header>
);

export default TopNavbar;
