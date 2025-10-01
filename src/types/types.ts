export type ActionsBarProps = {
  onStartAgain: () => void;
  onUpload: () => void;
};

export type DropzoneProps = {
  onFile: (file: File) => Promise<void>;
};

export type EditableTitleProps = {
  value: string;
  onChange: (newValue: string) => void;
};

export interface TrackListProps {
  tracks: Array<any>;
}

export interface track {
  playlist_position: number;
  track_title: string;
  track_artist: string;
  track_bpm: number | null;
  track_length: number | null;
  track_image: ArrayBuffer | null;
}

export interface TrackCardProps {
  track: track;
}
