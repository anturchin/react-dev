import { NavLink } from 'react-router-dom';

import { NavbarName } from './Navbar.props.ts';

import styles from './Navbar.module.css';

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbar_list}>
        <li className={styles.navbar_item}>
          <NavLink
            to="/controlled-form"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            {NavbarName.Controlled}
          </NavLink>
        </li>
        <li className={styles.navbar_item}>
          <NavLink
            to="/uncontrolled-form"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            {NavbarName.Uncontrolled}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
