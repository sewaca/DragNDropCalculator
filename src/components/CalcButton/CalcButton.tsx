import React, { ReactNode } from "react";
import styles from "./calc-button.module.css";

interface CalcButtonProps {
  children?: ReactNode;
  [index: string]: any;
}

export default function CalcButton({ children, ...rest }: CalcButtonProps) {
  return (
    <button className={styles.button} {...rest}>
      {children}
    </button>
  );
}
