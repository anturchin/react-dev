import { Outlet } from 'react-router-dom';

import { Navbar } from '../../components';

import styles from './Main.module.css';

export const Main = () => {
  return (
    <main className={styles.main}>
      <Navbar />
      <Outlet />
    </main>
  );
};
