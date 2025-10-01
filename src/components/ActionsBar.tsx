import { ActionsBarProps } from "../types/types";

export function ActionsBar({ onStartAgain, onUpload }: ActionsBarProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <button
        type="button"
        onClick={onStartAgain}
        className="px-3 py-2 rounded bg-gray-900 text-white text-sm"
      >
        Start again
      </button>
      <button
        type="button"
        onClick={onUpload}
        className="px-3 py-2 rounded bg-red-400 text-white text-sm"
      >
        Upload
      </button>
    </div>
  );
}
