import { describe, test, expect } from 'vitest';
import { DetailsCharactersType } from '../../rickAndMortyApiSlice/types';
import {
  selectedItemDetailsSlice,
  setSelectedItemDetails,
  clearSelectedItemDetails,
} from '../selectedItemDetailsSlice';

describe('selectedItemDetailsSlice', () => {
  const initialState = {
    selectedItemDetails: null,
  };

  test('should handle initial state', () => {
    expect(selectedItemDetailsSlice.reducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  test('should handle setSelectedItemDetails', () => {
    const itemDetails: DetailsCharactersType = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      image: 'https://example.com/image.jpg',
      type: '',
      origin: {
        name: '',
        url: '',
      },
      location: {
        name: '',
        url: '',
      },
      episode: [''],
      url: '',
      created: '',
    };
    expect(
      selectedItemDetailsSlice.reducer(
        initialState,
        setSelectedItemDetails(itemDetails)
      )
    ).toEqual({ selectedItemDetails: itemDetails });
  });

  test('should handle clearSelectedItemDetails', () => {
    expect(
      selectedItemDetailsSlice.reducer(
        {
          selectedItemDetails: {
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            gender: 'Male',
            image: 'https://example.com/image.jpg',
            type: '',
            origin: {
              name: '',
              url: '',
            },
            location: {
              name: '',
              url: '',
            },
            episode: [''],
            url: '',
            created: '',
          },
        },
        clearSelectedItemDetails()
      )
    ).toEqual({ selectedItemDetails: null });
  });
});
