import { useNavigate } from '@remix-run/react';
import { ReactNode } from 'react';

import { Button } from '../../ui/button';
import { SearchError } from '../../simple/searchError';
import { FAILED_TO_FETCH } from '../../../core/constants';
import { IDetailsCharacter, AdditionalClass } from './types';

import styles from './SearchDetails.module.css';

export const SearchDetails = (props: IDetailsCharacter): ReactNode => {
  const navigate = useNavigate();

  const { isError, character, currentPage } = props;

  const onHandleClose = (): void => {
    navigate(`/page/${currentPage}`);
  };

  const content = isError ? (
    <SearchError message={FAILED_TO_FETCH} />
  ) : (
    <div className={`${styles['details-item']}`}>
      <Button onClick={onHandleClose} additionalClass={AdditionalClass.RED}>
        Close
      </Button>
      <img className={`${styles['details-img']}`} src={character!.image} alt={character!.name} />
      <h3 className={`${styles['details-title']}`}>{character!.name}</h3>
      <p className={`${styles['details-status']}`}>Status: {character!.status}</p>
      <p className={`${styles['details-species']}`}>Species: {character!.species}</p>
      <p className={`${styles['details-gender']}`}>Gender: {character!.gender}</p>
    </div>
  );

  return <div className="details">{content}</div>;
};
