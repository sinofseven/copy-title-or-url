let worker = null;

try {
  worker = browser;
} catch {
  worker = chrome;
}

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
    case 'hatena-blog-card':
      return createHatenaBlogCardLink(url, title);
  }
}

function getOptionValue(name, defaultValue) {
  const value = localStorage.getItem(name);
  return value == null ? defaultValue : value;
}

function createHatenaBlogCardLink(url, title) {
  const option = {
    width: getOptionValue("style-width", "100%"),
    height: getOptionValue("style-height", "150px"),
    margin: getOptionValue("margin", null),
    'max-width': getOptionValue("max-width", "600px")
  };
  let style = "";
  for (const [key, value] of Object.entries(option)) {
    if (value == null || value === 'undefined') continue;
    style += `${key}: ${value};`;
  }
  const encodedUrl = encodeURIComponent(url);
  return `<iframe class="hatenablogcard" style="${style}" title=${JSON.stringify(title)} src="https://hatenablog-parts.com/embed?url=${encodedUrl}"></iframe>`
}

function copy(event) {
  worker.tabs.query({
    active: true,
    currentWindow: true
  }, function(list) {
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
