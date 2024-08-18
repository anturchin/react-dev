import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

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

    if (uncontrolledHighlightRef) {
      if (uncontrolledHighlightRef.current) {
        uncontrolledHighlightRef.current.style.border = '0.5rem solid #ffa500';

        timerId = setTimeout(() => {
          if (uncontrolledHighlightRef.current) {
            uncontrolledHighlightRef.current.style.border = 'none';
          }
        }, 2000);
      }
    }

    return () => clearTimeout(timerId);
  }, [uncontrolledData]);

  useEffect(() => {
    let timerId: number;

    if (controlledHighlightRef.current) {
      controlledHighlightRef.current.style.border = '0.5rem solid #ffa500';

      timerId = setTimeout(() => {
        if (controlledHighlightRef.current) {
          controlledHighlightRef.current.style.border = 'none';
        }
      }, 2000);
    }

    return () => clearTimeout(timerId);
  }, [controlledData]);

  return (
    <main className={styles.main}>
      <Navbar />
      <Outlet />
      <section className={styles.tileWrapper}>
        {uncontrolledData && (
          <div className={styles.tileStyle} ref={uncontrolledHighlightRef}>
            <h2>Uncontrolled Form Data</h2>
            <p>
              <strong>Name</strong>: {uncontrolledData.name}
            </p>
            <p>
              <strong>Age</strong>: {uncontrolledData.age}
            </p>
            <p>
              <strong>Gender</strong>: {uncontrolledData.gender}
            </p>
            <p>
              <strong>Email</strong>: {uncontrolledData.email}
            </p>
            <p>
              <strong>Country</strong>: {uncontrolledData.country}
            </p>
            <p className={styles.picture}>
              <strong>Picture</strong>: {uncontrolledData.picture}
            </p>
          </div>
        )}
        {controlledData && (
          <div className={styles.tileStyle} ref={controlledHighlightRef}>
            <h2>Controlled Form Data</h2>
            <p>
              <strong>Name</strong>: {controlledData.name}
            </p>
            <p>
              <strong>Age</strong>: {controlledData.age}
            </p>
            <p>
              <strong>Gender</strong>: {controlledData.gender}
            </p>
            <p>
              <strong>Email</strong>: {controlledData.email}
            </p>
            <p>
              <strong>Country</strong>: {controlledData.country}
            </p>
            <p className={styles.picture}>
              <strong>Picture</strong>: {controlledData.picture}
            </p>
          </div>
        )}
      </section>
    </main>
  );
};
