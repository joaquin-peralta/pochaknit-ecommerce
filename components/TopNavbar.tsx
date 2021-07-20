import Link from 'next/link';
import Image from 'next/image';
import Sidemenu from '@components/Sidemenu';
import Usermenu from '@components/Usermenu';
import Cartmenu from '@components/Cartmenu';
import DesktopNav from '@components/DesktopNav';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import styles from '@styles/components/TopNavbar.module.scss';

const TopNavbar = () => {
  const matches = useMediaQuery('(min-width:992px)');

  return (
    <header className={styles.header}>
      {!matches && (
        <>
          <div className={styles.menuBtn}>
            <Sidemenu />
          </div>
          <div className={styles.mobileLogo}>
            <Link href="/">
              <a>
                <Image src="/square-logo.png" alt="brand" width={72} height={72} />
              </a>
            </Link>
          </div>
        </>
      )}
      {matches && (
        <>
          <div className={styles.desktopLogo}>
            <Link href="/">
              <a className="d-block">
                <Image src="/logo.png" alt="brand" width={179} height={72} />
              </a>
            </Link>
          </div>
          <div className={styles.desktopNav}>
            <DesktopNav />
          </div>
        </>
      )}
      <div className={styles.userBtn}>
        <Usermenu />
      </div>
      <div className={styles.cartBtn}>
        <Cartmenu />
      </div>
    </header>
  );
};

export default TopNavbar;
