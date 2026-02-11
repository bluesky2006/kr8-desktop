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

export type TrackImage = {
  mime: string;
  base64: string;
} | null;

export type Track = {
  playlist_position: number;
  track_artist: string;
  track_title: string;
  track_bpm?: string | number;
  track_length?: number;
  track_image?: TrackImage; // ✅
  favourite?: boolean;
};

export interface TrackCardProps {
  track: Track;
}

export interface Data {
  playlist_name: string;
  playlist_notes: string;
  favourite: boolean | null;
  playlist_tracks: PlaylistTracks[];
}

export interface PlaylistTracks {
  playlist_position: number;
  track_artist: string;
  track_title: string;
  track_bpm: number | null;
  track_length: number;
  track_image: ArrayBuffer | null;
  favourite: boolean;
}
