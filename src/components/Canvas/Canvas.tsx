import React, { ReactNode, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeComponent } from "../../App";
import CalcActionsPannel from "../CalcActionsPannel";
import CalcDigits from "../CalcDigits";
import CalcDisplay from "../CalcDisplay";
import CalcEquals from "../CalcEquals";
import styles from "./canvas.module.css";

interface CanvasProps {
  draggingNumber: number | null;
  setDraggingNumber: Function;
  draggingName: string | null;
}

export default function Canvas({
  draggingNumber,
  setDraggingNumber,
}: CanvasProps) {
  const [isDragingOver, setIsDragingOver] = useState(false);
  const { components, mode } = useSelector((state: any) => ({
    components: state.components.components,
    mode: state.mode.mode,
  }));
  const dispatch = useDispatch();
  const isEmpty = components.length === 0;
  const isRuntime = mode === "runtime";

  function convert(
    name: string,
    key: number,
    isRuntime: boolean = false
  ): ReactNode {
    const props = {
      untouchable: !isRuntime,
      key: name,
      onDragOver: function (e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();

        const pos = (e.target as HTMLDivElement).getBoundingClientRect();
        if (pos.y + pos.height / 2 <= e.clientY) setDraggingNumber(key + 1);
        else setDraggingNumber(key);
        setIsDragingOver(true);
      },
      onDragLeave: function (e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
      },
      onDoubleClick: function () {
        if (mode === "constructor") dispatch(removeComponent(name));
      },
    };

    if (name === "CalcDisplay") return <CalcDisplay value={0} {...props} />;
    else if (name === "CalcActionsPannel")
      return <CalcActionsPannel {...props} />;
    else if (name === "CalcDigits") return <CalcDigits {...props} />;
    else if (name === "CalcEquals") return <CalcEquals {...props} />;
    else return null;
  }

  return (
    <div
      className={[styles.canvas, isEmpty ? styles.empty : ""].join(" ")}
      onDragEnter={(e) => {
        console.log("drag enter");
        e.dataTransfer.dropEffect = "move";
        setIsDragingOver(true);
        setDraggingNumber(components.length + 1);
      }}
      onDragLeave={(e) => {
        console.log("drag leave");
        setDraggingNumber(null);
        setIsDragingOver(false);
      }}
      onDrop={() => setIsDragingOver(false)}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragingOver(true);
        if (!draggingNumber) setDraggingNumber(components.length + 1);
      }}
    >
      {isEmpty ? (
        <EmptyBlock isDragingOver={isDragingOver} />
      ) : (
        <>
          {[...components].map((name, i) => (
            <>
              {i === draggingNumber && isDragingOver ? (
                <div
                  key="separator-line"
                  className={styles.pasteInto}
                  onDragOver={(e) => e.preventDefault()}
                ></div>
              ) : null}
              {convert(name, i, isRuntime)}
            </>
          ))}
          {(draggingNumber || 0) >= components.length && isDragingOver ? (
            <div
              key="separator-line"
              className={styles.pasteInto}
              onDragOver={(e) => e.preventDefault()}
            ></div>
          ) : null}
        </>
      )}
    </div>
  );
}

const EmptyBlock = ({ isDragingOver }: { isDragingOver: boolean }) => {
  return (
    <div
      className={[
        styles.emptyFiller,
        isDragingOver ? styles.dragOver : "",
      ].join(" ")}
    >
      <svg
        width={22}
        height={22}
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.7778 1V5.44444"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <path
          d="M21 3.22222L16.5556 3.22222"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <path
          d="M12.3889 3.22222H5C2.79086 3.22222 1 5.01309 1 7.22223V16.2778M18.7778 9.61111V17C18.7778 19.2091 16.9869 21 14.7778 21H5C2.79086 21 1 19.2091 1 17V16.2778M1 16.2778L4.83824 12.4395C6.40034 10.8774 8.93298 10.8774 10.4951 12.4395C11.8961 13.8406 13.5664 15.5108 14.8889 16.8333"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <path
          d="M18.7778 14.6111L18.2729 14.1062C16.7108 12.5441 14.1781 12.5441 12.616 14.1062L12.3889 14.3333"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <circle cx="12.1111" cy="7.66667" r="0.555556" fill="black" />
      </svg>
      <span className={styles.emptyTitle}>Перетащите сюда</span>
      <span className={styles.emptyText}>
        любой элемент <br />
        из левой панели
      </span>
    </div>
  );
};
