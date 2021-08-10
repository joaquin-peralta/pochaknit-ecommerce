import { useContext, useState, useEffect, KeyboardEvent, MouseEvent, SyntheticEvent } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CartContext } from '@context/CartContext';
import Container from 'react-bootstrap/Container';
import CartmenuItem from '@components/CartmenuItem';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import BootstrapButton from 'react-bootstrap/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Badge from '@material-ui/core/Badge';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import * as fbq from '@utils/fpixel';
import styles from '@styles/components/Cartmenu.module.scss';

const Cartmenu = () => {
  const { user } = useUser();
  const router = useRouter();
  const { cart, totalPrice } = useContext(CartContext);
  const [state, setState] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const [badgeState, setBadgeState] = useState(true);

  useEffect(() => {
    if (cart.length > 0) {
      setBadgeState(false);
    } else {
      setBadgeState(true);
    }
  }, [cart]);

  const toggleDrawer = (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };

  const handleCloseAlert = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertState(false);
  };

  const handleCheckout = (open: boolean) => {
    if (user) {
      if (process.env.NODE_ENV === 'production') {
        fbq.event('InitiateCheckout', {
          content_category: `${cart.map((item) => item.category)}`,
          currency: 'ARS',
          value: totalPrice,
        });
      }
      setState(open);
      router.push('/checkout');
    } else {
      setState(open);
      setAlertState(true);
    }
  };

  return (
    <>
      <Button onClick={toggleDrawer(true)}>
        <Badge color="secondary" variant="dot" invisible={badgeState}>
          <LocalMallOutlinedIcon />
        </Badge>
      </Button>
      <Drawer anchor="right" open={state} onClose={toggleDrawer(false)}>
        <div className={styles.closeBtn}>
          <Button onClick={toggleDrawer(false)}>
            <CloseIcon />
          </Button>
        </div>
        <Divider />
        {cart.length === 0 && (
          <div className={styles.emptyList}>
            <p className="mb-0">La bolsa está vacía</p>
            <Link href="/patterns" passHref>
              <BootstrapButton variant="link" onClick={toggleDrawer(false)}>
                Ver más patrones
              </BootstrapButton>
            </Link>
          </div>
        )}
        {cart.length > 0 && (
          <>
            <List className={styles.list}>
              {cart.map((item) => (
                <ListItem key={item._id}>
                  <CartmenuItem item={item} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <Container className="py-3 text-center">
              <p className="mb-0">Total</p>
              <p className="fw-bold">$ {totalPrice}</p>
              <BootstrapButton variant="outline-primary" onClick={() => handleCheckout(false)}>
                <span className="fw-bold">Checkout</span>
              </BootstrapButton>
            </Container>
          </>
        )}
      </Drawer>
      {alertState && (
        <Snackbar open={alertState} autoHideDuration={6000} onClose={handleCloseAlert}>
          <MuiAlert onClose={handleCloseAlert} severity="warning">
            Antes de comprar debes iniciar sesión o crear una cuenta si no tienes.
          </MuiAlert>
        </Snackbar>
      )}
    </>
  );
};

export default Cartmenu;
