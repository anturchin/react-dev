import { Component, ReactNode } from "react";

import { IButtonProps } from "./types";

import "./Button.css";

export class Button extends Component<IButtonProps> {
  render(): ReactNode {
    const { children, onClick, additionalClass } = this.props;
    const addClass = additionalClass ? `btn ${additionalClass}` : "btn";
    return (
      <button className={addClass} onClick={onClick}>
        {children}
      </button>
    );
  }
}
