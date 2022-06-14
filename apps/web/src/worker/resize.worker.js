

import resizeImageData from 'resize-image-data'

onmessage = (event) => {
  const { offscreen: canvas, bitmap } = event.data
  canvas.height = bitmap.height;
  canvas.width = bitmap.width;
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(bitmap, 0, 0);

  const imageData = ctx?.getImageData(0, 0, bitmap.width, bitmap.height);

  const resultImageData = resizeImageData(
    imageData,
    300,
    300,
    'nearest-neighbor'
  );

  canvas.width = 300;
  canvas.height = 300;
  canvas.getContext('2d')?.putImageData(resultImageData, 0, 0);

  setTimeout(() => {
    postMessage('Empty. We could use canvas data on message.')
  })
}
