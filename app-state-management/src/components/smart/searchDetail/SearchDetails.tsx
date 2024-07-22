import { ReactNode, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '../../ui/button';
import { AdditionalClass } from './types';
import { Spinner } from '../../simple/spinner';
import { SearchError } from '../../simple/searchError';
import { useFetchSearchDetailsQuery } from '../../../core/slices/rickAndMortyApiSlice';
import { FAILED_TO_FETCH } from '../../../core/constants';
import { AppDispatch } from '../../../core/store/store';
import { useDispatch } from 'react-redux';
import { setSelectedItemDetails } from '../../../core/slices/selectedItemDetailsSlice';

import './SearchDetails.css';

export const SearchDetails = (): ReactNode => {
  const { id, page } = useParams<{ id: string; page: string }>();
  const navigate = useNavigate();

  const { data, isError, isFetching } = useFetchSearchDetailsQuery(Number(id));
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (data) dispatch(setSelectedItemDetails(data));
  }, [data, dispatch]);

  const onHandleClose = () => {
    navigate(`/search/${page}`);
  };

  const content = isError ? (
    <SearchError message={FAILED_TO_FETCH} />
  ) : (
    <div className="details-item">
      <Button onClick={onHandleClose} additionalClass={AdditionalClass.RED}>
        Close
      </Button>
      <img className="details-img" src={data?.image} alt={data?.name} />
      <h3 className="details-title">{data?.name}</h3>
      <p className="details-status">Status: {data?.status}</p>
      <p className="details-species">Species: {data?.species}</p>
      <p className="details-gender">Gender: {data?.gender}</p>
    </div>
  );

  return <div className="details">{isFetching ? <Spinner /> : content}</div>;
};
