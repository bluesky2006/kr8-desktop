import { extractTrackPaths } from './utils/extractTrackPaths';
import { getParsedTrackMetadata } from './utils/getParsedTrackMetadata';

export const form = document.getElementById('form');
form.addEventListener('submit', async (e) => {
  try {
    e.preventDefault();
    const input = document.getElementById('file-input');
    const data = input.files[0];
    const file = await data.text();

    // call the manipulation functions
    const trackPathArray = await extractTrackPaths(file);

    const playlistObject = await getParsedTrackMetadata(trackPathArray);

    return playlistObject;
  } catch (err) {
    console.log(err);
  }

  console.log('form was submitted');
});


//render here

//post to db
