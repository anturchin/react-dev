import { Link } from 'react-router-dom';

import { NavbarName } from './Navbar.props.ts';

import styles from './Navbar.module.css';

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbar_list}>
        <li className={styles.navbar_item}>
          <Link to="/controlled">{NavbarName.Controlled}</Link>
        </li>
        <li className={styles.navbar_item}>
          <Link to="/uncontrolled">{NavbarName.Uncontrolled}</Link>
        </li>
      </ul>
    </nav>
  );
};
