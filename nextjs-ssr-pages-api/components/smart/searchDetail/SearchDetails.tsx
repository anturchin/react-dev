import Image from 'next/image';

import { IDetailsCharacter, AdditionalClass } from './types';
import { FAILED_TO_FETCH } from '@/core/constants';
import { SearchError } from '@/components/simple/searchError';
import { Button } from '@/components/ui/button';

import styles from './SearchDetails.module.css';

export const SearchDetails = (props: IDetailsCharacter): JSX.Element => {
  const { isError, character } = props;

  const onHandleClose = (): void => {
    console.log('navigate');
  };

  const content = isError ? (
    <SearchError message={FAILED_TO_FETCH} />
  ) : (
    <div className={`${styles['details-item']}`}>
      <Button onClick={onHandleClose} additionalClass={AdditionalClass.RED}>
        Close
      </Button>
      <Image
        className={`${styles['details-img']}`}
        src={character.image}
        alt={character.name}
      />
      <h3 className={`${styles['details-title']}`}>{character.name}</h3>
      <p className={`${styles['details-status']}`}>
        Status: {character.status}
      </p>
      <p className={`${styles['details-species']}`}>
        Species: {character.species}
      </p>
      <p className={`${styles['details-gender']}`}>
        Gender: {character.gender}
      </p>
    </div>
  );

  return <div className="details">{content}</div>;
};
