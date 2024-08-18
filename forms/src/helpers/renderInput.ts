import { generateInputRadio } from './generateInputRadio.tsx';
import { generateOptions } from './generateOptions.tsx';
import { generateInput } from './generateInput.tsx';
import {
  RefInput,
  RefOption,
} from '../containers/Uncontrolled/Uncontrolled.props.ts';

export interface RenderParam {
  label: string;
  countries: string[];
  errorMap?: Record<string, string>;
  formRefs?: RefInput;
  optionRef?: RefOption;
}

export const renderInput = ({
  label,
  countries,
  errorMap,
  optionRef,
  formRefs,
}: RenderParam) => {
  switch (label) {
    case 'gender':
      return generateInputRadio(label, errorMap, formRefs);
    case 'country':
      return generateOptions(label, countries, errorMap, optionRef);
    case 'picture':
      return generateInput(label, 'file', errorMap, formRefs);
    case 'terms':
      return generateInput(label, 'checkbox', errorMap, formRefs);
    default:
      return generateInput(label, 'text', errorMap, formRefs);
  }
};
