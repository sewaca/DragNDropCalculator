import React from "react";
import styles from "./calc-display.module.css";
import ComponentWrapper from "./../ComponentWrapper/ComponentWrapper";
import { useSelector } from "react-redux";
import { StoreInterface } from "./../../App";

interface CalcDisplayProps {
  shadow?: boolean;
  dflt?: string | number;
  [index: string]: any;
}

export default function CalcDisplay({
  dflt = undefined,
  ...rest
}: CalcDisplayProps) {
  const value = useSelector(
    (store: StoreInterface) => store.calculator.display
  );

  const n =
    !Number.isNaN(value) && Number.isFinite(value)
      ? value.toString().length <= 16
        ? value.toString().replace(".", ",")
        : parseFloat(
            value.toString().slice(0, 15) +
              (Number(value.toString()[16]) > 0
                ? Number(value.toString()[15]) + 1
                : Number(value.toString()[15]))
          )
            .toString()
            .replace(".", ",")
      : "Не определено";

  return (
    <ComponentWrapper {...rest}>
      <div
        className={styles.display}
        style={{ fontSize: n.length >= 9 ? 19 : 36 }}
      >
        {typeof dflt === "undefined" ? n : dflt}
      </div>
    </ComponentWrapper>
  );
}
