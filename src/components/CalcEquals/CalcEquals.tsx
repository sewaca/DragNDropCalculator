import React from "react";
import CalcButton from "../CalcButton";
import ComponentWrapper from "../ComponentWrapper";
import "./calc-equals.module.css";
import { useDispatch } from "react-redux";
import { calculate, setClear } from "./../../App";

interface CalcEqualsProps {
  [index: string]: any;
}

export default function CalcEquals({ ...rest }: CalcEqualsProps) {
  const dispatch = useDispatch();

  return (
    <ComponentWrapper {...rest}>
      <CalcButton
        onClick={() => {
          dispatch(calculate());
          dispatch(setClear());
        }}
        style={{
          background: "#5D5FEF",
          color: "#fff",
          height: 64,
          width: "100%",
        }}
      >
        =
      </CalcButton>
    </ComponentWrapper>
  );
}
