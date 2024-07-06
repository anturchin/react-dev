import { Component, ReactNode } from 'react';

import { IInputProps } from './types';

import './Input.css';
export class Input extends Component<IInputProps> {
  render(): ReactNode {
    const { onChange, value, placeholder } = this.props;
    return (
      <input
        placeholder={placeholder}
        className="input"
        type="text"
        value={value}
        onChange={onChange}
      />
    );
  }
}
