export const form = document.getElementById('form');
form.addEventListener('submit', async (e) => {
  try {
    e.preventDefault();
    const input = document.getElementById('file-input');
    const data = input.files[0];
    const file = await data.text();

    console.log(file, 'file data');
    // call the manipulation functions

    
    //return object with image data
  } catch (err) {
    console.log(err);
  }

  console.log('form was submitted');
});


//render here

//post to db