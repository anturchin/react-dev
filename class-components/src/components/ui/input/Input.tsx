import { Component, ReactNode } from "react";

import { IInputProps } from "./types";

import "./Input.css";
export class Input extends Component<IInputProps> {
  render(): ReactNode {
    const { onChange, value } = this.props;
    return <input type="text" value={value} onChange={onChange} />;
  }
}
