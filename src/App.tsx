import { createAction, createReducer, configureStore } from "@reduxjs/toolkit";
import { useState } from "react";
import { Provider } from "react-redux";
import styles from "./App.module.css";
import Canvas from "./components/Canvas";
import ComponentsSet from "./components/ComponentsSet";
import ModeChanger from "./components/ModeChanger";

export const setMode = createAction<string>("setMode");
const setModeReducer = createReducer({ mode: "constructor" }, (builder) => {
  builder.addCase(setMode, (state, action) => {
    state.mode = action.payload;
  });
});

export const addComponent = createAction<{ name: string; pos?: number }>(
  "addComponent"
);
export const removeComponent = createAction<string>("removeComponent");
const componentsInitialState: { components: string[] } = { components: [] };
const setComponentsReducer = createReducer(
  componentsInitialState,
  (builder) => {
    builder
      .addCase(addComponent, (state, { payload: action }) => {
        if (
          (!action.pos && typeof action.pos !== "number") ||
          action.pos === state.components.length
        )
          state.components.push(action.name);
        else
          state.components = [
            ...state.components.slice(0, action.pos),
            action.name,
            ...state.components.slice(action.pos),
          ];
      })
      .addCase(removeComponent, (state, action) => {
        state.components = state.components.filter(
          (item) => item !== action.payload
        );
      });
  }
);

export const appendChar = createAction<number | string>("appendChar");
export const calculate = createAction("calculate");
export const nullCalculator = createAction("nullCalc");
export const setClear = createAction("setClear");
const calcInitialState = {
  display: 0,
  calcString: "0",
  clear: false,
};
const calculatorReducer = createReducer(calcInitialState, (builder) =>
  builder
    .addCase(appendChar, (state, action) => {
      let char = action.payload.toString();
      if (state.clear && !/[\+,\-,\*,\/,\.]/.test(char))
        state.calcString = char;
      else if (
        (state.calcString.split(/[\+,\-,\*,\/]/).slice(-1)[0] === "0" &&
          !/[\+,\-,\*,\/,\.]/.test(char)) ||
        (/[\+,\-,\*,\/]/.test(state.calcString.slice(-1)) &&
          /[\+,\-,\*,\/]/.test(char))
      )
        state.calcString = state.calcString.slice(0, -1) + char;
      else state.calcString += char;
      let a =
        state.calcString[0] +
        state.calcString.slice(1).replaceAll(/[\+,\-,\*,\/]/g, ",");
      if (a.slice(-1) === ",") a = a.slice(0, -1);
      state.display = eval(a);
      state.clear = false;
    })
    .addCase(calculate, (state) => {
      try {
        state.display = eval(state.calcString);
        state.calcString = eval(state.calcString).toString();
      } catch (e) {}
    })
    .addCase(nullCalculator, (state) => {
      state.display = 0;
      state.calcString = "0";
      state.clear = false;
    })
    .addCase(setClear, (state) => {
      state.clear = true;
    })
);

export interface StoreInterface {
  mode: {
    mode: string;
  };
  components: {
    components: string[];
  };
  calculator: {
    display: number;
    calcString: string;
    clear: boolean;
  };
}
const store = configureStore({
  reducer: {
    mode: setModeReducer,
    components: setComponentsReducer,
    calculator: calculatorReducer,
  },
});

function App() {
  const [draggingNumber, setDraggingNumber] = useState<number | null>(null);
  const [draggingName, setDraggingName] = useState<string | null>(null);
  const changeDraggingNumber = (pos: number | null) => {
    if (draggingName === "CalcDisplay" && pos !== null) setDraggingNumber(0);
    else setDraggingNumber(pos);
  };

  return (
    <Provider store={store}>
      <div className={styles.commonWrapper}>
        <ModeChanger />
        <div className={styles.mainWrapper}>
          <ComponentsSet {...{ draggingNumber, setDraggingName }} />
          <Canvas
            {...{
              setDraggingNumber: changeDraggingNumber,
              draggingNumber,
              draggingName,
            }}
          />
        </div>
      </div>
    </Provider>
  );
}

export default App;
