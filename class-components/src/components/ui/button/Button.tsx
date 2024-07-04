import { Component, ReactNode } from "react";

import { IButtonProps } from "./types";

import "./Button.css";

export class Button extends Component<IButtonProps> {
  render(): ReactNode {
    const { children, onClick } = this.props;
    return (
      <button className="btn" onClick={onClick}>
        {children}
      </button>
    );
  }
}
