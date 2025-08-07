const uiContainer = document.getElementById('ui-container');
console.log(uiContainer, 'getting ui div');

export const updateUi = (playlistObject) => {
  const hello = document.createElement('h1');
  hello.textContent = 'hello';
  uiContainer.appendChild(hello);

  console.log('ui rendered');
};
