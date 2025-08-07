// import { parseFile } from 'music-metadata';

export async function metadataParser(filePath, index) {
  try {
    const metadata = await window.electronAPI.parseMetadata(filePath);
    
    return {
      track_id: index + 1,
      track_artist: metadata.common.artist || 'Unknown Artist',
      track_title: metadata.common.title || 'Unknown Title',
      track_image: metadata.common.picture?.[0]?.data ?? null,
    };
  } catch (error) {
    console.error(`Error parsing metadata for ${filePath}:`, error.message);
    return {
      track_id: index + 1,
      track_artist: 'Unknown Artist',
      track_title: 'Unknown Title',
      track_image: null,
    };
  }
}
