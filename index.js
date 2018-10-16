function generate(type, title, url) {
  switch(type) {
    case 'title':
      return title;
    case 'url':
      return url;
    case 'anchor':
      return `<a href="${url}">${title}</a>`;
    case 'markdown':
      return `[${title}](${url})`;
  }
}

function copy(event) {
  browser.tabs.query({
    active: true,
    currentWindow: true
  }).then((list) => {
    const tab = list[0];
    const title = tab.title;
    const url = tab.url;
    const type = event.target.dataset.type;
    const text = generate(type, title, url);
    const board = document.createElement('input');
    board.type = 'text';
    board.value = text;
    document.body.appendChild(board);
    board.select();
    document.execCommand('copy');
    board.parentElement.removeChild(board);
    window.close();
  });
}

const allButtons = document.getElementsByTagName("h4");
for(let i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener('click', copy)
}