import { ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '../../ui/button';
import { AdditionalClass } from './types';
import { Spinner } from '../../simple/spinner';
import { SearchError } from '../../simple/searchError';
import { apiService } from '../../../core/services/apiService';

import './SearchDetails.css';

export const SearchDetails = (): ReactNode => {
  const { id, page } = useParams<{ id: string; page: string }>();
  const navigate = useNavigate();

  const { data, error, isLoading } = apiService.useFetchSearchDetailsQuery(
    Number(id)
  );

  const onHandleClose = () => {
    navigate(`/search/${page}`);
  };

  const content = error ? (
    <SearchError message="Failed to fetch data" />
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

  return <div className="details">{isLoading ? <Spinner /> : content}</div>;
};
