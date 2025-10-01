import { useEffect, useRef, useState, useCallback } from "react";

type DropzoneProps = {
  onFile: (file: File) => Promise<void>;
};

export function Dropzone({ onFile }: DropzoneProps) {
  const [dragOver, setDragOver] = useState(false);

  // Vinyl animation variables
  const circleRef = useRef<HTMLDivElement | null>(null);
  const initialY = "-7.1rem";
  const peekY = "-3rem";
  const fullInY = "1.5rem";

  const setRecordY = (val: string) => {
    circleRef.current?.style.setProperty("--record-y", val);
  };
  const peekRecord = () => setRecordY(peekY);
  const resetRecord = () => setRecordY(initialY);
  const slideInRecord = () => setRecordY(fullInY);

  useEffect(() => {
    resetRecord();
    requestAnimationFrame(() => {
      circleRef.current?.classList.add("transition-transform", "duration-500", "ease-out");
    });
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
      setDragOver(false);

      const file = e.dataTransfer.files?.[0];
      if (!file) {
        resetRecord();
        return;
      }

      slideInRecord();
      await onFile(file);
    },
    [onFile]
  );

  return (
    <section
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        setDragOver(true);
        peekRecord();
      }}
      onDragLeave={() => {
        setDragOver(false);
        resetRecord();
      }}
      onDrop={handleDrop}
      className="relative w-72 h-64 overflow-visible"
    >
      {/* Vinyl behind */}
      <div
        ref={circleRef}
        className="circle-group pointer-events-none absolute left-1/2 w-56 h-56 bg-black rounded-full z-0 will-change-transform shadow-2xl"
        style={{ transform: "translate(-50%, var(--record-y))", ["--record-y" as any]: initialY }}
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
        <p className="pointer-events-none">Drop your playlist file here</p>
      </div>{" "}
    </section>
  );
}
