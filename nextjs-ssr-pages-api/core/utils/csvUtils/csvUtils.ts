import { IDataToCSV } from './types';

export const generateCSV = (data: IDataToCSV[]): Blob => {
  const csvContent = [
    ['ID', 'NAME', 'GENDER', 'URL'],
    ...data.map((item) => [item.id, item.name, item.gender, item.image]),
  ]
    .map((e) => e.join(','))
    .join('\n');

  return new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
};