import Link from 'next/link';
import SidemenuData from '@components/SidemenuData';
import styles from '@styles/components/DesktopNav.module.scss';

const DesktopNav = () => (
  <nav>
    <ul className={styles.list}>
      {SidemenuData.map((item) => (
        <Link key={item.text} href={item.path}>
          <a className={styles.item}>
            <li>{item.text}</li>
          </a>
        </Link>
      ))}
    </ul>
  </nav>
);

export default DesktopNav;
