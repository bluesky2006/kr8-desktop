import { ActionsBarProps } from "../types/types";

export function ActionsBar({ onStartAgain, onUpload, isUploading }: ActionsBarProps) {
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
        disabled={isUploading}
        className="px-3 py-2 rounded bg-red-400 text-white text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {isUploading ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Uploading...
          </>
        ) : (
          "Upload"
        )}
      </button>
    </div>
  );
}
