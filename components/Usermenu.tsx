import { useState, useEffect, useRef, MouseEvent, KeyboardEvent } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import BootstrapButton from 'react-bootstrap/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Badge from '@material-ui/core/Badge';
import styles from '@styles/components/Usermenu.module.scss';

const Usermenu = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  if (user) {
    return (
      <>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Badge color="secondary" variant="dot">
            <AccountCircleOutlinedIcon />
          </Badge>
        </Button>
        <Popper
          className={styles.menu}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem>¡Hola {user.nickname}!</MenuItem>
                    <MenuItem className="justify-content-center">
                      <Link href="/profile" passHref>
                        <BootstrapButton variant="primary" onClick={handleClose}>
                          Mi perfil
                        </BootstrapButton>
                      </Link>
                    </MenuItem>
                    <MenuItem className="justify-content-center">
                      <BootstrapButton
                        href="/api/auth/logout"
                        variant="outline-primary"
                        onClick={handleClose}
                      >
                        Cerrar sesión
                      </BootstrapButton>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    );
  }

  return (
    <>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <AccountCircleOutlinedIcon />
      </Button>
      <Popper
        className={styles.menu}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={handleClose}>¡Bienvenid@ a Pocha Knit!</MenuItem>
                  <MenuItem className="justify-content-center">
                    <BootstrapButton href="/api/auth/login" variant="primary" onClick={handleClose}>
                      Iniciar sesión
                    </BootstrapButton>
                  </MenuItem>
                  <MenuItem className="justify-content-center">
                    <BootstrapButton
                      href="/api/auth/login"
                      variant="outline-primary"
                      onClick={handleClose}
                    >
                      Crear cuenta
                    </BootstrapButton>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default Usermenu;
