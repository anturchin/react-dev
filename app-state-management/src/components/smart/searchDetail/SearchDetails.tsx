import { ReactNode, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../../ui/button';
import { AdditionalClass } from './types';
import { DetailsCharactersType } from '../../../core/services/apiService/types';
import { DelayDuration } from '../../../containers/searchContainer/types';
import { delay } from '../../../core/utils/delay/delay';
import { apiService } from '../../../core/services/apiService';
import { Spinner } from '../../simple/spinner';
import { SearchError } from '../../simple/searchError';
import { AppDispatch, RootState } from '../../../core/store/store';
import {
  fetchError,
  fetchedDetailPage,
  fetchingDetailPage,
} from '../../../core/slices/detailPageSlice';

import './SearchDetails.css';

export const SearchDetails = (): ReactNode => {
  const { id, page } = useParams<{ id: string; page: string }>();
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { details, isLoading, error, errorMessage } = useSelector(
    (state: RootState) => state.detailsPage
  );

  const loadCharacterDetails = useCallback(
    async (id: number) => {
      dispatch(fetchingDetailPage());
      try {
        await delay(DelayDuration.SHORT);
        const details = (await apiService.fetchSearchDetails?.(
          id
        )) as DetailsCharactersType;
        dispatch(fetchedDetailPage({ details }));
      } catch (error) {
        if (error instanceof Error) {
          dispatch(fetchError(error.message));
          console.error('Error fetching search character:', error.message);
        }
      }
    },
    [dispatch]
  );

  useEffect(() => {
    loadCharacterDetails(Number(id));
  }, [id, dispatch, loadCharacterDetails]);

  const onHandleClose = () => {
    navigate(`/search/${page}`);
  };

  const content = error ? (
    <SearchError message={errorMessage} />
  ) : (
    <div className="details-item">
      <Button onClick={onHandleClose} additionalClass={AdditionalClass.RED}>
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
