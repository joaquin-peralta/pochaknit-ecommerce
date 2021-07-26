import BuildIcon from '@material-ui/icons/Build';
import styles from '@styles/components/MaintenanceMode.module.scss';

const MaintenanceMode = () => (
  <div className={styles.container}>
    <div className={styles.content}>
      <BuildIcon fontSize="large" />
      <span className="d-block p-3 fw-bold fs-2">
        Sitio web bajo mantenimiento. ¡Volveremos pronto!
      </span>
    </div>
  </div>
);

export default MaintenanceMode;
