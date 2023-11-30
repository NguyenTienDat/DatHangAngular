export function linkClicked(page: string) {
  copyContent(page).then((res) => {
    window.open(page, '_blank');
  });
}
const urlDetect =
  /((?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?)/g;

export function renderLink(content = '') {
  const link = content.replace(
    urlDetect,
    `<a href="$1" class="cursor-pointer" title="$1">(link)</a>`
  );
  // console.log('content', content);
  // console.log('link', link);
  return link;
}

async function copyContent(content: string) {
  try {
    await navigator.clipboard.writeText(content);
    console.log('Content copied to clipboard', content);
    /* Resolved - text copied to clipboard successfully */
  } catch (err) {
    console.error('Failed to copy: ', err);
    /* Rejected - text failed to copy to the clipboard */
  }
}

export function encodeImageFileAsURL(element: any, callback: any) {
  var file = element.files[0];
  const reader = new FileReader();
  reader.onloadend = function () {
    // console.log('RESULT', (reader?.result?.length || 0) / 1000);
    // console.log(reader.result);

    resizeBase64Image(reader.result, 200, 200).then((res) => {
      // console.log('after resize', res.length);
      console.log(res);
      callback(res);
    });
  };
  reader.readAsDataURL(file);
  element.value = null;
}

function resizeBase64Image(base64: any, width: number, height: number) {
  // Create a canvas element
  const canvas = document.createElement('canvas');

  // Create an image element from the base64 string
  const image = new Image();
  image.src = base64;

  // Return a Promise that resolves when the image has loaded
  return new Promise((resolve, reject) => {
    image.onload = () => {
      // Calculate the aspect ratio of the image
      const aspectRatio = image.width / image.height;

      // Calculate the best fit dimensions for the canvas
      if (width / height > aspectRatio) {
        canvas.width = height * aspectRatio;
        canvas.height = height;
      } else {
        canvas.width = width;
        canvas.height = width / aspectRatio;
      }

      // Draw the image to the canvas
      canvas
        ?.getContext('2d')
        ?.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Resolve the Promise with the resized image as a base64 string
      resolve(canvas.toDataURL());
    };

    image.onerror = reject;
  });
}

export const NO_IMG =
  'data:image/png;base64,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';
