import { useEffect, useRef, useState, useCallback } from "react";
import { DropzoneProps } from "../types/types";

export function Dropzone({ onFile, isParsing }: DropzoneProps) {
  const [dragOver, setDragOver] = useState(false);

  // Vinyl animation variables
  const circleRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const setRecordY = (val: string) => {
    circleRef.current?.style.setProperty("--record-y", val);
  };

  const peekRecord = () => setRecordY("-3rem");
  const resetRecord = () => setRecordY("-7.1rem");
  const slideInRecord = () => setRecordY("1.5rem");

  useEffect(() => {
    resetRecord();
    requestAnimationFrame(() => {
      circleRef.current?.classList.add("transition-transform", "duration-500", "ease-out");
    });
  }, []);

  const processFile = useCallback(
    async (file?: File) => {
      if (isParsing || !file) return;
      slideInRecord();
      await onFile(file);
    },
    [isParsing, onFile]
  );

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
      if (isParsing) return;
      setDragOver(false);

      const file = e.dataTransfer.files?.[0];
      if (!file) {
        resetRecord();
        return;
      }

      await processFile(file);
    },
    [isParsing, processFile]
  );

  return (
    <section
      onDragOver={(e) => {
        e.preventDefault();
        if (isParsing) return;
        setDragOver(true);
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        if (isParsing) return;
        setDragOver(true);
        peekRecord();
      }}
      onDragLeave={() => {
        if (isParsing) return;
        setDragOver(false);
        resetRecord();
      }}
      onDrop={handleDrop}
      onClick={() => {
        if (isParsing) return;
        fileInputRef.current?.click();
      }}
      onKeyDown={(e) => {
        if (isParsing) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          fileInputRef.current?.click();
        }
      }}
      role="button"
      tabIndex={isParsing ? -1 : 0}
      aria-label="Drop or choose a playlist file"
      className={`relative w-72 h-64 overflow-visible ${isParsing ? "cursor-progress" : "cursor-pointer"}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".m3u,.m3u8"
        className="hidden"
        onChange={async (e) => {
          const file = e.currentTarget.files?.[0];
          await processFile(file);
          e.currentTarget.value = "";
        }}
      />
      {/* Vinyl behind */}
      <div
        ref={circleRef}
        className="circle-group pointer-events-none absolute left-1/2 w-56 h-56 bg-black rounded-full z-0 will-change-transform shadow-2xl"
        style={{ transform: "translate(-50%, var(--record-y))" }}
      >
        {/* Red label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 bg-red-400 rounded-full" />
        </div>
        {/* Spindle hole */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[6px] h-[6px] bg-black rounded-full" />
        </div>
      </div>
      <div
        className={`relative z-10 rounded-lg overflow-hidden transition-colors border-2 border-dashed w-full h-full flex items-center justify-center text-center shadow-2xl ${
          dragOver ? "bg-red-100 border-red-400" : "bg-white border-gray-300"
        }`}
      >
        {isParsing ? (
          <div className="flex flex-col items-center gap-2 pointer-events-none">
            <span className="inline-block w-6 h-6 border-2 border-gray-300 border-t-red-400 rounded-full animate-spin" />
            <p>Parsing playlist...</p>
          </div>
        ) : (
          <p className="pointer-events-none text-sm">Drop or click to choose a playlist file</p>
        )}
      </div>{" "}
    </section>
  );
}
