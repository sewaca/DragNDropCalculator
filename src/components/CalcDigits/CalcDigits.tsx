import React from "react";
import ComponentWrapper from "../ComponentWrapper";
import styles from "./calc-digits.module.css";
import CalcButton from "./../CalcButton/CalcButton";
import { useDispatch } from "react-redux";
import { appendChar } from "../../App";

interface CalcDigitsProps {
  [index: string]: any;
}

export default function CalcDigits({ ...rest }: CalcDigitsProps) {
  const dispatch = useDispatch();
  const onClick = (val: string) => {
    dispatch(appendChar(val === "," ? "." : val));
  };

  return (
    <ComponentWrapper {...rest}>
      <div className={styles.grid}>
        {["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ","].map((item) => (
          <CalcButton
            key={item}
            onClick={() => onClick(item)}
            style={item === "0" ? { gridColumn: "1/3" } : {}}
          >
            {item}
          </CalcButton>
        ))}
      </div>
    </ComponentWrapper>
  );
}
