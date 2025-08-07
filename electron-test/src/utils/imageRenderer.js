export function renderImageFromUint8(imageData, container) {
  const blob = new Blob([imageData], { type: "image/jpeg" }); // or image/png
  const url = URL.createObjectURL(blob);

  const img = document.createElement("img");
  img.src = url;
  img.alt = "Track artwork";
  img.className = "w-24 h-24 object-cover rounded ml-4"; // right-aligned image
  container.appendChild(img);
}
