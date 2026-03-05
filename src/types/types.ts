export type ActionsBarProps = {
  onStartAgain: () => void;
  onUpload: () => void;
  isUploading: boolean;
};

export type DropzoneProps = {
  onFile: (file: File) => Promise<void>;
  isParsing: boolean;
};

export type EditableTitleProps = {
  value: string;
  onChange: (newValue: string) => void;
};

export type TrackImage = { mime: string; base64: string } | null;

export type Track = {
  playlist_position: number;
  track_artist: string;
  track_title: string;
  track_bpm?: string | number;
  track_length?: number;
  track_image?: TrackImage;
  favourite?: boolean;
};

export interface TrackListProps {
  tracks: Track[];
  onMoveTrack: (fromIndex: number, toIndex: number) => void;
  onDeleteTrack: (index: number) => void;
  onToggleFavourite: (index: number) => void;
}

export interface TrackCardProps {
  track: Track;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  onToggleFavourite: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export type CreatePlaylistPayload = {
  user_id: number;
  playlist_name: string;
  playlist_notes?: string | null;
  favourite?: boolean;
  playlist_tracks: Track[];
};
