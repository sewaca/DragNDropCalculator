import React, { ReactNode, useState } from "react";
import CalcActionsPannel from "../CalcActionsPannel";
import CalcDigits from "../CalcDigits";
import CalcDisplay from "../CalcDisplay";
import CalcEquals from "../CalcEquals";
import styles from "./components-set.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addComponent, StoreInterface } from "./../../App";

interface ComponentsSetProps {
  draggingNumber: number | null;
  setDraggingName: Function;
}

export default function ComponentsSet({
  draggingNumber,
  setDraggingName,
}: ComponentsSetProps) {
  const { components, mode } = useSelector(
    ({ components, mode }: StoreInterface) => ({
      components: components.components,
      mode: mode.mode,
    })
  );
  const dispatch = useDispatch();

  const onDrop = (name: string) => {
    if (draggingNumber !== null)
      dispatch(addComponent({ name, pos: draggingNumber }));
  };

  const onDragStart = (name: string) => {
    setDraggingName(name);
  };

  return (
    <div
      className={styles.t}
      style={mode === "constructor" ? {} : { visibility: "hidden" } }
    >
      <CalcDisplay
        dflt={0}
        shadow
        draggable={
          !components.includes("CalcDisplay") && mode === "constructor"
        }
        onDragEnd={() => onDrop("CalcDisplay")}
        onDragStart={() => onDragStart("CalcDisplay")}
        style={{
          opacity: components.includes("CalcDisplay") ? 0.5 : 1,
        }}
      />
      <CalcActionsPannel
        shadow
        draggable={
          !components.includes("CalcActionsPannel") && mode === "constructor"
        }
        onDragEnd={() => onDrop("CalcActionsPannel")}
        onDragStart={() => onDragStart("CalcActionsPannel")}
        style={{
          opacity: components.includes("CalcActionsPannel") ? 0.5 : 1,
        }}
      />
      <CalcDigits
        shadow
        draggable={!components.includes("CalcDigits") && mode === "constructor"}
        onDragEnd={() => onDrop("CalcDigits")}
        onDragStart={() => onDragStart("CalcDigits")}
        style={{
          opacity: components.includes("CalcDigits") ? 0.5 : 1,
        }}
      />
      <CalcEquals
        shadow
        draggable={!components.includes("CalcEquals") && mode === "constructor"}
        onDragEnd={() => onDrop("CalcEquals")}
        onDragStart={() => onDragStart("CalcEquals")}
        style={{
          opacity: components.includes("CalcEquals") ? 0.5 : 1,
        }}
      />
    </div>
  );
}
