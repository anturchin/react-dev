import { ReactNode, useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import { AdditionalClass, DetailsProps } from './types';
import { DetailsCharactersType } from '../../../core/services/apiService/types';
import { DelayDuration } from '../../../containers/searchContainer/types';
import { delay } from '../../../core/utils/delay/delay';
import { apiService } from '../../../core/services/apiService';
import { Spinner } from '../../simple/spinner';
import { SearchError } from '../../simple/searchError';

import './SearchDetails.css';

export const SearchDetails = (props: DetailsProps): ReactNode => {
  const [details, setDetails] = useState<DetailsCharactersType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setDetails(null);
    setIsLoading(true);
    setError(false);
    setErrorMessage('');
    loadCharacterDetails(props.id);
  }, [props.id]);

  const loadCharacterDetails = async (id: number) => {
    setIsLoading(true);
    try {
      await delay(DelayDuration.SHORT);
      const details = (await apiService.fetchSearchDetails?.(
        id
      )) as DetailsCharactersType;
      setDetails(details);
      setError(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(true);
        setErrorMessage(error.message);
        console.error('Error fetching search character:', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const content = error ? (
    <SearchError message={errorMessage} />
  ) : (
    <div className="details-item">
      <Button onClick={props.onClose} additionalClass={AdditionalClass.RED}>
        Close
      </Button>
      <img className="details-img" src={details?.image} alt={details?.name} />
      <h3 className="details-title">{details?.name}</h3>
      <p className="details-status">Status: {details?.status}</p>
      <p className="details-species">Species: {details?.species}</p>
      <p className="details-gender">Gender: {details?.gender}</p>
    </div>
  );

  return <div className="details">{isLoading ? <Spinner /> : content}</div>;
};
