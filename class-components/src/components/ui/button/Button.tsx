import { Component, ReactNode } from "react";

import { IButtonProps } from "./types";

import "./Button.css";

export class Button extends Component<IButtonProps> {
  render(): ReactNode {
    const { children, onClick, errorBoundary } = this.props;
    return (
      <button
        className={errorBoundary ? "btn btn-red" : "btn"}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}
