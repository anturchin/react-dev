import { SwitchTheme } from '@/components/simple/switchTheme';
import { SearchDetails } from '@/components/smart/searchDetail';
import { CharacterProps } from './types';

export const LayoutCharacter = (props: CharacterProps): JSX.Element => {
  const { character, isError } = props;
  return (
    <>
      <SwitchTheme />
      <SearchDetails character={character} isError={isError} />
    </>
  );
};
