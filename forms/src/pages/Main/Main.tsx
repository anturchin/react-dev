import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RefObject, useEffect, useRef } from 'react';

import { Navbar } from '../../components';
import { RootState } from '../../store/store.ts';

import styles from './Main.module.css';

export const Main = () => {
  const { uncontrolledData, controlledData } = useSelector(
    (state: RootState) => state.form
  );

  const controlledHighlightRef = useRef<HTMLDivElement | null>(null);
  const uncontrolledHighlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let timerId: number;

    const highlight = (ref: RefObject<HTMLDivElement>) => {
      if (ref.current) {
        ref.current.style.border = '0.5rem solid #ffa500';

        timerId = setTimeout(() => {
          if (ref.current) {
            ref.current.style.border = 'none';
          }
        }, 2000);
      }
    };

    if (controlledData) {
      highlight(controlledHighlightRef);
    }

    if (uncontrolledData) {
      highlight(uncontrolledHighlightRef);
    }

    return () => clearTimeout(timerId);
  }, [controlledData, uncontrolledData]);

  return (
    <main className={styles.main}>
      <Navbar />
      <Outlet />
      <section className={styles.tileWrapper}>
        {controlledData && (
          <div className={styles.tileStyle} ref={controlledHighlightRef}>
            <h2>Controlled Form Data</h2>
            <p>Name: {controlledData.name}</p>
            <p>Age: {controlledData.age}</p>
            <p>Gender: {controlledData.gender}</p>
            <p>Email: {controlledData.email}</p>
            <p>Country: {controlledData.country}</p>
          </div>
        )}

        {uncontrolledData && (
          <div className={styles.tileStyle} ref={uncontrolledHighlightRef}>
            <h2>Uncontrolled Form Data</h2>
            <p>Name: {uncontrolledData.name}</p>
            <p>Age: {uncontrolledData.age}</p>
            <p>Gender: {uncontrolledData.gender}</p>
            <p>Email: {uncontrolledData.email}</p>
            <p>Country: {uncontrolledData.country}</p>
          </div>
        )}
      </section>
    </main>
  );
};
