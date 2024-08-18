import { Control, UseFormRegister } from 'react-hook-form';

import { generateInputRadio } from './generateInputRadio.tsx';
import { generateOptions } from './generateOptions.tsx';
import { generateInput } from './generateInput.tsx';
import {
  RefInput,
  RefOption,
} from '../containers/Uncontrolled/Uncontrolled.props.ts';
import { ControlledForm } from '../containers/Controlled/Controlled.props.ts';

export type RegisterForm = UseFormRegister<ControlledForm>;
export type ControlForm = Control<ControlledForm, unknown>;

export interface RenderParam {
  label: string;
  countries: string[];
  errorMap?: Record<string, string>;
  formRefs?: RefInput;
  optionRef?: RefOption;
  register?: RegisterForm;
  control?: ControlForm;
}

export const renderInput = ({
  label,
  countries,
  errorMap,
  optionRef,
  formRefs,
  register,
  control,
}: RenderParam) => {
  switch (label) {
    case 'gender':
      return generateInputRadio({
        label,
        errorMap,
        formRefs,
        register,
        control,
      });
    case 'country':
      return generateOptions({
        label,
        countries,
        errorMap,
        optionRef,
        register,
        control,
      });
    case 'picture':
      return generateInput({
        label,
        type: 'file',
        errorMap,
        formRefs,
        register,
        control,
      });
    case 'terms':
      return generateInput({
        label,
        type: 'checkbox',
        errorMap,
        formRefs,
        register,
        control,
      });
    default:
      return generateInput({
        label,
        type: 'text',
        errorMap,
        formRefs,
        register,
        control,
      });
  }
};
