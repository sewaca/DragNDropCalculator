import { ReactNode } from "react";
import styles from "./component-wrapper.module.css";

interface ComponentWrapperProps {
  children?: ReactNode;
  draggable?: boolean;
  shadow?: boolean;
  untouchable?: boolean;
  [index: string]: any;
}

export default function ComponentWrapper({
  children = null,
  draggable = false,
  shadow = false,
  untouchable = false,
  ...rest
}: ComponentWrapperProps) {
  return (
    <div
      className={[styles.wrapper, shadow ? styles.shadow : ""].join(" ")}
      {...{ draggable, ...rest }}
    >
      {untouchable || draggable ? (
        <div className={styles.draggable}></div>
      ) : null}
      {children}
    </div>
  );
}
