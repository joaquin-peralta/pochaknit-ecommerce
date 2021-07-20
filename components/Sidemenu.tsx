import { useState, KeyboardEvent, MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import SidemenuData from '@components/SidemenuData';
import { IconContext } from 'react-icons';
import { FaInstagram, FaPinterest } from 'react-icons/fa';
import styles from '@styles/components/Sidemenu.module.scss';

const Sidemenu = () => {
  const [state, setState] = useState(false);

  const toggleDrawer = (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };

  return (
    <>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon />
      </Button>
      <Drawer open={state} onClose={toggleDrawer(false)}>
        <div className={styles.closeBtn}>
          <Button onClick={toggleDrawer(false)}>
            <CloseIcon />
          </Button>
        </div>
        <Divider />
        <List className={styles.list}>
          {SidemenuData.map((item) => (
            <Link key={item.text} href={item.path} passHref>
              <ListItem
                button
                component="a"
                onClick={toggleDrawer(false)}
                className="text-decoration-none text-reset"
              >
                <IconContext.Provider value={{ size: '24px', color: '#0a0a0a' }}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                </IconContext.Provider>
                <ListItemText primary={item.text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <div className="pt-5 text-center">
          <Image src="/sheep2.svg" alt="Una oveja" width={96} height={96} />
        </div>
        <p className="text-center">¡No olvides de seguirme!</p>
        <nav className="text-center">
          <IconContext.Provider value={{ size: '24px', color: '#0a0a0a' }}>
            <a href="https://www.instagram.com/pochaknit/" className="me-3">
              <FaInstagram />
            </a>
            <a href="https://ar.pinterest.com/pochaknit/_created/">
              <FaPinterest />
            </a>
          </IconContext.Provider>
        </nav>
      </Drawer>
    </>
  );
};
export default Sidemenu;
