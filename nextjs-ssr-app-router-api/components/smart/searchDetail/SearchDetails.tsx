'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { IDetailsCharacter, AdditionalClass, ImageSizeDetails } from './types';
import { FAILED_TO_FETCH } from '@/core/constants';
import { SearchError } from '@/components/simple/searchError';
import { Button } from '@/components/ui/button';

import styles from './SearchDetails.module.css';

export const SearchDetails = (props: IDetailsCharacter): JSX.Element => {
  const router = useRouter();

  const { isError, character, currentPage } = props;

  const onHandleClose = (): void => {
    router.push(`/page/${currentPage}`);
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
        src={character!.image}
        alt={character!.name}
        width={ImageSizeDetails.WIDTH}
        height={ImageSizeDetails.HEIGHT}
        placeholder="blur"
        blurDataURL={character!.image}
      />
      <h3 className={`${styles['details-title']}`}>{character!.name}</h3>
      <p className={`${styles['details-status']}`}>Status: {character!.status}</p>
      <p className={`${styles['details-species']}`}>Species: {character!.species}</p>
      <p className={`${styles['details-gender']}`}>Gender: {character!.gender}</p>
    </div>
  );

  return <div className="details">{content}</div>;
};
