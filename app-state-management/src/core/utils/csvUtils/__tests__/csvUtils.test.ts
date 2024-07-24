import { vi, describe, test, expect } from 'vitest';
import { generateCSV } from '../csvUtils';
import { IDataToCSV } from '../types';

global.URL.createObjectURL = vi.fn(() => 'blob:http://localhost/test');

describe('generateCSV', () => {
  const mockData: IDataToCSV[] = [
    {
      id: 1,
      name: 'Item 1',
      gender: 'Gender 1',
      image: 'http://example.com/1',
    },
    {
      id: 2,
      name: 'Item 2',
      gender: 'Gender 2',
      image: 'http://example.com/2',
    },
  ];

  test('should generate a Blob with correct CSV content', () => {
    const csvBlob = generateCSV(mockData);

    const expectedCSVContent = [
      ['ID', 'NAME', 'GENDER', 'URL'],
      ['1', 'Item 1', 'Gender 1', 'http://example.com/1'],
      ['2', 'Item 2', 'Gender 2', 'http://example.com/2'],
    ]
      .map((e) => e.join(','))
      .join('\n');

    const expectedBlob = new Blob([expectedCSVContent], {
      type: 'text/csv;charset=utf-8;',
    });

    const reader = new FileReader();
    reader.onload = () => {
      expect(reader.result).toBe(expectedCSVContent);
    };
    reader.readAsText(csvBlob);

    expect(csvBlob.size).toBe(expectedBlob.size);
    expect(csvBlob.type).toBe(expectedBlob.type);
  });

  test('should create a valid object URL for the generated Blob', () => {
    const csvBlob = generateCSV(mockData);
    const objectURL = URL.createObjectURL(csvBlob);

    expect(objectURL).toBe('blob:http://localhost/test');
    expect(URL.createObjectURL).toHaveBeenCalledWith(csvBlob);
  });
});
