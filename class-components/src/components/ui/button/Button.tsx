import { Component, ReactNode } from "react";

import { IButtonProps } from "./types";

import "./Button.css";

export class Button extends Component<IButtonProps> {
  render(): ReactNode {
    const { children, onClick } = this.props;
    return <button onClick={onClick}>{children}</button>;
  }
}
