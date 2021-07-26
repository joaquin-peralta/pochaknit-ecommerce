import { ReactNode } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      flexDirection: 'column',
      color: '#fff',
    },
  }),
);

type Props = {
  // eslint-disable-next-line react/require-default-props
  children?: ReactNode;
  open: boolean;
};

const Loader = ({ children, open }: Props) => {
  const classes = useStyles();

  return (
    <Backdrop open={open} className={classes.backdrop}>
      <CircularProgress color="inherit" />
      {children}
    </Backdrop>
  );
};

export default Loader;
