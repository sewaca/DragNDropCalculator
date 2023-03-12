import React from "react";
import styles from "./calc-actions-pannel.module.css";
import ComponentWrapper from "./../ComponentWrapper/ComponentWrapper";
import CalcButton from "../CalcButton";
import { useDispatch } from "react-redux";
import { appendChar, calculate } from "./../../App";

interface CalcActionsPannelProps {
  [index: string]: any;
}

export default function CalcActionsPannel({ ...rest }: CalcActionsPannelProps) {
  const dispatch = useDispatch();

  const onClick = (val: string) => {
    dispatch(calculate());
    dispatch(appendChar(val === "x" ? "*" : val));
  };

  return (
    <ComponentWrapper {...rest}>
      <div className={styles.grid}>
        {["/", "x", "-", "+"].map((item) => (
          <CalcButton key={item} onClick={() => onClick(item)}>
            {item}
          </CalcButton>
        ))}
      </div>
    </ComponentWrapper>
  );
}
