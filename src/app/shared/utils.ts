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
